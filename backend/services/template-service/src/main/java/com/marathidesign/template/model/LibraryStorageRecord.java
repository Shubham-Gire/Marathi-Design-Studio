package com.marathidesign.template.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "library_storage_records")
public class LibraryStorageRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "library_type", nullable = false, unique = true, length = 30)
    private String libraryType; // "TEMPLATES" or "ELEMENTS"

    @Column(name = "max_limit_bytes", nullable = false)
    private Long maxLimitBytes = 10L * 1024 * 1024 * 1024; // 10 GB = 10,737,418,240 bytes

    @Column(name = "used_bytes", nullable = false)
    private Long usedBytes = 0L;

    @Column(name = "asset_count", nullable = false)
    private Integer assetCount = 0;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public LibraryStorageRecord() {}

    public LibraryStorageRecord(String libraryType, Long maxLimitBytes, Long usedBytes, Integer assetCount) {
        this.libraryType = libraryType;
        this.maxLimitBytes = maxLimitBytes;
        this.usedBytes = usedBytes;
        this.assetCount = assetCount;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLibraryType() { return libraryType; }
    public void setLibraryType(String libraryType) { this.libraryType = libraryType; }

    public Long getMaxLimitBytes() { return maxLimitBytes; }
    public void setMaxLimitBytes(Long maxLimitBytes) { this.maxLimitBytes = maxLimitBytes; }

    public Long getUsedBytes() { return usedBytes; }
    public void setUsedBytes(Long usedBytes) { this.usedBytes = usedBytes; }

    public Integer getAssetCount() { return assetCount; }
    public void setAssetCount(Integer assetCount) { this.assetCount = assetCount; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
