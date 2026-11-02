package com.marathidesign.project.dto;

import java.time.LocalDateTime;

public class ProjectDto {
    private Long id;
    private Long userId;
    private String title;
    private Integer width;
    private Integer height;
    private String canvasJson;
    private String thumbnailData;
    private Integer version;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProjectDto() {}

    public ProjectDto(Long id, Long userId, String title, Integer width, Integer height,
                      String canvasJson, String thumbnailData, Integer version,
                      LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.width = width;
        this.height = height;
        this.canvasJson = canvasJson;
        this.thumbnailData = thumbnailData;
        this.version = version;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
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
