package com.marathidesign.template.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "template_assets")
public class TemplateAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "template_id")
    private Long templateId;

    @Column(name = "asset_name", nullable = false)
    private String assetName;

    @Column(name = "asset_type", nullable = false, length = 30)
    private String assetType; // CANVAS_JSON, THUMBNAIL, PREVIEW, COMPONENT

    @Column(name = "storage_path", length = 512)
    private String storagePath;

    @Column(name = "mime_type", length = 50)
    private String mimeType;

    @Column(name = "file_size_bytes", nullable = false)
    private Long fileSizeBytes = 0L;

    @Column(name = "sha256_hash", length = 64)
    private String sha256Hash;

    @Column(name = "reference_count", nullable = false)
    private Integer referenceCount = 1;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public TemplateAsset() {}

    public TemplateAsset(Long templateId, String assetName, String assetType, String storagePath,
                         String mimeType, Long fileSizeBytes, String sha256Hash) {
        this.templateId = templateId;
        this.assetName = assetName;
        this.assetType = assetType;
        this.storagePath = storagePath;
        this.mimeType = mimeType;
        this.fileSizeBytes = fileSizeBytes != null ? fileSizeBytes : 0L;
        this.sha256Hash = sha256Hash;
        this.referenceCount = 1;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTemplateId() { return templateId; }
    public void setTemplateId(Long templateId) { this.templateId = templateId; }

    public String getAssetName() { return assetName; }
    public void setAssetName(String assetName) { this.assetName = assetName; }

    public String getAssetType() { return assetType; }
    public void setAssetType(String assetType) { this.assetType = assetType; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }

    public String getSha256Hash() { return sha256Hash; }
    public void setSha256Hash(String sha256Hash) { this.sha256Hash = sha256Hash; }

    public Integer getReferenceCount() { return referenceCount; }
    public void setReferenceCount(Integer referenceCount) { this.referenceCount = referenceCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
