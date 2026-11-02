package com.marathidesign.project.dto;

public class ProjectUpdateRequest {
    private String title;
    private String canvasJson;
    private String thumbnailData;

    public ProjectUpdateRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCanvasJson() { return canvasJson; }
    public void setCanvasJson(String canvasJson) { this.canvasJson = canvasJson; }

    public String getThumbnailData() { return thumbnailData; }
    public void setThumbnailData(String thumbnailData) { this.thumbnailData = thumbnailData; }
}
