# Feature Inventory & Backlog: Marathi Design Studio

This document provides a comprehensive feature inventory covering every module specified in the Master Prompt. Each feature is cataloged with its implementation status, acceptance criteria, dependencies, and test verification.

## Status Legend
- **Implemented and tested**: Fully implemented, verified with automated unit/E2E tests or manual verification scripts, and actively running in the application.
- **UI ready**: Complete user interface, controls, buttons, tooltips, dialogs, and integration points implemented, awaiting future full business logic or user configuration.
- **Partially implemented**: Core functionality implemented across frontend and backend, with secondary capabilities scheduled for future iterations.
- **Blocked**: Complete UI entry point and honest setup modal implemented; awaiting external credentials/APIs, merchant activation, or cloud infrastructure.

---

## 1. Global Application Navigation & Shell

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| English-Only Interface | Implemented and tested | All navigation labels, buttons, tooltips, and system dialogs are strictly in English. | Frontend UI | Verified across all 20 pages |
| Main Sidebar & App Shell | Implemented and tested | Persistent left navigation drawer with links to Home, Templates, Projects, Brand Kit, AI Studio, Presentations, Documents, Whiteboards, Spreadsheets, Video, Websites, Social Media, Apps, Settings, Trash, Admin. | React Router | Verified in `comprehensive-canva-platform-test.mjs` |
| Global Search / Command Palette | Implemented and tested | Modal opened via `/` or `Ctrl+E`/`Cmd+E` allowing searchable discovery of actions, tools, templates, elements, and settings. | Command registry | Hotkey triggered, full action dispatch |
| Home Dashboard Hub | Implemented and tested | Suggested design types, blank canvas triggers, recent designs, template carousels, storage/quota indicators, notifications. | ProjectService, TemplateService | Dashboard rendered with dynamic quotas |

---

## 2. Design Creation & Template Categories

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Marketing & Social Media Templates | Implemented and tested | Instagram Posts/Stories/Reels, Facebook Posts/Covers, YouTube Thumbnails, LinkedIn Banners, WhatsApp Status. | TemplateService | Catalog loaded with editable JSON |
| Print & Business Templates | Implemented and tested | Posters, Flyers, Business Cards, Letterheads, Invoices, Menus, Certificates, Invitations. | TemplateService | Seeded and editable |
| Creative Products Templates | Implemented and tested | Presentations, Documents, Whiteboards, Spreadsheets, Videos, Websites, Resumes, QR Codes. | TemplateService | Starter templates available |
| Marathi & Bilingual Categories | Implemented and tested | Festival/religious celebrations, Maharashtra cultural events, retail promotions, food/juice centers, education, Marathi quotes. | TemplateService, MySQL | Devanagari text rendered correctly |
| Reusable Editable JSON Templates | Implemented and tested | No flattened images; all templates load real Fabric.js objects, layers, text, and shapes. | Fabric.js, TemplateService | E2E verified in canvas |

---

## 3. Design Editor Workspace & Tools

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Central Interactive Canvas | Implemented and tested | Fabric.js canvas with drag, drop, rotate, scale, skew, and multi-select bounding boxes. | Fabric.js | `canva-editor-e2e.mjs` |
| Multi-Page Support | Implemented and tested | Add new blank page, duplicate page, delete page, thumbnail navigation, page reordering. | Fabric.js state | `editor-features-test.mjs` |
| Zoom & Pan Workspace | Implemented and tested | Zoom In (`Ctrl++`), Zoom Out (`Ctrl+-`), Reset 100% (`Ctrl+0`), Fit to screen, mousewheel zoom, spacebar drag pan. | Editor viewport | Interactive in canvas |
| Rulers, Guides & Snapping | Implemented and tested | Toggleable pixel rulers with live cursor indicator lines, 5% print bleed safety margin overlay, 20px precision alignment grid, and center snapping guides. | Canvas overlays | Verified in `edit-area-functionality-test.mjs` |
| In-Canvas Right-Click Context Menu | Implemented and tested | Desktop-grade contextual popup with Cut, Copy, Paste, Duplicate, Delete, Layer order, Page alignment, Flip H/V, and Lock controls. | Canvas event hook | Verified in `edit-area-functionality-test.mjs` |
| Fullscreen Slide Presentation Mode | Implemented and tested | Presentation overlay with keyboard arrow navigation, slide counter, and Escape exit. | Presentation engine | Verified in `edit-area-functionality-test.mjs` |
| Contextual Floating Toolbar | Implemented and tested | Dynamic toolbar reacting to selected object: Text, Shapes, Images, Multi-selection, Group, Canvas background. | React state | Toolbar verified across all types |
| Full-Screen Editor Mode | Implemented and tested | Distraction-free full-screen editing mode toggleable via UI button and shortcut. | Browser Fullscreen API | Working via header button |

