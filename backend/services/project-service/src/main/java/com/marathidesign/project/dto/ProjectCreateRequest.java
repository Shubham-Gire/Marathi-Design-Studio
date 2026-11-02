package com.marathidesign.project.dto;

public class ProjectCreateRequest {
    private String title;
    private Integer width = 1080;
    private Integer height = 1080;
    private String canvasJson;
    private String thumbnailData;

    public ProjectCreateRequest() {}

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
}
