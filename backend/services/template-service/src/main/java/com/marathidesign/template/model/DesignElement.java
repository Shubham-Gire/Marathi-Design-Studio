package com.marathidesign.template.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "design_elements")
public class DesignElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 50)
    private String category; // shapes, lines_arrows, borders_frames, stickers_icons, festival_decor, business_retail, backgrounds_patterns, illustrations_badges

    @Column(nullable = false, length = 30)
    private String elementType = "SVG"; // SVG, SHAPE, RASTER, FRAME

    @Lob
    @Column(name = "svg_data", columnDefinition = "LONGTEXT")
    private String svgData;

    @Column(name = "asset_url", length = 512)
    private String assetUrl;

    @Column(name = "thumbnail_url", length = 512)
    private String thumbnailUrl;

    @Column(length = 255)
    private String tags;

    @Column(name = "is_premium", nullable = false)
    private Boolean isPremium = false;

    @Column(name = "file_size_bytes", nullable = false)
    private Long fileSizeBytes = 0L;

    @Column(name = "sha256_hash", length = 64)
    private String sha256Hash;

    @Column(name = "default_width")
    private Integer defaultWidth = 120;

    @Column(name = "default_height")
    private Integer defaultHeight = 120;

    @Column(name = "default_fill", length = 50)
    private String defaultFill = "#ea580c";

    @Column(name = "default_stroke", length = 50)
    private String defaultStroke;

    @Column(name = "reference_count", nullable = false)
    private Integer referenceCount = 1;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public DesignElement() {}

    public DesignElement(String title, String category, String elementType, String svgData,
                         String assetUrl, String thumbnailUrl, String tags, Boolean isPremium,
                         Long fileSizeBytes, String sha256Hash, Integer defaultWidth,
                         Integer defaultHeight, String defaultFill, String defaultStroke) {
        this.title = title;
        this.category = category;
        this.elementType = elementType;
        this.svgData = svgData;
        this.assetUrl = assetUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.tags = tags;
        this.isPremium = isPremium != null ? isPremium : false;
        this.fileSizeBytes = fileSizeBytes != null ? fileSizeBytes : 0L;
        this.sha256Hash = sha256Hash;
        this.defaultWidth = defaultWidth != null ? defaultWidth : 120;
        this.defaultHeight = defaultHeight != null ? defaultHeight : 120;
        this.defaultFill = defaultFill;
        this.defaultStroke = defaultStroke;
        this.referenceCount = 1;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getElementType() { return elementType; }
    public void setElementType(String elementType) { this.elementType = elementType; }

    public String getSvgData() { return svgData; }
    public void setSvgData(String svgData) { this.svgData = svgData; }

    public String getAssetUrl() { return assetUrl; }
    public void setAssetUrl(String assetUrl) { this.assetUrl = assetUrl; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public Boolean getIsPremium() { return isPremium; }
    public void setIsPremium(Boolean isPremium) { this.isPremium = isPremium; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }

    public String getSha256Hash() { return sha256Hash; }
    public void setSha256Hash(String sha256Hash) { this.sha256Hash = sha256Hash; }

    public Integer getDefaultWidth() { return defaultWidth; }
    public void setDefaultWidth(Integer defaultWidth) { this.defaultWidth = defaultWidth; }

    public Integer getDefaultHeight() { return defaultHeight; }
    public void setDefaultHeight(Integer defaultHeight) { this.defaultHeight = defaultHeight; }

    public String getDefaultFill() { return defaultFill; }
    public void setDefaultFill(String defaultFill) { this.defaultFill = defaultFill; }

    public String getDefaultStroke() { return defaultStroke; }
    public void setDefaultStroke(String defaultStroke) { this.defaultStroke = defaultStroke; }

    public Integer getReferenceCount() { return referenceCount; }
    public void setReferenceCount(Integer referenceCount) { this.referenceCount = referenceCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
