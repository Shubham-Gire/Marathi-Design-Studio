package com.marathidesign.billing.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "plan_id", length = 50)
    private String planId;

    @Column(nullable = false, length = 50)
    private String status = "ACTIVE"; // ACTIVE, CANCELLED, EXPIRED

    @Column(name = "razorpay_payment_id")
    private String razorpayPaymentId;

    @Column(name = "is_mock_payment")
    private Boolean isMockPayment = false;

    @Column(nullable = false, name = "starts_at")
    private LocalDateTime startsAt;

    @Column(nullable = false, name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Subscription() {}

    public Subscription(Long userId, String planId, String status, String razorpayPaymentId,
                        Boolean isMockPayment, LocalDateTime startsAt, LocalDateTime expiresAt) {
        this.userId = userId;
        this.planId = planId;
        this.status = status;
        this.razorpayPaymentId = razorpayPaymentId;
        this.isMockPayment = isMockPayment;
        this.startsAt = startsAt;
        this.expiresAt = expiresAt;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getPlanId() { return planId; }
    public void setPlanId(String planId) { this.planId = planId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRazorpayPaymentId() { return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; }

    public Boolean getIsMockPayment() { return isMockPayment; }
    public void setIsMockPayment(Boolean isMockPayment) { this.isMockPayment = isMockPayment; }

    public LocalDateTime getStartsAt() { return startsAt; }
    public void setStartsAt(LocalDateTime startsAt) { this.startsAt = startsAt; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
