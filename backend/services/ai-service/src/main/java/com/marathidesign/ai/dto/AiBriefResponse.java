package com.marathidesign.ai.dto;

import java.util.List;

public class AiBriefResponse {
    private String title;
    private String headerText;
    private String subText;
    private String footerText;
    private String backgroundColor;
    private String accentColor;
    private String textColor;
    private String recommendedFont;
    private String recommendedCategory;
    private List<String> suggestions;

    public AiBriefResponse() {}

    public AiBriefResponse(String title, String headerText, String subText, String footerText,
                           String backgroundColor, String accentColor, String textColor,
                           String recommendedFont, String recommendedCategory, List<String> suggestions) {
        this.title = title;
        this.headerText = headerText;
        this.subText = subText;
        this.footerText = footerText;
        this.backgroundColor = backgroundColor;
        this.accentColor = accentColor;
        this.textColor = textColor;
        this.recommendedFont = recommendedFont;
        this.recommendedCategory = recommendedCategory;
        this.suggestions = suggestions;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getHeaderText() { return headerText; }
    public void setHeaderText(String headerText) { this.headerText = headerText; }

    public String getSubText() { return subText; }
    public void setSubText(String subText) { this.subText = subText; }

    public String getFooterText() { return footerText; }
    public void setFooterText(String footerText) { this.footerText = footerText; }

    public String getBackgroundColor() { return backgroundColor; }
    public void setBackgroundColor(String backgroundColor) { this.backgroundColor = backgroundColor; }

    public String getAccentColor() { return accentColor; }
    public void setAccentColor(String accentColor) { this.accentColor = accentColor; }

    public String getTextColor() { return textColor; }
    public void setTextColor(String textColor) { this.textColor = textColor; }

    public String getRecommendedFont() { return recommendedFont; }
    public void setRecommendedFont(String recommendedFont) { this.recommendedFont = recommendedFont; }

    public String getRecommendedCategory() { return recommendedCategory; }
    public void setRecommendedCategory(String recommendedCategory) { this.recommendedCategory = recommendedCategory; }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }
}
