package com.marathidesign.ai.dto;

public class AiImproveResponse {
    private String original;
    private String shortVariant;
    private String standardVariant;
    private String detailedVariant;

    public AiImproveResponse() {}

    public AiImproveResponse(String original, String shortVariant, String standardVariant, String detailedVariant) {
        this.original = original;
        this.shortVariant = shortVariant;
        this.standardVariant = standardVariant;
        this.detailedVariant = detailedVariant;
    }

    public String getOriginal() { return original; }
    public void setOriginal(String original) { this.original = original; }

    public String getShortVariant() { return shortVariant; }
    public void setShortVariant(String shortVariant) { this.shortVariant = shortVariant; }

    public String getStandardVariant() { return standardVariant; }
    public void setStandardVariant(String standardVariant) { this.standardVariant = standardVariant; }

    public String getDetailedVariant() { return detailedVariant; }
    public void setDetailedVariant(String detailedVariant) { this.detailedVariant = detailedVariant; }
}
