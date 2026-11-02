package com.marathidesign.template.dto;

public class StorageSummaryDto {
    private LibraryStatsDto templates;
    private LibraryStatsDto elements;
    private Long totalUsedBytes;
    private Long totalLimitBytes;
    private Double totalUsedGb;
    private Double totalLimitGb;

    public StorageSummaryDto() {}

    public StorageSummaryDto(LibraryStatsDto templates, LibraryStatsDto elements) {
        this.templates = templates;
        this.elements = elements;
        this.totalUsedBytes = (templates != null ? templates.getUsedBytes() : 0L) +
                               (elements != null ? elements.getUsedBytes() : 0L);
        this.totalLimitBytes = (templates != null ? templates.getMaxLimitBytes() : 0L) +
                                (elements != null ? elements.getMaxLimitBytes() : 0L);
        this.totalUsedGb = (double) this.totalUsedBytes / (1024.0 * 1024.0 * 1024.0);
        this.totalLimitGb = (double) this.totalLimitBytes / (1024.0 * 1024.0 * 1024.0);
    }

    public LibraryStatsDto getTemplates() { return templates; }
    public void setTemplates(LibraryStatsDto templates) { this.templates = templates; }

    public LibraryStatsDto getElements() { return elements; }
    public void setElements(LibraryStatsDto elements) { this.elements = elements; }

    public Long getTotalUsedBytes() { return totalUsedBytes; }
    public void setTotalUsedBytes(Long totalUsedBytes) { this.totalUsedBytes = totalUsedBytes; }

    public Long getTotalLimitBytes() { return totalLimitBytes; }
    public void setTotalLimitBytes(Long totalLimitBytes) { this.totalLimitBytes = totalLimitBytes; }

    public Double getTotalUsedGb() { return totalUsedGb; }
    public void setTotalUsedGb(Double totalUsedGb) { this.totalUsedGb = totalUsedGb; }

    public Double getTotalLimitGb() { return totalLimitGb; }
    public void setTotalLimitGb(Double totalLimitGb) { this.totalLimitGb = totalLimitGb; }
}
