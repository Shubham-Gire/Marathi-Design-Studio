package com.marathidesign.identity.service;

import com.marathidesign.identity.dto.*;
import com.marathidesign.identity.model.RefreshToken;
import com.marathidesign.identity.model.User;
import com.marathidesign.identity.repository.RefreshTokenRepository;
import com.marathidesign.identity.repository.UserRepository;
import com.marathidesign.identity.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${jwt.refresh-expiration-ms:604800000}")
    private long refreshExpirationMs;

    public AuthService(UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            return new AuthResponse(false, "Email address is required.", null, null, null);
        }
        if (req.getPassword() == null || req.getPassword().length() < 6) {
            return new AuthResponse(false, "Password must be at least 6 characters long.", null, null, null);
        }
        if (userRepository.existsByEmail(req.getEmail().toLowerCase().trim())) {
            return new AuthResponse(false, "An account with this email already exists. Please log in.", null, null, null);
        }

        String fullName = req.getFullName() != null && !req.getFullName().trim().isEmpty() 
                ? req.getFullName().trim() 
                : "Design Studio User";

        User user = new User(
                req.getEmail().toLowerCase().trim(),
                passwordEncoder.encode(req.getPassword()),
                fullName,
                req.getPhoneNumber()
        );

        User savedUser = userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(savedUser);
        String refreshTokenStr = jwtService.generateRefreshToken();

        RefreshToken refreshToken = new RefreshToken(
                savedUser.getId(),
                refreshTokenStr,
                LocalDateTime.now().plusSeconds(refreshExpirationMs / 1000)
        );
        refreshTokenRepository.save(refreshToken);

        UserDto userDto = new UserDto(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getPhoneNumber(),
                savedUser.getRole(),
                savedUser.getPlanTier()
        );

        return new AuthResponse(true, "Registration successful! Welcome to Marathi Design Studio.", accessToken, refreshTokenStr, userDto);
    }

    @Transactional
    public AuthResponse login(LoginRequest req) {
        if (req.getEmail() == null || req.getPassword() == null) {
            return new AuthResponse(false, "Email and password are required.", null, null, null);
        }

        var optUser = userRepository.findByEmail(req.getEmail().toLowerCase().trim());
        if (optUser.isEmpty()) {
            return new AuthResponse(false, "Invalid email or password.", null, null, null);
        }

        User user = optUser.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return new AuthResponse(false, "Invalid email or password.", null, null, null);
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshTokenStr = jwtService.generateRefreshToken();

        RefreshToken refreshToken = new RefreshToken(
                user.getId(),
                refreshTokenStr,
                LocalDateTime.now().plusSeconds(refreshExpirationMs / 1000)
        );
        refreshTokenRepository.save(refreshToken);

        UserDto userDto = new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getPlanTier()
        );

        return new AuthResponse(true, "Login successful!", accessToken, refreshTokenStr, userDto);
    }

    @Transactional
    public AuthResponse oauthLogin(String provider, OAuthLoginRequest req) {
        String cleanProvider = (provider != null && !provider.trim().isEmpty()) ? provider.toLowerCase().trim() : "oauth";
        String email = (req != null && req.getEmail() != null && !req.getEmail().trim().isEmpty())
                ? req.getEmail().toLowerCase().trim()
                : "creator." + cleanProvider + "@marathidesign.com";
        String fullName = (req != null && req.getFullName() != null && !req.getFullName().trim().isEmpty())
                ? req.getFullName().trim()
                : Character.toUpperCase(cleanProvider.charAt(0)) + cleanProvider.substring(1) + " Creator";

        // Prevent unverified OAuth account takeover of existing password-protected accounts
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent() && !email.endsWith("@marathidesign.com")) {
            return new AuthResponse(false, "An account already exists with this email. Please sign in using your email and password.", null, null, null);
        }

        User user = existingUser.orElseGet(() -> {
            User newUser = new User(
                    email,
                    passwordEncoder.encode("OAuthUserSecret" + System.currentTimeMillis()),
                    fullName,
                    null
            );
            newUser.setPlanTier("FREE");
            return userRepository.save(newUser);
        });

        String accessToken = jwtService.generateAccessToken(user);
        String refreshTokenStr = jwtService.generateRefreshToken();

        RefreshToken refreshToken = new RefreshToken(
                user.getId(),
                refreshTokenStr,
                LocalDateTime.now().plusSeconds(refreshExpirationMs / 1000)
        );
        refreshTokenRepository.save(refreshToken);

        UserDto userDto = new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getPlanTier()
        );

        String providerName = Character.toUpperCase(cleanProvider.charAt(0)) + cleanProvider.substring(1);
        return new AuthResponse(true, "Successfully authenticated with " + providerName + "!", accessToken, refreshTokenStr, userDto);
    }

    public UserDto getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(u -> new UserDto(u.getId(), u.getEmail(), u.getFullName(), u.getPhoneNumber(), u.getRole(), u.getPlanTier()))
                .orElse(null);
    }

    @Transactional
    public boolean updateUserPlanTier(Long userId, String newPlanTier) {
        var opt = userRepository.findById(userId);
        if (opt.isPresent()) {
            User u = opt.get();
            u.setPlanTier(newPlanTier);
            userRepository.save(u);
            return true;
        }
        return false;
    }
}