---

## 4. Canvas Object Manipulation & 19-Tool Dock

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| 19-Tool Left Sidebar Dock & Drawers | Implemented and tested | Full vertical dock and slide-out drawers for Templates, Layouts, Elements, Text, Fonts, Uploads, Photos, Videos, Audio, Background, Draw, Charts, Tables, Frames, Grids, Brand Kit, Projects, Apps, Layers. | CanvaDock, CanvaDrawer | Tested in UI and automated suites |
| Text Typography & Effects Suite | Implemented and tested | Font family, size, color, bold, italic, underline, case toggle (`aA`), letter spacing, line height, Drop Shadow, Kesari Glow, Hollow Outline, Soft Lift, Cyan Neon, and Background Highlight Pill. | Fabric.js Textbox | Tested in `edit-area-functionality-test.mjs` |
| Image Manipulation & Local Adjustments | Implemented and tested | Brightness (-100 to 100), Contrast, Saturation, Blur sliders, Grayscale, Vintage Sepia, Invert filters, opacity, flip horizontal/vertical, rotate. | Fabric.js WebGL / Canvas filters | Filter pipeline active |
| Shape Manipulation & Border Styles | Implemented and tested | Rectangles, circles, triangles, stars, lines; fill color, stroke color, stroke width, border style (Solid, Dashed, Dotted), and corner radius sliders. | Fabric.js Shapes | Elements drawer tested |
| Interactive Chart Generator | Implemented and tested | Dynamic Bar, Pie, Line, Donut charts with customizable labels, numerical series, and 1-click canvas placement. | SVG / Fabric.js | Verified in CanvaDrawer |
| Table Generator | Implemented and tested | Configurable tabular grids with rows, columns, and header styling. | Canvas table generator | Verified in CanvaDrawer |
| Photo Frames & Mockups | Implemented and tested | Circle, smartphone device mockup, and floral arch frames for image clipping. | Canvas clipping path | Verified in CanvaDrawer |
| Built-in QR Code Generator | Implemented and tested | Custom URL / UPI payment text entry, foreground/background color picker, and 1-click canvas placement. | SVG QR engine | Tested in CanvaDrawer |
| Multi-Selection & Grouping | Implemented and tested | Shift-click, bounding box drag select, Group (`Ctrl+G`), Ungroup (`Ctrl+Shift+G`), multi-align (left, center, right, top, middle, bottom), horizontal/vertical distribution. | Fabric.js ActiveSelection | `editor-features-test.mjs` |
| Layer Ordering | Implemented and tested | Bring Forward (`Ctrl+]`), Send Backward (`Ctrl+[`), Bring to Front (`Ctrl+Shift+]`), Send to Back (`Ctrl+Shift+[`). | Fabric.js z-index | Contextual toolbar tested |
| Lock & Unlock | Implemented and tested | Lock objects to prevent accidental movement; unlock via toolbar and shortcut. | Fabric.js lock properties | Toolbar lock toggle tested |
| Clipboard & Duplication | Implemented and tested | Copy (`Ctrl+C`), Paste (`Ctrl+V`), Cut (`Ctrl+X`), Duplicate (`Ctrl+D`), Delete (`Del`/`Backspace`). | In-memory clipboard | `editor-features-test.mjs` |
| Undo & Redo History | Implemented and tested | Stack-based undo/redo preserving object states, positions, colors, and text changes (`Ctrl+Z`, `Ctrl+Y`). | Editor history stack | Tested in canvas workflow |

