package com.marathidesign.ai.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ai_usage_counters", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "usage_date"})
})
public class AiUsageCounter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "usage_date")
    private LocalDate usageDate;

    @Column(nullable = false)
    private Integer count = 0;

    public AiUsageCounter() {}

    public AiUsageCounter(Long userId, LocalDate usageDate, Integer count) {
        this.userId = userId;
        this.usageDate = usageDate;
        this.count = count;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDate getUsageDate() { return usageDate; }
    public void setUsageDate(LocalDate usageDate) { this.usageDate = usageDate; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
}
