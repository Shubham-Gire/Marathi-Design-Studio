package com.marathidesign.template.dto;

import java.time.LocalDateTime;

public class AssetInfoDto {
    private Long id;
    private String name;
    private String category;
    private Long fileSizeBytes;
    private String formattedSize;
    private String sha256Hash;
    private LocalDateTime createdAt;

    public AssetInfoDto() {}

    public AssetInfoDto(Long id, String name, String category, Long fileSizeBytes, String sha256Hash, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.fileSizeBytes = fileSizeBytes;
        this.formattedSize = formatBytes(fileSizeBytes);
        this.sha256Hash = sha256Hash;
        this.createdAt = createdAt;
    }

    public static String formatBytes(Long bytes) {
        if (bytes == null || bytes <= 0) return "0 B";
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.1f KB", bytes / 1024.0);
        if (bytes < 1024 * 1024 * 1024) return String.format("%.2f MB", bytes / (1024.0 * 1024.0));
        return String.format("%.3f GB", bytes / (1024.0 * 1024.0 * 1024.0));
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) {
        this.fileSizeBytes = fileSizeBytes;
        this.formattedSize = formatBytes(fileSizeBytes);
    }

    public String getFormattedSize() { return formattedSize; }
    public void setFormattedSize(String formattedSize) { this.formattedSize = formattedSize; }

    public String getSha256Hash() { return sha256Hash; }
    public void setSha256Hash(String sha256Hash) { this.sha256Hash = sha256Hash; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
