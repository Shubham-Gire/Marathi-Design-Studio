package com.marathidesign.identity.controller;

import com.marathidesign.identity.dto.*;
import com.marathidesign.identity.security.JwtService;
import com.marathidesign.identity.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse res = authService.register(request);
        if (!res.isSuccess()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse res = authService.login(request);
        if (!res.isSuccess()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
        return ResponseEntity.ok(res);
    }

    @PostMapping("/oauth/{provider}")
    public ResponseEntity<AuthResponse> oauthLogin(
            @PathVariable String provider,
            @RequestBody(required = false) OAuthLoginRequest request) {
        if (request == null) {
            request = new OAuthLoginRequest();
        }
        AuthResponse res = authService.oauthLogin(provider, request);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        Long userId = null;
        if (userIdHeader != null && !userIdHeader.trim().isEmpty()) {
            try {
                userId = Long.parseLong(userIdHeader);
            } catch (NumberFormatException ignored) {}
        }

        if (userId == null && authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                userId = jwtService.getUserIdFromToken(authHeader.substring(7));
            } catch (Exception ignored) {}
        }

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please log in first.");
        }

        UserDto user = authService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        return ResponseEntity.ok(user);
    }
}
