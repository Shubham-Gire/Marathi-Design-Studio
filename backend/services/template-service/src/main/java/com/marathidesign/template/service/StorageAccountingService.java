package com.marathidesign.template.service;

import com.marathidesign.template.dto.AssetInfoDto;
import com.marathidesign.template.dto.LibraryStatsDto;
import com.marathidesign.template.dto.StorageSummaryDto;
import com.marathidesign.template.exception.StorageLimitExceededException;
import com.marathidesign.template.model.DesignElement;
import com.marathidesign.template.model.LibraryStorageRecord;
import com.marathidesign.template.model.Template;
import com.marathidesign.template.model.TemplateAsset;
import com.marathidesign.template.repository.DesignElementRepository;
import com.marathidesign.template.repository.LibraryStorageRecordRepository;
import com.marathidesign.template.repository.TemplateAssetRepository;
import com.marathidesign.template.repository.TemplateRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StorageAccountingService {

    public static final long MAX_STORAGE_LIMIT_BYTES = 10L * 1024 * 1024 * 1024; // 10 GB
    public static final String TYPE_TEMPLATES = "TEMPLATES";
    public static final String TYPE_ELEMENTS = "ELEMENTS";

    private final LibraryStorageRecordRepository storageRecordRepository;
    private final TemplateRepository templateRepository;
    private final TemplateAssetRepository templateAssetRepository;
    private final DesignElementRepository designElementRepository;

    public StorageAccountingService(LibraryStorageRecordRepository storageRecordRepository,
                                    TemplateRepository templateRepository,
                                    TemplateAssetRepository templateAssetRepository,
                                    DesignElementRepository designElementRepository) {
        this.storageRecordRepository = storageRecordRepository;
        this.templateRepository = templateRepository;
        this.templateAssetRepository = templateAssetRepository;
        this.designElementRepository = designElementRepository;
    }

    /**
     * Compute SHA-256 hash string for byte array content.
     */
    public String calculateSha256(byte[] data) {
        if (data == null || data.length == 0) return null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data);
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    public String calculateSha256(String text) {
        if (text == null) return null;
        return calculateSha256(text.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Verify if the incoming bytes can fit within the library's 10 GB limit.
     */
    public void validateStorageCapacity(String libraryType, long incomingBytes) {
        LibraryStorageRecord record = getOrCreateRecord(libraryType);
        long currentUsed = record.getUsedBytes();
        if (currentUsed + incomingBytes > MAX_STORAGE_LIMIT_BYTES) {
            double currentGb = (double) currentUsed / (1024.0 * 1024.0 * 1024.0);
            double incomingMb = (double) incomingBytes / (1024.0 * 1024.0);
            throw new StorageLimitExceededException(String.format(
                    "Storage limit exceeded! %s library is at %.2f GB / 10.00 GB. Incoming payload of %.2f MB would breach the 10 GB limit.",
                    libraryType, currentGb, incomingMb
            ));
        }
    }

    @Transactional
    public synchronized void recordAssetAddition(String libraryType, long bytes) {
        validateStorageCapacity(libraryType, bytes);
        LibraryStorageRecord record = getOrCreateRecord(libraryType);
        record.setUsedBytes(record.getUsedBytes() + bytes);
        record.setAssetCount(record.getAssetCount() + 1);
        record.setUpdatedAt(LocalDateTime.now());
        storageRecordRepository.save(record);
    }

    @Transactional
    public synchronized void recordAssetDeletion(String libraryType, long bytes) {
        LibraryStorageRecord record = getOrCreateRecord(libraryType);
        long newUsed = Math.max(0L, record.getUsedBytes() - bytes);
        record.setUsedBytes(newUsed);
        record.setAssetCount(Math.max(0, record.getAssetCount() - 1));
        record.setUpdatedAt(LocalDateTime.now());
        storageRecordRepository.save(record);
    }

    @Transactional
    public synchronized LibraryStorageRecord getOrCreateRecord(String libraryType) {
        return storageRecordRepository.findByLibraryType(libraryType)
                .orElseGet(() -> {
                    LibraryStorageRecord rec = new LibraryStorageRecord(libraryType, MAX_STORAGE_LIMIT_BYTES, 0L, 0);
                    return storageRecordRepository.save(rec);
                });
    }

    /**
     * Re-synchronizes storage records directly from the database assets.
     */
    @Transactional
    public void syncStorageAccounting() {
        // 1. Templates Accounting
        Long templateBytes = templateRepository.findAll().stream()
                .mapToLong(t -> t.getFileSizeBytes() != null ? t.getFileSizeBytes() : 0L)
                .sum();
        Long assetBytes = templateAssetRepository.getTotalStorageBytes();
        long totalTemplateBytes = (templateBytes != null ? templateBytes : 0L) + (assetBytes != null ? assetBytes : 0L);
        int templateCount = (int) templateRepository.count();

        LibraryStorageRecord templateRecord = getOrCreateRecord(TYPE_TEMPLATES);
        templateRecord.setUsedBytes(totalTemplateBytes);
        templateRecord.setAssetCount(templateCount);
        templateRecord.setUpdatedAt(LocalDateTime.now());
        storageRecordRepository.save(templateRecord);

        // 2. Elements Accounting
        Long elementBytes = designElementRepository.getTotalStorageBytes();
        long totalElementBytes = elementBytes != null ? elementBytes : 0L;
        int elementCount = (int) designElementRepository.count();

        LibraryStorageRecord elementRecord = getOrCreateRecord(TYPE_ELEMENTS);
        elementRecord.setUsedBytes(totalElementBytes);
        elementRecord.setAssetCount(elementCount);
        elementRecord.setUpdatedAt(LocalDateTime.now());
        storageRecordRepository.save(elementRecord);
    }

    /**
     * Generates a comprehensive storage summary with warnings and largest assets.
     */
    public StorageSummaryDto getStorageSummary() {
        // Sync first to ensure fresh data
        syncStorageAccounting();

        LibraryStorageRecord tRec = getOrCreateRecord(TYPE_TEMPLATES);
        List<AssetInfoDto> largestTemplates = templateRepository.findAll().stream()
                .sorted((a, b) -> Long.compare(
                        b.getFileSizeBytes() != null ? b.getFileSizeBytes() : 0L,
                        a.getFileSizeBytes() != null ? a.getFileSizeBytes() : 0L))
                .limit(10)
                .map(t -> new AssetInfoDto(
                        t.getId(),
                        t.getTitleMr(),
                        t.getCategorySlug(),
                        t.getFileSizeBytes() != null ? t.getFileSizeBytes() : 0L,
                        t.getSha256Hash(),
                        t.getCreatedAt()
                ))
                .collect(Collectors.toList());

        LibraryStatsDto templateStats = new LibraryStatsDto(
                TYPE_TEMPLATES,
                tRec.getUsedBytes(),
                tRec.getMaxLimitBytes(),
                tRec.getAssetCount(),
                largestTemplates
        );

        LibraryStorageRecord eRec = getOrCreateRecord(TYPE_ELEMENTS);
        List<AssetInfoDto> largestElements = designElementRepository.findTopLargestAssets().stream()
                .limit(10)
                .map(e -> new AssetInfoDto(
                        e.getId(),
                        e.getTitle(),
                        e.getCategory(),
                        e.getFileSizeBytes(),
                        e.getSha256Hash(),
                        e.getCreatedAt()
                ))
                .collect(Collectors.toList());

        LibraryStatsDto elementStats = new LibraryStatsDto(
                TYPE_ELEMENTS,
                eRec.getUsedBytes(),
                eRec.getMaxLimitBytes(),
                eRec.getAssetCount(),
                largestElements
        );

        return new StorageSummaryDto(templateStats, elementStats);
    }

    /**
     * Safe cleanup of unreferenced assets.
     */
    @Transactional
    public long performSafeCleanup() {
        long reclaimedBytes = 0L;

        // Clean unreferenced template assets
        List<TemplateAsset> unreferencedTemplateAssets = templateAssetRepository.findByReferenceCountLessThanEqual(0);
        for (TemplateAsset asset : unreferencedTemplateAssets) {
            reclaimedBytes += asset.getFileSizeBytes();
            templateAssetRepository.delete(asset);
        }

        // Clean unreferenced design elements
        List<DesignElement> unreferencedElements = designElementRepository.findByReferenceCountLessThanEqual(0);
        for (DesignElement el : unreferencedElements) {
            reclaimedBytes += el.getFileSizeBytes();
            designElementRepository.delete(el);
        }

        syncStorageAccounting();
        return reclaimedBytes;
    }
}
