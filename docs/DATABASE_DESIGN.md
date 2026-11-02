# Database Design Specification: Marathi Design Studio

## 1. Relational Persistence Architecture
Every microservice controls its own database schema inside MySQL 8.4:
- Character Set: `utf8mb4`
- Collation: `utf8mb4_unicode_ci` (critical for sorting, indexing, and matching Marathi Devanagari text correctly)

---

## 2. Service Schemas & Table Definitions

### 2.1. `marathi_identity` (Identity & Account Service)

#### Table: `users`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| `email` | VARCHAR(191) | NOT NULL, UNIQUE | User login email address |
| `password_hash` | VARCHAR(255) | NOT NULL | BCrypt hashed password |
| `full_name` | VARCHAR(255) | NOT NULL | Marathi/English full name |
| `phone_number` | VARCHAR(20) | NULL | Optional Indian mobile number |
| `role` | VARCHAR(50) | NOT NULL, DEFAULT 'ROLE_USER' | User role (`ROLE_USER`, `ROLE_ADMIN`) |
| `plan_tier` | VARCHAR(50) | NOT NULL, DEFAULT 'FREE' | Current tier (`FREE`, `PRO`, `BUSINESS`) |
| `is_verified` | BOOLEAN | NOT NULL, DEFAULT TRUE | Email verification status |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Account active/disabled status |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Registration timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last modification |

#### Table: `refresh_tokens`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Token ID |
| `user_id` | BIGINT | NOT NULL, INDEX | References `users(id)` |
| `token` | VARCHAR(255) | NOT NULL, UNIQUE | Refresh token string |
| `expires_at` | TIMESTAMP | NOT NULL | Token expiry |
| `revoked` | BOOLEAN | NOT NULL, DEFAULT FALSE | Token revocation flag |

---

### 2.2. `marathi_template` (Template Service)

#### Table: `template_categories`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Category ID |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | URL-safe slug (e.g. `festivals`) |
| `name_mr` | VARCHAR(255) | NOT NULL | Marathi name (e.g. सण आणि उत्सव) |
| `icon_name` | VARCHAR(50) | NULL | UI Icon identifier |
| `display_order` | INT | NOT NULL, DEFAULT 0 | Ordering index in gallery |

#### Table: `templates`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Template ID |
| `title_mr` | VARCHAR(255) | NOT NULL | Marathi title (e.g. दिवाळी सण शुभेच्छा) |
| `description_mr` | TEXT | NULL | Marathi description |
| `category_id` | BIGINT | NOT NULL, INDEX | Foreign key to `template_categories` |
| `plan_tier` | VARCHAR(50) | NOT NULL, DEFAULT 'FREE' | Access tier required (`FREE` or `PRO`) |
| `width` | INT | NOT NULL, DEFAULT 1080 | Canvas width in pixels |
| `height` | INT | NOT NULL, DEFAULT 1080 | Canvas height in pixels |
| `thumbnail_url` | VARCHAR(512) | NULL | Preview image URL or data URI |
| `canvas_json` | LONGTEXT | NOT NULL | Fabric.js structured canvas schema |
| `tags` | VARCHAR(255) | NULL | Comma-separated search tags |
| `is_published` | BOOLEAN | NOT NULL, DEFAULT TRUE | Publication state |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

---

### 2.3. `marathi_project` (Project & Design Service)

#### Table: `projects`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Project ID |
| `user_id` | BIGINT | NOT NULL, INDEX | Owner user ID |
| `title` | VARCHAR(255) | NOT NULL, DEFAULT 'नवीन मराठी डिझाईन' | Design title |
| `width` | INT | NOT NULL, DEFAULT 1080 | Canvas width |
| `height` | INT | NOT NULL, DEFAULT 1080 | Canvas height |
| `canvas_json` | LONGTEXT | NOT NULL | Full Fabric.js document state |
| `thumbnail_data` | MEDIUMTEXT | NULL | Base64 PNG canvas thumbnail for dashboard |
| `version` | INT | NOT NULL, DEFAULT 1 | Optimistic locking / autosave counter |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last updated |

---

### 2.4. `marathi_media` (Media & Asset Service)

#### Table: `media_assets`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Media asset ID |
| `user_id` | BIGINT | NOT NULL, INDEX | Asset owner user ID |
| `original_filename` | VARCHAR(255) | NOT NULL | Uploaded filename |
| `storage_path` | VARCHAR(512) | NOT NULL | File path in S3 or local disk |
| `mime_type` | VARCHAR(100) | NOT NULL | Verified MIME type (`image/png`, etc.) |
| `file_size_bytes` | BIGINT | NOT NULL | Size in bytes |
| `width` | INT | NULL | Image pixel width |
| `height` | INT | NULL | Image pixel height |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Upload timestamp |

---

### 2.5. `marathi_ai` (AI Service)

#### Table: `ai_generations`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Generation request ID |
| `user_id` | BIGINT | NOT NULL, INDEX | Requesting user ID |
| `prompt_mr` | TEXT | NOT NULL | Marathi prompt input |
| `generation_type` | VARCHAR(50) | NOT NULL | `COPY`, `SLOGAN`, `LAYOUT`, `IMPROVE` |
| `response_data` | LONGTEXT | NOT NULL | JSON formatted response options |
| `provider` | VARCHAR(50) | NOT NULL, DEFAULT 'GEMINI' | AI provider used |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Generation time |

#### Table: `ai_usage_counters`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Counter ID |
| `user_id` | BIGINT | NOT NULL | User ID |
| `usage_date` | DATE | NOT NULL | Date bucket |
| `count` | INT | NOT NULL, DEFAULT 0 | Count of generations used today |
| UNIQUE KEY `uk_user_date` (`user_id`, `usage_date`) |

---

### 2.6. `marathi_billing` (Billing & Subscription Service)

#### Table: `plans`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(50) | PRIMARY KEY | Plan ID (`FREE`, `PRO_MONTHLY`, `PRO_YEARLY`, `BIZ_MONTHLY`) |
| `name_mr` | VARCHAR(100) | NOT NULL | Marathi plan name (उदा. प्रो योजना) |
| `price_inr` | INT | NOT NULL | Price in Indian Rupees |
| `billing_cycle` | VARCHAR(20) | NOT NULL | `MONTHLY`, `YEARLY`, `LIFETIME` |
| `max_projects` | INT | NOT NULL | Project quota (e.g. 5, 100, 1000) |
| `max_storage_mb` | INT | NOT NULL | Storage quota (20, 1024, 10240) |
| `daily_ai_limit` | INT | NOT NULL | AI requests per day (5, 50, 200) |
| `premium_templates` | BOOLEAN | NOT NULL, DEFAULT FALSE | Access to Pro Marathi templates |

#### Table: `subscriptions`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Subscription record ID |
| `user_id` | BIGINT | NOT NULL, INDEX | Subscribed user ID |
| `plan_id` | VARCHAR(50) | NOT NULL | References `plans(id)` |
| `status` | VARCHAR(50) | NOT NULL | `ACTIVE`, `CANCELLED`, `EXPIRED` |
| `razorpay_subscription_id` | VARCHAR(100) | NULL | External gateway subscription ID |
| `razorpay_payment_id` | VARCHAR(100) | NULL | Gateway payment reference |
| `starts_at` | TIMESTAMP | NOT NULL | Subscription start |
| `expires_at` | TIMESTAMP | NOT NULL | Subscription end / renewal |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation time |
