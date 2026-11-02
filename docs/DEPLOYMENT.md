# Deployment & Operations Guide: Marathi Design Studio

This guide documents the procedures for compiling, configuring, running, and deploying Marathi Design Studio locally and in production environments.

## System Architecture Overview
The platform consists of:
1. **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Fabric.js.
2. **Backend Microservices (Spring Boot 3.3, Java 21)**:
   - `api-gateway` (Port `8080`): Unified reverse proxy and CORS orchestrator.
   - `identity-service` (Port `8081`): Authentication, user accounts, JWT issuance.
   - `template-service` (Port `8082`): Template marketplace, element library, 10 GB limits.
   - `project-service` (Port `8083`): Multi-page canvas JSON documents, quotas, BOLA checks.
   - `media-service` (Port `8084`): Uploaded media storage, thumbnails.
   - `ai-service` (Port `8085`): Marathi copy generation, design assistance.
   - `billing-service` (Port `8086`): Subscription management, plan entitlements.
3. **Database**: MySQL 8.x (`utf8mb4_unicode_ci`).
4. **Asset Storage**: S3-compatible object storage (or local filesystem for development).

---

## Prerequisites
- **Java**: OpenJDK 21 LTS
- **Maven**: 3.9+
- **Node.js**: 20+ and npm 10+
- **MySQL**: 8.0+ running on `localhost:3306` (default credentials: `root` / `root`)

---

## Local Development Setup

### 1. Database Initialization
Ensure the microservice databases exist:
```sql
CREATE DATABASE IF NOT EXISTS marathi_identity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_template CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_media CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_billing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Building Backend Microservices
```powershell
mvn clean package -DskipTests
```

### 3. Running Backend Services
Execute the provided PowerShell script to launch all microservices in the background:
```powershell
.\run-local-services.ps1
```
Logs are automatically written to `logs/<ServiceName>.log` and `logs/<ServiceName>-err.log`.

### 4. Running the Frontend Development Server
```powershell
cd frontend
npm install
npm run dev
```
Access the application in your browser at `http://localhost:5173`.

---

## Environment Variables & Configuration

| Variable | Target Service | Default | Description |
|---|---|---|---|
| `DB_HOST` | All services | `localhost` | MySQL host address |
| `DB_PORT` | All services | `3306` | MySQL port |
| `DB_USER` | All services | `root` | MySQL username |
| `DB_PASSWORD` | All services | `root` | MySQL password |
| `JWT_SECRET` | Identity, Gateway | `super-secret-...` | HMAC-SHA256 signature key |
| `GEMINI_API_KEY` | AI Service | `""` | Google Gemini API key |
| `RAZORPAY_KEY_ID` | Billing Service | `""` | Razorpay Merchant Key |
| `RAZORPAY_KEY_SECRET` | Billing Service | `""` | Razorpay Merchant Secret |

---

## Storage Limit Accounting Rules
- **Template Library**: Strict cap of 10.00 GB (`10,737,418,240` bytes).
- **Reusable Elements Library**: Strict cap of 10.00 GB (`10,737,418,240` bytes).
- **Enforcement**:
  - Pre-upload atomic capacity check rejects files that would exceed 10 GB.
  - 80% capacity triggers a `WARNING` banner in the admin interface.
  - 95% capacity triggers a `CRITICAL` alert.
  - Safe garbage collection purges unreferenced and deleted assets via `/api/v1/admin/storage/cleanup`.