---

## 4B. Canva-Grade Contextual HUD, Elements & Advanced Features (Images 1–5)

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Floating Quick-Action HUD | Implemented and tested | Floating capsule hovering directly above selected canvas element containing Comment, Lock/Unlock, Duplicate, Delete, Magic Wand, and More options (`...`). | CanvaFloatingHud | Verified in `canva-screenshots-features-test.mjs` |
| Circular Rotation Handle Indicator | Implemented and tested | Floating circular rotation handle indicator positioned directly below the active element bounding box. | CanvaFloatingHud | Verified in live canvas |
| Full-Width Add Page Pill Button | Implemented and tested | Prominent pill button with dropdown positioned directly below the canvas artboard for instant multi-page workflow. | CanvasEditor | Verified in `canva-screenshots-features-test.mjs` |
| 12 Browse Categories Gradient Tiles | Implemented and tested | 12 vibrant colorful gradient tiles in Elements drawer: Shapes, Graphics, Animations, Photos, Videos, Audio, Charts, Forms, Sheets, Tables, Frames, Grids with 1-click navigation. | CanvaDrawer | Verified in `canva-screenshots-features-test.mjs` |
| Quick Icons Strip & Recommendations | Implemented and tested | Horizontal icon strip (LinkedIn, GitHub, Instagram, WhatsApp, X, User) and Recommended elements strip with "See all". | CanvaDrawer | Verified in `canva-screenshots-features-test.mjs` |
| Curated Font Combinations | Implemented and tested | 10 authentic 2-column cards (creating MAGIC, Thank you!, GOLDEN HOUR, player one, Happy BIRTHDAY, FREE DREAMS, BUSINESS JOURNAL, श्री गणेशाय नमः, वाढदिवसाच्या शुभेच्छा, राजेशाही थाट) with 1-click canvas placement. | CanvaDrawer | Verified in `canva-screenshots-features-test.mjs` |
| Brand Kit Onboarding Progress & Pills | Implemented and tested | Brand Kit header with dropdown, `+ All assets` CTA, "You're on your way!" 1/3 progress banner, and sub-nav pills (Brand Templates, Logos, Colors, Fonts, Guidelines, Photos). | CanvaDrawer | Verified in `canva-screenshots-features-test.mjs` |
| Logo Templates & Pro Badges | Implemented and tested | 2-column logo template grid with Pro crown badges and search with voice mic. | CanvaDrawer | Verified in `canva-screenshots-features-test.mjs` |
| Presenter Notes Drawer | Implemented and tested | Slide presenter notes drawer at bottom of screen with page-specific autosaved speaker notes and talking points. | CanvaNotesDrawer | Verified in `canva-screenshots-features-test.mjs` |
| Presentation Stopwatch & Timer Modal | Implemented and tested | Design countdown timer and stopwatch with 1m, 3m, 5m, 10m presets, digital display, start/pause, and reset. | CanvaTimerModal | Verified in `canva-screenshots-features-test.mjs` |

---

## 5. Keyboard Shortcuts Registry

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Central Shortcut Registry | Implemented and tested | Centralized event dispatching with input/textarea exclusion to prevent typing interference. | Event listeners | Automated shortcut tests |
| Windows/Linux & macOS Conventions | Implemented and tested | Dynamic detection of `Ctrl` vs `Cmd` modifiers with accurate tooltip display. | UserAgent detection | Rendered on tooltips & modal |
| Searchable Shortcut Modal | Implemented and tested | Help cheatsheet opened via `?` or toolbar button, organized by category. | Modal UI | `CanvaShortcutsModal.tsx` |
| Element Insertion Hotkeys | Implemented and tested | `T` (text), `R` (rectangle), `C` (circle), `L` (line), `S` (sticky note) when canvas focused. | Shortcut registry | Hotkey dispatch verified |

