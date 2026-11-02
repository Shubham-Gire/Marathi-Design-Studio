package com.marathidesign.billing.model;

import jakarta.persistence.*;

@Entity
@Table(name = "plans")
public class Plan {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, name = "name_mr")
    private String nameMr;

    @Column(nullable = false, name = "price_inr")
    private Integer priceInr;

    @Column(nullable = false, name = "billing_cycle", length = 20)
    private String billingCycle; // MONTHLY, YEARLY, LIFETIME

    @Column(nullable = false, name = "max_projects")
    private Integer maxProjects;

    @Column(nullable = false, name = "max_storage_mb")
    private Integer maxStorageMb;

    @Column(nullable = false, name = "daily_ai_limit")
    private Integer dailyAiLimit;

    @Column(nullable = false, name = "premium_templates")
    private Boolean premiumTemplates;

    public Plan() {}

    public Plan(String id, String nameMr, Integer priceInr, String billingCycle,
                Integer maxProjects, Integer maxStorageMb, Integer dailyAiLimit, Boolean premiumTemplates) {
        this.id = id;
        this.nameMr = nameMr;
        this.priceInr = priceInr;
        this.billingCycle = billingCycle;
        this.maxProjects = maxProjects;
        this.maxStorageMb = maxStorageMb;
        this.dailyAiLimit = dailyAiLimit;
        this.premiumTemplates = premiumTemplates;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNameMr() { return nameMr; }
    public void setNameMr(String nameMr) { this.nameMr = nameMr; }

    public Integer getPriceInr() { return priceInr; }
    public void setPriceInr(Integer priceInr) { this.priceInr = priceInr; }

    public String getBillingCycle() { return billingCycle; }
    public void setBillingCycle(String billingCycle) { this.billingCycle = billingCycle; }

    public Integer getMaxProjects() { return maxProjects; }
    public void setMaxProjects(Integer maxProjects) { this.maxProjects = maxProjects; }

    public Integer getMaxStorageMb() { return maxStorageMb; }
    public void setMaxStorageMb(Integer maxStorageMb) { this.maxStorageMb = maxStorageMb; }

    public Integer getDailyAiLimit() { return dailyAiLimit; }
    public void setDailyAiLimit(Integer dailyAiLimit) { this.dailyAiLimit = dailyAiLimit; }

    public Boolean getPremiumTemplates() { return premiumTemplates; }
    public void setPremiumTemplates(Boolean premiumTemplates) { this.premiumTemplates = premiumTemplates; }
}
