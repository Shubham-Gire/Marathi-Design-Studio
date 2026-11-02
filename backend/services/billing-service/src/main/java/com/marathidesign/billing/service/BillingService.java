package com.marathidesign.billing.service;

import com.marathidesign.billing.model.Plan;
import com.marathidesign.billing.model.Subscription;
import com.marathidesign.billing.repository.PlanRepository;
import com.marathidesign.billing.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class BillingService {

    private final PlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final RestTemplate restTemplate;

    @Value("${identity-service.url:http://localhost:8081}")
    private String identityServiceUrl;

    public BillingService(PlanRepository planRepository, SubscriptionRepository subscriptionRepository) {
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.restTemplate = new RestTemplate();
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<Subscription> getCurrentSubscription(Long userId) {
        return subscriptionRepository.findFirstByUserIdAndStatusOrderByCreatedAtDesc(userId, "ACTIVE");
    }

    @Transactional
    public Subscription activateMockDevSubscription(Long userId, String planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Selected plan not found: " + planId));

        // Mark any current active subscription as expired
        subscriptionRepository.findFirstByUserIdAndStatusOrderByCreatedAtDesc(userId, "ACTIVE")
                .ifPresent(sub -> {
                    sub.setStatus("CANCELLED");
                    subscriptionRepository.save(sub);
                });

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expires = "YEARLY".equalsIgnoreCase(plan.getBillingCycle()) 
                ? now.plusYears(1) 
                : now.plusMonths(1);

        Subscription newSub = new Subscription(
                userId,
                planId,
                "ACTIVE",
                "MOCK_TXN_" + UUID.randomUUID().toString().substring(0, 8),
                true, // Explicitly marked as mock development payment
                now,
                expires
        );

        Subscription saved = subscriptionRepository.save(newSub);

        // Notify Identity Service to upgrade plan tier
        try {
            String newTier = planId.startsWith("PRO") ? "PRO" : (planId.startsWith("BIZ") ? "BUSINESS" : "FREE");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(Map.of("planTier", newTier), headers);
            restTemplate.put(identityServiceUrl + "/api/v1/users/" + userId + "/tier", request);
        } catch (Exception ignored) {
            // Identity service notification failure shouldn't rollback subscription save in dev
        }

        return saved;
    }

    @Transactional
    public boolean cancelSubscription(Long userId) {
        Optional<Subscription> opt = subscriptionRepository.findFirstByUserIdAndStatusOrderByCreatedAtDesc(userId, "ACTIVE");
        if (opt.isPresent()) {
            Subscription sub = opt.get();
            sub.setStatus("CANCELLED");
            subscriptionRepository.save(sub);

            // Revert identity tier to FREE
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<Map<String, String>> request = new HttpEntity<>(Map.of("planTier", "FREE"), headers);
                restTemplate.put(identityServiceUrl + "/api/v1/users/" + userId + "/tier", request);
            } catch (Exception ignored) {}

            return true;
        }
        return false;
    }
}
