package com.marathidesign.ai.controller;

import com.marathidesign.ai.dto.*;
import com.marathidesign.ai.service.AiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
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

    @PostMapping("/generate-copy")
    public ResponseEntity<?> generateCopy(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(value = "X-Plan-Tier", defaultValue = "FREE") String planTier,
            @RequestBody AiCopyRequest request) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        try {
            AiCopyResponse res = aiService.generateCopy(userId, planTier, request);
            return ResponseEntity.ok(res);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/design-assistant")
    public ResponseEntity<?> designAssistant(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(value = "X-Plan-Tier", defaultValue = "FREE") String planTier,
            @RequestBody AiBriefRequest request) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        try {
            AiBriefResponse res = aiService.generateDesignFromBrief(userId, planTier, request);
            return ResponseEntity.ok(res);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/improve-text")
    public ResponseEntity<?> improveText(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(value = "X-Plan-Tier", defaultValue = "FREE") String planTier,
            @RequestBody AiImproveRequest request) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        try {
            AiImproveResponse res = aiService.improveText(userId, planTier, request);
            return ResponseEntity.ok(res);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("error", e.getMessage()));
        }
    }
}
