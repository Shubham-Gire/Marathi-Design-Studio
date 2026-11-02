# External Integrations Catalog & Integration Registry: Marathi Design Studio

This document defines all external integrations, connection statuses, required credentials, provider adapters, and documented implementation hooks.

## Integration Status Model
- **Implemented**: Locally functional and verified with existing credentials or local mock provider.
- **Requires configuration**: Code and provider adapter ready; awaiting production environment variables or API keys.
- **Requires external API**: UI entry points and hooks established; requires third-party API subscription.
- **Requires provider approval**: Awaiting OAuth app verification or merchant account activation.
- **Planned**: Architecturally mapped for future milestone.

---

## 1. AI Creative Providers

| Integration Name | Category | Status | Required Credentials / Env Vars | Hook / Provider Adapter | Setup Instructions |
|---|---|---|---|---|---|
| Google Gemini 1.5 Pro | AI Copy & Layout | Implemented / Ready | `GEMINI_API_KEY` | `services/ai-service/.../GeminiClient.java` | Set `GEMINI_API_KEY` in `ai-service/application.yml` or environment. |
| Stability AI (Stable Diffusion) | AI Image Generation | Requires configuration | `STABILITY_API_KEY` | `frontend/src/services/integrations/stabilityAdapter.ts` | Obtain API key from stability.ai; configure in settings or `.env`. |
| OpenAI (DALL-E 3 & GPT-4o) | AI Image & Writing | Requires configuration | `OPENAI_API_KEY` | `frontend/src/services/integrations/openaiAdapter.ts` | Provide OpenAI secret key with model access enabled. |
| Remove.bg | AI Background Remover | Requires configuration | `REMOVE_BG_API_KEY` | `frontend/src/services/integrations/removeBgAdapter.ts` | Register at remove.bg, retrieve API key, configure in Studio Settings. |
| ElevenLabs | AI Voice & Text-to-Speech | Requires configuration | `ELEVENLABS_API_KEY` | `frontend/src/services/integrations/elevenLabsAdapter.ts` | Configure ElevenLabs voice ID and API key for Marathi & English TTS. |
| Runway ML | AI Video Generation | Requires external API | `RUNWAY_API_KEY` | `frontend/src/services/integrations/runwayAdapter.ts` | Enterprise video generative pipeline hook. |

---

## 2. Stock Media & Asset Libraries

| Integration Name | Category | Status | Required Credentials / Env Vars | Hook / Provider Adapter | Setup Instructions |
|---|---|---|---|---|---|
| Unsplash API | Stock Photos | Requires configuration | `UNSPLASH_ACCESS_KEY` | `frontend/src/services/integrations/unsplashAdapter.ts` | Create developer app on unsplash.com to access 5M+ royalty-free photos. |
| Pexels API | Photos & Videos | Requires configuration | `PEXELS_API_KEY` | `frontend/src/services/integrations/pexelsAdapter.ts` | Free API key from pexels.com/api for high-res stock photography & video. |
| Pixabay API | Vectors & Illustrations | Requires configuration | `PIXABAY_API_KEY` | `frontend/src/services/integrations/pixabayAdapter.ts` | Configure Pixabay API key for vector stickers and graphic elements. |

---

## 3. Social Media Publishing Platforms

| Integration Name | Category | Status | Required Credentials / Env Vars | Hook / Provider Adapter | Setup Instructions |
|---|---|---|---|---|---|
| Instagram Graph API | Social Publishing | Requires provider approval | `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET` | `frontend/src/services/integrations/instagramPublisher.ts` | Meta Developer app review required for `instagram_content_publish` scope. |
| Facebook Pages API | Social Publishing | Requires provider approval | `FACEBOOK_APP_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN` | `frontend/src/services/integrations/facebookPublisher.ts` | Requires Facebook Login with `pages_manage_posts` permission. |
| LinkedIn API | Social Publishing | Requires configuration | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | `frontend/src/services/integrations/linkedinPublisher.ts` | Standard LinkedIn OAuth 2.0 app with Community Management API. |
| X (Twitter) API v2 | Social Publishing | Requires configuration | `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN` | `frontend/src/services/integrations/twitterPublisher.ts` | X Developer Portal elevated access for tweet creation and media upload. |
| WhatsApp Cloud API | Direct Messaging | Requires configuration | `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TOKEN` | `frontend/src/services/integrations/whatsappPublisher.ts` | Meta WhatsApp Business Platform account for status and message distribution. |

---

## 4. Cloud Storage & Backup Providers

| Integration Name | Category | Status | Required Credentials / Env Vars | Hook / Provider Adapter | Setup Instructions |
|---|---|---|---|---|---|
| Google Drive | Cloud Storage | Requires configuration | `GOOGLE_CLIENT_ID`, `GOOGLE_DRIVE_API_KEY` | `frontend/src/services/integrations/googleDriveAdapter.ts` | Google Cloud Console project with Google Drive API v3 enabled. |
| Dropbox | Cloud Storage | Requires configuration | `DROPBOX_APP_KEY`, `DROPBOX_SECRET` | `frontend/src/services/integrations/dropboxAdapter.ts` | Dropbox Chooser & Saver app configuration. |
| AWS S3 / MinIO | Object Storage | Implemented / Ready | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET` | `services/media-service/.../S3StorageService.java` | Default local configuration targets local storage with S3 fallback. |

---

## 5. Payments, Billing & Fulfillment

| Integration Name | Category | Status | Required Credentials / Env Vars | Hook / Provider Adapter | Setup Instructions |
|---|---|---|---|---|---|
| Razorpay Payment Gateway | Subscriptions & Checkout | Requires configuration (Mock active) | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | `services/billing-service/.../RazorpayClient.java` | Currently running verified development mock payment; provide live keys for production. |
| Stripe Checkout | International Payments | Planned | `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` | `frontend/src/services/integrations/stripeAdapter.ts` | Stripe dashboard webhook and API keys for non-INR subscriptions. |
| Print-on-Demand (Gelato / Printful) | Merchandise Fulfillment | Requires external API | `PRINT_FULFILLMENT_API_KEY` | `frontend/src/services/integrations/fulfillmentAdapter.ts` | Automate mug, t-shirt, and banner printing orders directly from canvas. |

---

## 6. Authentication & SSO

| Integration Name | Category | Status | Required Credentials / Env Vars | Hook / Provider Adapter | Setup Instructions |
|---|---|---|---|---|---|
| JWT & BCrypt Native Auth | Identity | Implemented | `JWT_SECRET` | `services/identity-service/.../JwtTokenProvider.java` | Fully active and tested. |
| Google OAuth 2.0 | Social Sign-In | Requires configuration | `VITE_GOOGLE_CLIENT_ID` | `frontend/src/services/integrations/googleAuthAdapter.ts` | Google Identity Services OAuth Client ID for one-click login. |
| Enterprise SAML / SSO | Single Sign-On | Planned | `SAML_METADATA_URL`, `IDP_ENTITY_ID` | `services/identity-service/.../SamlConfig.java` | Enterprise identity provider hook for corporate workspaces. |
