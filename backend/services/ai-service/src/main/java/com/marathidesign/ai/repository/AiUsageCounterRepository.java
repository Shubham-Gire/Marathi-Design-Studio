package com.marathidesign.ai.repository;

import com.marathidesign.ai.model.AiUsageCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AiUsageCounterRepository extends JpaRepository<AiUsageCounter, Long> {
    Optional<AiUsageCounter> findByUserIdAndUsageDate(Long userId, LocalDate usageDate);
}
