# API Contracts: Marathi Design Studio (मराठी डिझाईन स्टुडिओ)

All requests to the backend pass through the API Gateway on port `8080` (or directly to individual services when tested locally).
Authentication is conveyed via `Authorization: Bearer <JWT_ACCESS_TOKEN>`. The Gateway injects claims into downstream headers:
- `X-User-Id`: Numeric ID of the authenticated user
- `X-User-Email`: Email address
- `X-User-Role`: `ROLE_USER` or `ROLE_ADMIN`
- `X-Plan-Tier`: `FREE`, `PRO`, or `BUSINESS`

---

## 1. Identity & Account Service (`/api/v1/auth`, `/api/v1/users`)

### `POST /api/v1/auth/register`
**Request:**
```json
{
  "email": "ganesh@example.com",
  "password": "SecurePassword123!",
  "fullName": "गणेश पाटील",
  "phoneNumber": "9876543210"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "नोंदणी यशस्वी झाली! आपले स्वागत आहे.",
  "accessToken": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "email": "ganesh@example.com",
    "fullName": "गणेश पाटील",
    "role": "ROLE_USER",
    "planTier": "FREE"
  }
}
```

### `POST /api/v1/auth/login`
**Request:**
```json
{
  "email": "ganesh@example.com",
  "password": "SecurePassword123!"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "email": "ganesh@example.com",
    "fullName": "गणेश पाटील",
    "role": "ROLE_USER",
    "planTier": "FREE"
  }
}
```

### `GET /api/v1/auth/me`
**Headers:** `Authorization: Bearer <token>`
**Response (200 OK):** Returns current user details.

---

## 2. Template Service (`/api/v1/templates`, `/api/v1/categories`)

### `GET /api/v1/categories`
**Response (200 OK):**
```json
[
  { "id": 1, "slug": "festivals", "nameMr": "सण आणि उत्सव", "iconName": "Sparkles" },
  { "id": 2, "slug": "business", "nameMr": "व्यवसाय जाहिराती", "iconName": "Briefcase" },
  { "id": 3, "slug": "offers", "nameMr": "दुकानांचे ऑफर्स", "iconName": "Tag" },
  { "id": 4, "slug": "birthday", "nameMr": "वाढदिवस आणि शुभेच्छा", "iconName": "Gift" },
  { "id": 5, "slug": "wedding", "nameMr": "लग्नपत्रिका आणि निमंत्रणे", "iconName": "Heart" },
  { "id": 6, "slug": "social", "nameMr": "सामाजिक माध्यम पोस्ट", "iconName": "Share2" },
  { "id": 7, "slug": "education", "nameMr": "शिक्षण आणि शैक्षणिक कार्यक्रम", "iconName": "BookOpen" },
  { "id": 8, "slug": "suvichar", "nameMr": "प्रेरणादायी सुविचार", "iconName": "Quote" }
]
```

### `GET /api/v1/templates?category=festivals&search=दिवाळी`
**Response (200 OK):** Array of templates with metadata, dimensions, plan tier (`FREE` or `PRO`), and thumbnail.

### `GET /api/v1/templates/{id}`
**Response (200 OK):** Full template JSON including `canvasJson` (Fabric.js scene structure ready to load into editor).

---

## 3. Project & Design Service (`/api/v1/projects`)

### `GET /api/v1/projects`
**Headers:** `Authorization: Bearer <token>`
**Response (200 OK):** List of user's saved designs (with ID, title, dimensions, thumbnail, updated timestamp).

### `POST /api/v1/projects`
**Request:**
```json
{
  "title": "माझी नवीन पोस्ट",
  "width": 1080,
  "height": 1080,
  "canvasJson": "{\"version\":\"5.3.0\",\"objects\":[...]}",
  "thumbnailData": "data:image/png;base64,..."
}
```
**Response (201 Created):** Created project record. Enforces Free plan quota (e.g. 403 Forbidden if quota exceeded).

### `GET /api/v1/projects/{id}`
**Headers:** `Authorization: Bearer <token>`
**Response (200 OK):** Full project document. Strict ownership validation (403 if project belongs to another user).

### `PUT /api/v1/projects/{id}`
**Request:** Updates canvas JSON, thumbnail, and title. Increments version counter.

### `DELETE /api/v1/projects/{id}`
**Response (204 No Content):** Deletes user's project.

---

## 4. Media & Asset Service (`/api/v1/media`)

### `POST /api/v1/media/upload`
**Content-Type:** `multipart/form-data` (file: Binary, userId from auth)
**Validation:** Verifies file size (under max quota), MIME type (`image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`).
**Response (201 Created):**
```json
{
  "id": 12,
  "originalFilename": "ganpati-bappa.png",
  "url": "/api/v1/media/file/12",
  "mimeType": "image/png",
  "fileSizeBytes": 450120
}
```

### `GET /api/v1/media`
**Response (200 OK):** Array of user's uploaded assets.

---

## 5. AI Service (`/api/v1/ai`)

### `POST /api/v1/ai/generate-copy`
**Request:**
```json
{
  "topic": "गणेशोत्सव सण शुभेच्छा",
  "tone": "भक्तिमय",
  "category": "festivals"
}
```
**Response (200 OK):**
```json
{
  "headlines": [
    "गणपती बाप्पा मोरया! सर्व गणेशभक्तांना हार्दिक शुभेच्छा.",
    "बुद्धीची देवता, विघ्नहर्ता श्री गणेशाचे आपल्या घरी आगमन!"
  ],
  "slogans": [
    "सुखकर्ता दुःखहर्ता, विघ्नविनाशक मोरया!",
    "आनंद, सुख आणि समृद्धी लाभो हीच बाप्पाच्या चरणी प्रार्थना."
  ],
  "invitations": [
    "आमच्या निवासस्थानी श्री गणेशाच्या दर्शनासाठी व महाप्रसादासाठी आपण सपरिवार सहर्ष निमंत्रित आहात."
  ]
}
```

### `POST /api/v1/ai/design-assistant`
**Request:** Marathi prompt e.g. "माझ्या ज्यूस सेंटरसाठी उन्हाळी ऑफरची पोस्ट तयार करा"
**Response (200 OK):** Proposes headlines, color schemes (`#FF7A00`, `#FFD200`), font recommendations (`Mukta Bold`, `Noto Sans Devanagari`), and suitable template IDs.

---

## 6. Billing & Subscription Service (`/api/v1/billing`)

### `GET /api/v1/billing/plans`
**Response (200 OK):** Details of Free (₹0), Pro (₹299/mo), and Business (₹799/mo) plans.

### `POST /api/v1/billing/checkout`
**Request:** `{ "planId": "PRO_MONTHLY" }`
**Response (200 OK):** Generates order or simulates mock payment confirmation in test mode.

### `POST /api/v1/billing/mock-activate`
**Request:** `{ "planId": "PRO_MONTHLY" }`
**Response (200 OK):** Activates Pro tier for user in development mode with clear indicator.
