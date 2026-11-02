package com.marathidesign.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private String title = "नवीन मराठी डिझाईन";

    @Column(nullable = false)
    private Integer width = 1080;

    @Column(nullable = false)
    private Integer height = 1080;

    @Lob
    @Column(nullable = false, name = "canvas_json", columnDefinition = "LONGTEXT")
    private String canvasJson;

    @Lob
    @Column(name = "thumbnail_data", columnDefinition = "MEDIUMTEXT")
    private String thumbnailData;

    @Column(nullable = false)
    private Integer version = 1;

    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Project() {}

    public Project(Long userId, String title, Integer width, Integer height, String canvasJson, String thumbnailData) {
        this.userId = userId;
        this.title = title != null && !title.trim().isEmpty() ? title : "नवीन मराठी डिझाईन";
        this.width = width != null ? width : 1080;
        this.height = height != null ? height : 1080;
        this.canvasJson = canvasJson != null ? canvasJson : "{\"version\":\"5.3.0\",\"objects\":[]}";
        this.thumbnailData = thumbnailData;
        this.version = 1;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getWidth() { return width; }
    public void setWidth(Integer width) { this.width = width; }

    public Integer getHeight() { return height; }
    public void setHeight(Integer height) { this.height = height; }

    public String getCanvasJson() { return canvasJson; }
    public void setCanvasJson(String canvasJson) { this.canvasJson = canvasJson; }

    public String getThumbnailData() { return thumbnailData; }
    public void setThumbnailData(String thumbnailData) { this.thumbnailData = thumbnailData; }

    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
