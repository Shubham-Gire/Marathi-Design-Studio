package com.marathidesign.template.service;

import com.marathidesign.template.model.DesignElement;
import com.marathidesign.template.repository.DesignElementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class DesignElementService {

    private final DesignElementRepository designElementRepository;
    private final StorageAccountingService storageAccountingService;

    public DesignElementService(DesignElementRepository designElementRepository,
                                StorageAccountingService storageAccountingService) {
        this.designElementRepository = designElementRepository;
        this.storageAccountingService = storageAccountingService;
    }

    public List<DesignElement> getElements(String category, String search, Boolean isPremium) {
        return designElementRepository.searchElements(category, search, isPremium);
    }

    public Optional<DesignElement> getElementById(Long id) {
        return designElementRepository.findById(id);
    }

    public List<String> getCategories() {
        return designElementRepository.findDistinctCategories();
    }

    @Transactional
    public DesignElement createElement(DesignElement element) {
        // Calculate file size and hash
        long size = 0L;
        if (element.getSvgData() != null) {
            byte[] bytes = element.getSvgData().getBytes(StandardCharsets.UTF_8);
            size = bytes.length;
            element.setSha256Hash(storageAccountingService.calculateSha256(bytes));
        }
        element.setFileSizeBytes(size);

        // Deduplication check: if identical hash exists, increment reference count
        if (element.getSha256Hash() != null) {
            Optional<DesignElement> existing = designElementRepository.findBySha256Hash(element.getSha256Hash());
            if (existing.isPresent()) {
                DesignElement dup = existing.get();
                dup.setReferenceCount(dup.getReferenceCount() + 1);
                return designElementRepository.save(dup);
            }
        }

        // Validate storage capacity (10 GB limit check)
        storageAccountingService.validateStorageCapacity(StorageAccountingService.TYPE_ELEMENTS, size);

        // Save new element
        DesignElement saved = designElementRepository.save(element);

        // Record addition in storage ledger
        storageAccountingService.recordAssetAddition(StorageAccountingService.TYPE_ELEMENTS, size);

        return saved;
    }

    @Transactional
    public void deleteElement(Long id) {
        DesignElement element = designElementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Design element not found with ID: " + id));

        long size = element.getFileSizeBytes() != null ? element.getFileSizeBytes() : 0L;
        designElementRepository.delete(element);
        storageAccountingService.recordAssetDeletion(StorageAccountingService.TYPE_ELEMENTS, size);
    }
}
