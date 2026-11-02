package com.marathidesign.billing.controller;

import com.marathidesign.billing.model.Plan;
import com.marathidesign.billing.model.Subscription;
import com.marathidesign.billing.service.BillingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    private Long extractUserId(String userIdHeader) {
        if (userIdHeader == null || userIdHeader.trim().isEmpty()) {
            return null;
        }
        try {
            return Long.parseLong(userIdHeader.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @GetMapping("/plans")
    public ResponseEntity<List<Plan>> getPlans() {
        return ResponseEntity.ok(billingService.getAllPlans());
    }

    @GetMapping("/subscription")
    public ResponseEntity<?> getSubscription(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        return billingService.getCurrentSubscription(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(null));
    }

    @PostMapping("/mock-activate")
    public ResponseEntity<?> activateMockSubscription(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @RequestBody Map<String, String> body) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        String planId = body.get("planId");
        if (planId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "planId is required"));
        }
        try {
            Subscription sub = billingService.activateMockDevSubscription(userId, planId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "[Development Mock Payment] Pro plan successfully activated!",
                    "isMockDevelopmentPayment", true,
                    "subscription", sub
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelSubscription(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        boolean cancelled = billingService.cancelSubscription(userId);
        if (cancelled) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Subscription cancelled successfully."));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "No active subscription found."));
    }
}
