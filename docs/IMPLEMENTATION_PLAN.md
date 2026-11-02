# Implementation Plan: Marathi Design Studio (मराठी डिझाईन स्टुडिओ)

This document outlines the sequential phases to deliver the fully functional, cloud-ready, Marathi-first SaaS design platform.

---

## Phase 0: Discovery & Architecture (COMPLETE)
- [x] Workspace inspection (Java 21, Maven 3.9, Node 26, npm 11, Docker, MySQL 8.0, Redis confirmed).
- [x] MySQL isolated databases created (`marathi_identity`, `marathi_template`, `marathi_project`, `marathi_media`, `marathi_ai`, `marathi_billing`).
- [x] Architecture, Database Design, API Contracts, and Security specifications written.

---

## Phase 1: Infrastructure & Application Skeleton
- [ ] Root Maven Multi-Module Project (`pom.xml`) with shared dependency management for Spring Boot 3.3.x / Java 21.
- [ ] API Gateway Service (`services/api-gateway`): Port 8080.
- [ ] Identity Service (`services/identity-service`): Port 8081.
- [ ] Template Service (`services/template-service`): Port 8082.
- [ ] Project Service (`services/project-service`): Port 8083.
- [ ] Media Service (`services/media-service`): Port 8084.
- [ ] AI Service (`services/ai-service`): Port 8085.
- [ ] Billing Service (`services/billing-service`): Port 8086.
- [ ] Frontend Vite + React + TypeScript + Tailwind project with Marathi localization configuration.
- [ ] Dockerfiles & `docker-compose.yml` for unified local & cloud container orchestration.

---

## Phase 2: Core Working Product
- [ ] Identity Service: Registration, login, BCrypt password hashing, JWT generation, `/me` profile.
- [ ] Template Service: Seed catalog with 20+ authentic Marathi templates across categories.
- [ ] Project Service: CRUD for user designs with structured JSON canvas documents and ownership enforcement.
- [ ] Interactive Canvas Editor: Fabric.js canvas with Marathi text input, font rendering (Noto Sans Devanagari, Mukta, Hind, Gotu), drag/drop, resize, rotate, color pickers, layer ordering, and undo/redo.
- [ ] End-to-end flow: Browse template -> Open in Editor -> Edit Marathi text & styling -> Save to Cloud -> Reopen from Dashboard.

---

## Phase 3: Media & Editor Quality
- [ ] Media Service: Secure image upload with MIME validation, local/S3 storage adapter, and quota limits.
- [ ] Editor Media Integration: Add uploaded photos/logos directly into canvas.
- [ ] High-fidelity export: Client-side and server-validated export to PNG, JPEG, and PDF ensuring no Devanagari ligature or matra detachment.

---

## Phase 4: AI Features
- [ ] Authenticated AI endpoints for Marathi copy generation (Headlines, Slogans, Invitations, Offers).
- [ ] Marathi Design Assistant: Takes Marathi business briefs and generates structured design suggestions.
- [ ] Fallback and graceful degradation if Gemini API key is absent.

---

## Phase 5: Subscription & Administration
- [ ] Free, Pro, and Business plan definitions with configurable limits.
- [ ] Razorpay test mode integration and explicitly labelled development mock activation.
- [ ] Server-side entitlement checks (Max projects, Pro templates, AI daily quota).

---

## Phase 6: Production Hardening & Testing
- [ ] Unit & integration tests for backend services.
- [ ] Frontend component & editor tests.
- [ ] End-to-end browser journey verification.
- [ ] Documentation refinement (`README.md`, operational guide).
