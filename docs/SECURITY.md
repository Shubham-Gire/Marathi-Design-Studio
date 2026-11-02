# Security & Compliance Specification: Marathi Design Studio

## 1. Threat Modeling & Mitigation Strategy

| Threat Vector | Risk Description | Architectural Mitigation |
|---|---|---|
| **Broken Object-Level Authorization (BOLA)** | User accesses or modifies another user's project by changing `projectId` | Strict ownership check in `ProjectService` and `MediaService` querying `WHERE id = :id AND user_id = :userId`. Forbidden (403) returned if mismatch occurs. |
| **Cross-Site Scripting (XSS)** | Malicious HTML/JavaScript embedded inside Marathi text fields | Fabric.js canvas renders text via Canvas 2D context `fillText()`, preventing HTML parsing. React escapes all Devanagari text nodes. Content-Security-Policy configured. |
| **SQL Injection** | Dynamic queries compromised by user input | Exclusively use Spring Data JPA parameterized queries and Hibernate typed criteria. No raw string concatenation for SQL. |
| **Malicious File Uploads** | Executable scripts disguised as image assets | Media service validates file extensions, magic bytes (file signature), MIME types, and strips executable headers before storage. Max file size strictly enforced. |
| **Token Hijacking & Session Abuse** | Stolen credentials or long-lived tokens | JWT tokens signed with HMAC-SHA256 with 15-minute access token lifespan. Refresh tokens stored with rotation and revocation flags. |
| **Payment Tampering** | Manipulating payment amounts or forging subscription callbacks | Razorpay webhook signature verification using HMAC-SHA256 secret. Explicit development mock mode prominently labelled with no fake real payment claims. |
| **Denial of Service / Quota Abuse** | Infinite AI generation or project storage bloat | Redis-backed rate limiting per IP and per user account. Enforced plan quotas on project counts, asset storage, and AI daily limits. |

---

## 2. Authentication & Cryptography Standards
- **Password Storage:** BCrypt with a work factor of 12.
- **JWT Signing:** HMAC-SHA256 (`HS256`) using a strong 256-bit secret key configured via environment variables.
- **Header Propagation:** Downstream services accept `X-User-Id` only when forwarded by the internal API Gateway or when protected by service-to-service internal shared secrets.

---

## 3. Data Privacy & Compliance
- **Devanagari Data Integrity:** Relational databases explicitly configured with `utf8mb4` encoding to prevent encoding corruption, loss of diacritics, or surrogate pair truncation.
- **Account Deletion:** User deletion cascades to revoke refresh tokens, soft-delete projects, and remove uploaded media files from object storage.
