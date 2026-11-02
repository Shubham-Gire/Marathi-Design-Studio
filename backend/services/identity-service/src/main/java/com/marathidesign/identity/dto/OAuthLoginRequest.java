package com.marathidesign.identity.dto;

public class OAuthLoginRequest {
    private String email;
    private String fullName;
    private String providerId;
    private String avatarUrl;
    private String token;

    public OAuthLoginRequest() {}

    public OAuthLoginRequest(String email, String fullName, String providerId, String avatarUrl, String token) {
        this.email = email;
        this.fullName = fullName;
        this.providerId = providerId;
        this.avatarUrl = avatarUrl;
        this.token = token;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getProviderId() { return providerId; }
    public void setProviderId(String providerId) { this.providerId = providerId; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
