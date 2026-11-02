package com.marathidesign.media.service;

import com.marathidesign.media.model.MediaAsset;
import com.marathidesign.media.repository.MediaAssetRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class MediaService {

    private final MediaAssetRepository mediaAssetRepository;
    private final Path uploadLocation;

    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
            "image/svg+xml"
    );

    private static final long FREE_STORAGE_LIMIT_BYTES = 20 * 1024 * 1024; // 20 MB

    public MediaService(MediaAssetRepository mediaAssetRepository,
                        @Value("${storage.local-dir:./uploads/media}") String uploadDir) {
        this.mediaAssetRepository = mediaAssetRepository;
        this.uploadLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    public List<MediaAsset> getUserMedia(Long userId) {
        return mediaAssetRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Optional<MediaAsset> getAsset(Long id) {
        return mediaAssetRepository.findById(id);
    }

    public MediaAsset storeFile(Long userId, String planTier, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file cannot be empty.");
        }

        String mimeType = file.getContentType();
        if (mimeType == null || !ALLOWED_MIME_TYPES.contains(mimeType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid file format! Only PNG, JPEG, SVG, or WebP files are allowed.");
        }

        long fileSize = file.getSize();

        // Check storage quota
        if (!"PRO".equalsIgnoreCase(planTier) && !"BUSINESS".equalsIgnoreCase(planTier)) {
            Long currentUsed = mediaAssetRepository.getTotalStorageBytesByUser(userId);
            if (currentUsed + fileSize > FREE_STORAGE_LIMIT_BYTES) {
                throw new IllegalStateException("Free storage limit (20 MB) reached. Upgrade to Pro for increased storage.");
            }
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            originalFilename = "asset-" + System.currentTimeMillis();
        }

        String fileExtension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFilename.substring(dotIndex);
        }

        String storedFilename = UUID.randomUUID().toString() + fileExtension;
        Path targetPath = this.uploadLocation.resolve(storedFilename);

        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        MediaAsset asset = new MediaAsset(userId, originalFilename, storedFilename, mimeType, fileSize);
        return mediaAssetRepository.save(asset);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = this.uploadLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public boolean deleteAsset(Long assetId, Long userId) {
        Optional<MediaAsset> opt = mediaAssetRepository.findByIdAndUserId(assetId, userId);
        if (opt.isPresent()) {
            MediaAsset asset = opt.get();
            try {
                Path file = this.uploadLocation.resolve(asset.getStoragePath()).normalize();
                Files.deleteIfExists(file);
            } catch (IOException ignored) {}
            mediaAssetRepository.delete(asset);
            return true;
        }
        return false;
    }
}