---

## 6. Fonts & Multilingual Typography

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Authentic Devanagari Fonts | Implemented and tested | Noto Sans Devanagari, Noto Serif Devanagari, Mukta, Hind, Tiro Devanagari Marathi, Gotu, Rozha One, Modak. | Google Fonts / Web fonts | Unicode matras verified |
| Latin & English Font Library | Implemented and tested | Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Bebas Neue, Oswald, Merriweather, Playfair Display. | Google Fonts | Rendered in font selector |
| Font Category Filters & Search | Implemented and tested | Search fonts, filter by Devanagari, Latin, Sans-serif, Serif, Display, Calligraphy. | CanvaFontSelector | Tested in toolbar |
| Mixed-Language Formatting | Implemented and tested | Independent text objects supporting Devanagari, English, or mixed characters in a single design. | Fabric.js Textbox | Tested in E2E tests |
| Proper Glyph & Ligature Export | Implemented and tested | Devanagari matras, conjuncts, and half-letters preserved accurately in PNG, JPEG, and PDF downloads. | Canvas export engine | Export tests passed |

---

## 7. Elements Library & 10 GB Storage Limits

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Vector Elements Library | Implemented and tested | Geometric shapes, decorative banners, badges, seals, Marathi cultural symbols, festive graphics. | MediaService, TemplateService | Elements drawer tested |
| Stock Photos & Backgrounds | Implemented and tested | Curated high-resolution stock photos, solid colors, gradient presets, textures. | Asset catalog | Stock photos tab verified |
| Dual 10 GB Storage Limits | Implemented and tested | Independent 10 GB limits for Template Library and Elements Library with server-side byte accounting. | TemplateService JPA | Verified in `/admin/storage` |
| Storage Warnings & Rejection | Implemented and tested | Warnings at 80% and 95% capacity; rejection if upload exceeds 10 GB strict ceiling. | Storage audit service | Storage admin test passed |
| Content Deduplication & Hash | Implemented and tested | SHA-256 content hashing for library assets to prevent duplicate storage consumption. | Checksum utility | Displayed in admin table |
| Safe Cleanup & Garbage Collection | Implemented and tested | Automated and manual cleanup of unreferenced or orphaned assets without data loss. | Admin API | Cleanup action tested |

---

## 8. Photo Editing & Image Tools

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Local Image Adjustments | Implemented and tested | Grayscale, Sepia, Invert filters, opacity, flip horizontal/vertical, rotate, crop bounds. | Fabric.js Image filters | Toolbar controls tested |
| Brightness, Contrast & Blur | Implemented and tested | Interactive sliders for brightness (-100 to 100), contrast, saturation, and blur effects. | Fabric.js WebGL / Canvas filters | Filter pipeline active |
| AI Background Remover | Blocked | Complete UI entry point with setup modal explaining requirement for Remove.bg / Stability API key (`REMOVE_BG_API_KEY`). | Remove.bg API | Honest modal verified |
| AI Generative Fill & Expand | Blocked | Complete UI entry point with setup modal explaining requirement for OpenAI DALL-E / Stability Inpainting API. | Stability Inpainting API | Honest modal verified |
| Product Mockup Generator | Partially implemented | Local CSS/SVG mockup frames with placeholder for external 3D mockup rendering API. | Local SVG mockups | Mockup frames accessible |

---

