package com.marathidesign.ai.dto;

import java.util.List;

public class AiCopyResponse {
    private List<String> headlines;
    private List<String> slogans;
    private List<String> invitations;

    public AiCopyResponse() {}

    public AiCopyResponse(List<String> headlines, List<String> slogans, List<String> invitations) {
        this.headlines = headlines;
        this.slogans = slogans;
        this.invitations = invitations;
    }

    public List<String> getHeadlines() { return headlines; }
    public void setHeadlines(List<String> headlines) { this.headlines = headlines; }

    public List<String> getSlogans() { return slogans; }
    public void setSlogans(List<String> slogans) { this.slogans = slogans; }

    public List<String> getInvitations() { return invitations; }
    public void setInvitations(List<String> invitations) { this.invitations = invitations; }
}
