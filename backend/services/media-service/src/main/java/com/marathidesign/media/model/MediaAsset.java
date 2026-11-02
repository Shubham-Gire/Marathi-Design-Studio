package com.marathidesign.media.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "media_assets")
public class MediaAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "original_filename")
    private String originalFilename;

    @Column(nullable = false, name = "storage_path", length = 512)
    private String storagePath;

    @Column(nullable = false, name = "mime_type", length = 100)
    private String mimeType;

    @Column(nullable = false, name = "file_size_bytes")
    private Long fileSizeBytes;

    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public MediaAsset() {}

    public MediaAsset(Long userId, String originalFilename, String storagePath, String mimeType, Long fileSizeBytes) {
        this.userId = userId;
        this.originalFilename = originalFilename;
        this.storagePath = storagePath;
        this.mimeType = mimeType;
        this.fileSizeBytes = fileSizeBytes;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getOriginalFilename() { return originalFilename; }
    public void setOriginalFilename(String originalFilename) { this.originalFilename = originalFilename; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
