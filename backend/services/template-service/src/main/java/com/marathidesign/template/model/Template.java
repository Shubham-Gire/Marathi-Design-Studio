package com.marathidesign.template.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "templates")
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "title_mr")
    private String titleMr;

    @Column(name = "description_mr", columnDefinition = "TEXT")
    private String descriptionMr;

    @Column(nullable = false, name = "category_slug", length = 100)
    private String categorySlug;

    @Column(nullable = false, name = "plan_tier", length = 50)
    private String planTier = "FREE"; // FREE or PRO

    @Column(nullable = false)
    private Integer width = 1080;

    @Column(nullable = false)
    private Integer height = 1080;

    @Column(name = "thumbnail_url", length = 512)
    private String thumbnailUrl;

    @Lob
    @Column(nullable = false, name = "canvas_json", columnDefinition = "LONGTEXT")
    private String canvasJson;

    @Column(length = 255)
    private String tags;

    @Column(name = "file_size_bytes")
    private Long fileSizeBytes = 0L;

    @Column(name = "sha256_hash", length = 64)
    private String sha256Hash;

    @Column(nullable = false, name = "is_published")
    private Boolean isPublished = true;

    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Template() {}

    public Template(String titleMr, String descriptionMr, String categorySlug, String planTier,
                    Integer width, Integer height, String thumbnailUrl, String canvasJson, String tags) {
        this.titleMr = titleMr;
        this.descriptionMr = descriptionMr;
        this.categorySlug = categorySlug;
        this.planTier = planTier;
        this.width = width;
        this.height = height;
        this.thumbnailUrl = thumbnailUrl;
        this.canvasJson = canvasJson;
        this.tags = tags;
        this.isPublished = true;
        this.fileSizeBytes = (long) (canvasJson != null ? canvasJson.getBytes(java.nio.charset.StandardCharsets.UTF_8).length : 0);
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitleMr() { return titleMr; }
    public void setTitleMr(String titleMr) { this.titleMr = titleMr; }

    public String getDescriptionMr() { return descriptionMr; }
    public void setDescriptionMr(String descriptionMr) { this.descriptionMr = descriptionMr; }

    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }

    public String getPlanTier() { return planTier; }
    public void setPlanTier(String planTier) { this.planTier = planTier; }

    public Integer getWidth() { return width; }
    public void setWidth(Integer width) { this.width = width; }

    public Integer getHeight() { return height; }
    public void setHeight(Integer height) { this.height = height; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getCanvasJson() { return canvasJson; }
    public void setCanvasJson(String canvasJson) { this.canvasJson = canvasJson; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }

    public String getSha256Hash() { return sha256Hash; }
    public void setSha256Hash(String sha256Hash) { this.sha256Hash = sha256Hash; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
