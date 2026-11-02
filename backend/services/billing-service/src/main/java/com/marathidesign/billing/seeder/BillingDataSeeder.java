package com.marathidesign.billing.seeder;

import com.marathidesign.billing.model.Plan;
import com.marathidesign.billing.repository.PlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BillingDataSeeder implements CommandLineRunner {

    private final PlanRepository planRepository;

    public BillingDataSeeder(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @Override
    public void run(String... args) {
        if (planRepository.count() == 0) {
            List<Plan> plans = List.of(
                    new Plan("FREE", "Free Plan", 0, "LIFETIME", 5, 20, 5, false),
                    new Plan("PRO_MONTHLY", "Pro Monthly", 299, "MONTHLY", 100, 1024, 50, true),
                    new Plan("PRO_YEARLY", "Pro Yearly", 2499, "YEARLY", 100, 1024, 50, true),
                    new Plan("BUSINESS_MONTHLY", "Business Monthly", 799, "MONTHLY", 500, 5120, 200, true)
            );
            planRepository.saveAll(plans);
        }
    }
}
