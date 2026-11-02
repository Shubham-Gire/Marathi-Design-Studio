# Marathi Design Studio: Complete Canva-Style Cloud Design Platform

> **A professional, full-featured visual design ecosystem for Marathi (Devanagari), English (Latin), and bilingual creative work.**
> Built with React 19, TypeScript, Fabric.js, and Spring Boot 3.3 Microservices.

---

## 📌 Mission & Overview
**Marathi Design Studio** is a cloud-based graphic design platform comparable to Canva. The entire user interface is in English, while providing native, world-class typography and design tools for Marathi (Devanagari), English (Latin), or mixed bilingual text.

The platform provides a comprehensive creative workspace for posters, flyers, banners, social media graphics, presentations, documents, whiteboards, spreadsheets, videos, websites, invitations, brand kits, and marketing campaigns.

### Key Capabilities
- **English-Only Application Interface**: Clean, accessible, intuitive interface navigation following international design software conventions.
- **Multilingual Typography Engine**: Native support for Devanagari fonts (Noto Sans Devanagari, Mukta, Hind, Tiro Devanagari Marathi, Gotu, Rozha One) alongside popular Latin families (Inter, Roboto, Poppins, Montserrat, Bebas Neue, Oswald). Every text box can independently be formatted with unique fonts, weights, colors, letter spacing, and line heights.
- **True Interactive Canvas**: Full Fabric.js vector canvas supporting multi-selection, group/ungroup, layers, alignment, duplication, clipboard copy/paste, rotation, and undo/redo history.
- **Independent 10 GB Shared Storage Limits**:
  - **Template Library**: Strict 10 GB maximum limit with server-side byte accounting.
  - **Reusable Elements Library**: Strict 10 GB maximum limit with server-side byte accounting.
  - Automatic warnings at 80% and 95% capacity, upload rejection upon exceeding limits, and SHA-256 deduplication.
- **Keyboard Shortcuts & Command Palette**: Comprehensive hotkey registry (`Ctrl` on Windows/Linux, `Cmd` on macOS) with input conflict suppression, searchable shortcuts cheatsheet (`?`), and a global quick action launcher (`/` or `Ctrl+E`).
- **Honest Integration Architecture**: Unambiguous status indicators and setup dialogs for unconfigured external services (AI models, OAuth social publishing, payment gateways, cloud backup), without fake output or simulated success.

---

## 🏗️ Architecture & Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Fabric.js, Lucide Icons, jsPDF.
- **API Gateway**: Spring Cloud Gateway (Port `8080`).
- **Identity Service**: Spring Boot 3.3, Spring Security, JWT, BCrypt (Port `8081`).
- **Template Service**: Template & Element catalogs, 10 GB storage accounting (Port `8082`).
- **Project Service**: Multi-page canvas JSON documents, quotas, BOLA protection (Port `8083`).
- **Media Service**: Image and user asset management (Port `8084`).
- **AI Service**: Google Gemini copy generation & design suggestions (Port `8085`).
- **Billing Service**: Plans, subscriptions, Razorpay adapter (Port `8086`).
- **Database**: MySQL 8.x with `utf8mb4_unicode_ci` encoding.

---

## 🚀 Quickstart Guide

### Prerequisites
- **Java 21 LTS**
- **Apache Maven 3.9+**
- **Node.js 20+** and **npm 10+**
- **MySQL 8.x** running on `localhost:3306` (default credentials: `root` / `root`)

### 1. Database Setup
```sql
CREATE DATABASE IF NOT EXISTS marathi_identity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_template CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_media CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS marathi_billing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Build & Launch Backend Services
```powershell
mvn clean package -DskipTests
.\run-local-services.ps1
```

### 3. Launch Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📚 Project Documentation
- [Feature Backlog & Inventory](docs/FEATURE_BACKLOG.md)
- [Keyboard Shortcuts Guide](docs/KEYBOARD_SHORTCUTS.md)
- [External Integrations Catalog](docs/INTEGRATIONS.md)
- [Microservices Architecture](docs/ARCHITECTURE.md)
- [Database Schema Design](docs/DATABASE_DESIGN.md)
- [API Contracts](docs/API_CONTRACTS.md)
- [Security & Authorization Specifications](docs/SECURITY.md)
- [Test Verification Suite](docs/TEST_RESULTS.md)
- [Deployment Runbook](docs/DEPLOYMENT.md)

---

## 📄 License
Open-source Devanagari and Latin fonts licensed under Google Fonts / SIL Open Font License (OFL).
Copyright © 2026 Marathi Design Studio. All Rights Reserved.
