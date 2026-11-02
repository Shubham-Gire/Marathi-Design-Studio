package com.marathidesign.identity.controller;

import com.marathidesign.identity.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @PutMapping("/{userId}/tier")
    public ResponseEntity<?> updateUserPlanTier(
            @PathVariable Long userId,
            @RequestBody Map<String, String> body) {
        String planTier = body.get("planTier");
        if (planTier == null) {
            return ResponseEntity.badRequest().body("Plan tier is required");
        }
        boolean updated = authService.updateUserPlanTier(userId, planTier);
        if (updated) {
            return ResponseEntity.ok(Map.of("success", true, "message", "User plan tier updated"));
        }
        return ResponseEntity.notFound().build();
    }
}
