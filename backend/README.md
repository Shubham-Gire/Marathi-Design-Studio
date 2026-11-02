# Marathi Design Studio — Backend Microservices

This directory contains the complete Spring Boot 3.2.3 microservices backend for Marathi Design Studio.

## Architecture Overview

The backend is built with Spring Boot, Spring Cloud Gateway, Spring Security (BCrypt + JJWT), and MySQL 8.0:

```text
backend/
├── pom.xml                                 # Backend parent POM
├── README.md                               # This documentation
└── services/
    ├── api-gateway/ (Port 8080)            # Spring Cloud Gateway & JWT authentication filter
    ├── identity-service/ (Port 8081)       # User registration, BCrypt authentication, JWT tokens
    ├── template-service/ (Port 8082)       # Marathi seed templates & 10 GB dual storage limit accounting
    ├── project-service/ (Port 8083)        # Canvas design persistence, BOLA isolation, 5-project Free tier
    ├── media-service/ (Port 8084)          # User media uploads & object storage adapter
    ├── ai-service/ (Port 8085)             # Marathi copywriting & layout brief AI assistants
    └── billing-service/ (Port 8086)        # Plans, Pro tier activation & Razorpay hooks
```

## Running the Services

### Start All Microservices
From the project root:
```bash
node scripts/start-all.mjs
```

### Stop All Microservices
```bash
node scripts/stop-all.mjs
```

### Build with Maven
```bash
mvn clean package -DskipTests
```
Or build from within the `backend/` directory:
```bash
cd backend
mvn clean package -DskipTests
```

## Microservices Ports & URLs

| Service | Port | Base Path | Health Check |
|---|---|---|---|
| API Gateway | 8080 | `/api/**` | `http://localhost:8080/actuator/health` |
| Identity Service | 8081 | `/api/auth/**` | `http://localhost:8081/actuator/health` |
| Template Service | 8082 | `/api/templates/**` | `http://localhost:8082/actuator/health` |
| Project Service | 8083 | `/api/projects/**` | `http://localhost:8083/actuator/health` |
| Media Service | 8084 | `/api/media/**` | `http://localhost:8084/actuator/health` |
| AI Service | 8085 | `/api/ai/**` | `http://localhost:8085/actuator/health` |
| Billing Service | 8086 | `/api/billing/**` | `http://localhost:8086/actuator/health` |
