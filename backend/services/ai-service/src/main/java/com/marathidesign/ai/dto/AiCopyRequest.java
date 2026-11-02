package com.marathidesign.ai.dto;

import java.util.List;

public class AiCopyRequest {
    private String topic;
    private String tone;
    private String category;

    public AiCopyRequest() {}

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
