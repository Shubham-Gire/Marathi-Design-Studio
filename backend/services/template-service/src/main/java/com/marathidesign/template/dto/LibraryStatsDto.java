package com.marathidesign.template.dto;

import java.util.List;

public class LibraryStatsDto {
    private String libraryType;
    private Long usedBytes;
    private Long maxLimitBytes;
    private Long remainingBytes;
    private Double usedGb;
    private Double maxGb;
    private Double usagePercentage;
    private String status; // NORMAL, WARNING, CRITICAL
    private String warningMessage;
    private Integer assetCount;
    private List<AssetInfoDto> largestAssets;

    public LibraryStatsDto() {}

    public LibraryStatsDto(String libraryType, Long usedBytes, Long maxLimitBytes,
                           Integer assetCount, List<AssetInfoDto> largestAssets) {
        this.libraryType = libraryType;
        this.usedBytes = usedBytes != null ? usedBytes : 0L;
        this.maxLimitBytes = maxLimitBytes != null ? maxLimitBytes : 10L * 1024 * 1024 * 1024;
        this.remainingBytes = Math.max(0L, this.maxLimitBytes - this.usedBytes);
        this.usedGb = (double) this.usedBytes / (1024.0 * 1024.0 * 1024.0);
        this.maxGb = (double) this.maxLimitBytes / (1024.0 * 1024.0 * 1024.0);
        this.usagePercentage = this.maxLimitBytes > 0 
                ? ((double) this.usedBytes / (double) this.maxLimitBytes) * 100.0 
                : 0.0;
        this.assetCount = assetCount != null ? assetCount : 0;
        this.largestAssets = largestAssets;

        // Calculate 80% and 95% threshold statuses
        if (this.usagePercentage >= 95.0) {
            this.status = "CRITICAL";
            this.warningMessage = String.format("CRITICAL ALERT: %s library has reached %.1f%% capacity (%.2f GB / %.1f GB). Uploads will be blocked if 10 GB limit is reached!",
                    libraryType, this.usagePercentage, this.usedGb, this.maxGb);
        } else if (this.usagePercentage >= 80.0) {
            this.status = "WARNING";
            this.warningMessage = String.format("WARNING: %s library has exceeded 80%% capacity (%.2f GB / %.1f GB). Consider archiving older unused assets.",
                    libraryType, this.usagePercentage, this.usedGb, this.maxGb);
        } else {
            this.status = "NORMAL";
            this.warningMessage = null;
        }
    }

    public String getLibraryType() { return libraryType; }
    public void setLibraryType(String libraryType) { this.libraryType = libraryType; }

    public Long getUsedBytes() { return usedBytes; }
    public void setUsedBytes(Long usedBytes) { this.usedBytes = usedBytes; }

    public Long getMaxLimitBytes() { return maxLimitBytes; }
    public void setMaxLimitBytes(Long maxLimitBytes) { this.maxLimitBytes = maxLimitBytes; }

    public Long getRemainingBytes() { return remainingBytes; }
    public void setRemainingBytes(Long remainingBytes) { this.remainingBytes = remainingBytes; }

    public Double getUsedGb() { return usedGb; }
    public void setUsedGb(Double usedGb) { this.usedGb = usedGb; }

    public Double getMaxGb() { return maxGb; }
    public void setMaxGb(Double maxGb) { this.maxGb = maxGb; }

    public Double getUsagePercentage() { return usagePercentage; }
    public void setUsagePercentage(Double usagePercentage) { this.usagePercentage = usagePercentage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getWarningMessage() { return warningMessage; }
    public void setWarningMessage(String warningMessage) { this.warningMessage = warningMessage; }

    public Integer getAssetCount() { return assetCount; }
    public void setAssetCount(Integer assetCount) { this.assetCount = assetCount; }

    public List<AssetInfoDto> getLargestAssets() { return largestAssets; }
    public void setLargestAssets(List<AssetInfoDto> largestAssets) { this.largestAssets = largestAssets; }
}