## 9. AI Studio & Creative Assistance

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Marathi Copy Generator | Implemented and tested | Generates Marathi headlines, slogans, and invitation text based on topic and tone. | AiService (Spring Boot) | `backend-e2e-test.mjs` passed |
| AI Design Brief Assistant | Implemented and tested | Generates color palettes, typography recommendations, and layout proposals from a text brief. | AiService | E2E verified |
| AI Text Rewriter & Polisher | Implemented and tested | Expands, shortens, or formalizes Marathi and English text for posters and banners. | AiService | Tested via API |
| AI Image Generator | Blocked | Complete UI entry point with modal requiring `STABILITY_API_KEY` or `OPENAI_API_KEY`. | Stability / OpenAI API | Documented in `INTEGRATIONS.md` |
| AI Video & Voice Generation | Blocked | Complete UI entry points with setup modal requiring `RUNWAY_API_KEY` or `ELEVENLABS_API_KEY`. | Runway / ElevenLabs API | Documented in `INTEGRATIONS.md` |

---

## 10. Cloud Projects, Uploads & Persistence

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Project Persistence | Implemented and tested | Full Fabric.js canvas JSON, title, dimensions, and base64 preview saved in MySQL. | ProjectService | E2E verified |
| Autosave & Manual Save | Implemented and tested | Status indicator (Saved, Saving, Unsaved), automatic trigger on changes with debouncing, manual `Ctrl+S`. | CanvasEditor state | Verified in editor |
| Version History | Partially implemented | Version counter incremented on every save, with audit timestamps and rollback capability. | ProjectService | DB versioning verified |
| Broken Object-Level Auth (BOLA) | Implemented and tested | Strict ownership check preventing User B from accessing or altering User A's private designs (HTTP 403). | Security filter | Passed in `backend-e2e-test.mjs` |
| User Media Uploads | Implemented and tested | Multipart file upload for PNG, JPEG, SVG with client & server-side size validation. | MediaService | Uploads drawer tested |

---

## 11. Download, Export & Print Engine

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| High-Resolution PNG Export | Implemented and tested | Export canvas as crisp PNG with selectable 1x, 2x, 3x pixel density multiplier. | Fabric.js toDataURL | Tested in export modal |
| Transparent Background Export | Implemented and tested | Optional transparent canvas background export for logos, stickers, and badges. | Fabric.js export | `editor-features-test.mjs` |
| Standard JPEG Export | Implemented and tested | JPEG download with customizable compression quality (0.7 to 1.0). | Fabric.js toDataURL | Modal verified |
| Single & Multi-Page PDF Export | Implemented and tested | Vector PDF generation using jsPDF with multi-page collation. | jsPDF | Multi-page export tested |
| Print Margins & Bleed Guides | Implemented and tested | Visual toggles for 5% safety margin and print bleed indicators on marketing collateral. | Canvas overlays | Guide overlay active |

---

## 12. Canva-Style Application Modules

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Presentations Module | Partially implemented | Slide deck creation, slide duplication, slide themes, and presenter preview mode. | Presentation engine | Dedicated `/presentations` route |
| Documents Module | Partially implemented | Rich text document editing, headings, lists, tables, and PDF document export. | Document editor | Dedicated `/documents` route |
| Whiteboards Module | Partially implemented | Sticky notes, shapes, connectors, and freehand drawing for mind mapping. | Whiteboard canvas | Dedicated `/whiteboards` route |
| Spreadsheets & Charts Module | Partially implemented | Tabular data grid, basic formulas, bar/pie/line chart visualization generator. | Chart engine | Dedicated `/spreadsheets` route |
| Video Editor & Timeline | UI ready | Video upload, timeline scrubber, text overlays, clip trimming, and export hook. | Video timeline UI | Dedicated `/video-editor` route |
| Websites & Landing Pages | Partially implemented | Section-based page builder, mobile/desktop responsive preview, and publishing hook. | Site builder UI | Dedicated `/websites` route |
| PDF Tools Suite | Partially implemented | PDF preview, page reordering, merger, splitter, and annotation tools. | PDF utilities | Dedicated `/pdf-tools` route |
| Brand Kit | Implemented and tested | Brand logos, official color palettes (Maratha, Pune, Kolhapuri, Konkan), and custom typography presets. | Brand assets store | Dedicated `/brand-kit` route |
| Social Media Planner | UI ready | Content calendar view, post scheduling UI, caption generator, and social connect hooks. | Social manager UI | Dedicated `/social-media` route |
| Creative Tools (QR, Logo, Mockup) | Implemented and tested | Built-in QR code generator, quick logo builder, and mockup frames. | Vector generator | Accessible via UI |

---

## 13. Collaboration & Sharing

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Shareable Project Links | Implemented and tested | Generate read-only or editable access links with one-click clipboard copying. | ProjectService | Share modal tested |
| Access Permissions & Roles | Partially implemented | Owner, Editor, Viewer access levels configured per project. | IdentityService | Permission checks active |
| Design Comments & Review | Partially implemented | Add sticky comments to canvas objects with author names, timestamps, and replies. | ProjectService | Comments drawer active |
| Real-Time Live Collaboration | Blocked | Complete UI entry point with setup modal explaining requirement for WebSocket / Redis PubSub infrastructure. | WebSocket server | Documented in `INTEGRATIONS.md` |

---

## 14. Authentication, Subscriptions & Billing

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| JWT Authentication & BCrypt | Implemented and tested | Registration, login, token refresh, and role enforcement (ROLE_USER, ROLE_ADMIN). | IdentityService | Verified in E2E tests |
| Free Plan Quota Enforcement | Implemented and tested | Server enforces maximum 5 projects on Free tier; rejects 6th project with HTTP 403. | ProjectService | Passed in `backend-e2e-test.mjs` |
| Pro & Business Plan Upgrades | Implemented and tested | Mock development payment gateway activating Pro tier and lifting project quotas. | BillingService | Passed in `backend-e2e-test.mjs` |
| Razorpay Live Payment Gateway | Blocked | Complete UI entry point with setup modal requiring `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. | Razorpay SDK | Honest setup dialog |
| Subscription Management | Implemented and tested | Plan details, billing cycles, cancellation workflow, and entitlement restoration. | BillingService | Cancellation tested |

---

## 15. Apps Marketplace & External Integrations

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Integrations Catalog | Implemented and tested | Searchable marketplace of third-party apps with honest status badges. | IntegrationRegistry | Dedicated `/apps` page |
| Honest Setup Dialog System | Implemented and tested | Uniform dialog explaining required environment variables, setup instructions, and hooks. | React modal | Displays setup requirements |
| Cloud Storage Providers | Blocked | Google Drive, Dropbox, AWS S3 export adapters with configuration dialogs. | Cloud SDKs | Documented in `INTEGRATIONS.md` |
| Social Publishing Platforms | Blocked | Instagram, Facebook, LinkedIn, X/Twitter publish connectors with OAuth requirements. | Social OAuth | Documented in `INTEGRATIONS.md` |
| Email & Fulfillment Providers | Blocked | Mailchimp, SendGrid, Print-on-Demand fulfillment hooks. | External APIs | Documented in `INTEGRATIONS.md` |

---

## 16. Admin Dashboard & Governance

| Feature | Status | Description & Acceptance Criteria | Dependencies | Verification |
|---|---|---|---|---|
| Library Storage Administration | Implemented and tested | Real-time byte usage, 10 GB limit trackers, SHA-256 audit table, garbage collection. | TemplateService | Tested in `AdminStoragePage.tsx` |
| User & Role Management | Partially implemented | Administrator view of registered users, roles, plan tiers, and account status. | IdentityService | Available in Admin console |
| Template & Element Catalog Mgmt | Partially implemented | Administrator controls to publish, categorize, edit tags, and delete templates/elements. | TemplateService | Admin API wired |
| System Health & Service Audits | Implemented and tested | Health checks for all microservices, MySQL databases, and background tasks. | Spring Boot Actuator | Verified via actuator |
