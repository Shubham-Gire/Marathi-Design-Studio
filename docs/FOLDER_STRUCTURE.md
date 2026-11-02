# Enterprise Folder Structure & Codebase Architecture

Marathi Design Studio is structured as an enterprise-grade monorepo combining high-performance Java 21 / Spring Boot 3.3 microservices on the backend and a modern React 19 + TypeScript + Fabric.js design suite on the frontend, supported by shared contracts, infrastructure definitions, automated tests, and comprehensive operational documentation.

```text
marathi-design-studio/
│
├── apps/ (or frontend applications)
│   └── web/ (c:/Users/DELL/Desktop/Real-Problem/frontend)
│       ├── public/                     # Static fonts, favicons, asset bundles
│       └── src/
│           ├── components/
│           │   ├── canva/              # Canva-grade editor components
│           │   │   ├── CanvaHeader.tsx          # Top toolbar & menu actions
│           │   │   ├── CanvaToolbar.tsx         # Contextual properties panel
│           │   │   ├── CanvaDock.tsx            # 19-tool left sidebar dock
│           │   │   ├── CanvaDrawer.tsx          # Dedicated tool flyout drawers
│           │   │   ├── CanvaBottomBar.tsx       # Pages & zoom control bar
│           │   │   ├── CanvaContextMenu.tsx     # In-canvas right-click menu
│           │   │   ├── CanvaRulers.tsx          # Ticks, margins & grid overlays
│           │   │   ├── CanvaPresentationModal.tsx# Fullscreen presentation mode
│           │   │   ├── CanvaExportModal.tsx     # High-res export modal
│           │   │   ├── CanvaResizeModal.tsx     # Dimensions & social presets
│           │   │   └── CanvaShortcutsModal.tsx  # Keyboard shortcuts reference
│           │   ├── Navbar.tsx                   # Main global shell navigation
│           │   ├── AuthModal.tsx                # English login/register modal
│           │   ├── PricingModal.tsx             # Free vs Pro upgrade modal
│           │   ├── AiAssistantModal.tsx         # Marathi AI copywriting modal
│           │   ├── CommandPaletteModal.tsx      # Global / or Ctrl+E command search
│           │   └── IntegrationSetupModal.tsx    # Honest integration setup dialog
│           ├── pages/                           # 20+ dedicated application modules
│           │   ├── HomePage.tsx                 # SaaS landing page & hero
│           │   ├── DashboardPage.tsx            # User projects, media & quotas
│           │   ├── TemplatesPage.tsx            # 28+ authentic Marathi templates
│           │   ├── EditorPage.tsx               # Central poster editor
│           │   ├── BrandKitPage.tsx             # Brand color palettes & logos
│           │   ├── AiStudioPage.tsx             # Dedicated AI copy & brief studio
│           │   ├── PresentationsPage.tsx        # Slide deck & presentation tools
│           │   ├── DocumentsPage.tsx            # Formal letterheads & documents
│           │   ├── WhiteboardsPage.tsx          # Infinite visual brainstorming
│           │   ├── SpreadsheetsPage.tsx         # Table & business financial data
│           │   ├── VideoEditorPage.tsx          # Motion flyers & timeline trimmer
│           │   ├── WebsitesPage.tsx             # Landing page visual builder
│           │   ├── PdfToolsPage.tsx             # PDF merge, split & print prep
│           │   ├── SocialMediaPage.tsx          # Instagram/WhatsApp post planner
│           │   ├── AppsPage.tsx                 # Integration directory & setup
│           │   ├── PricingPage.tsx              # Plans, features & mock payments
│           │   ├── SettingsPage.tsx             # User profile & preferences
│           │   ├── HelpCenterPage.tsx           # Guides & documentation
│           │   ├── AdminPage.tsx                # System administration
│           │   └── AdminStoragePage.tsx         # Dual 10 GB limit enforcement
│           ├── config/
│           │   ├── marathiFonts.ts              # AMS & Google Devanagari fonts
│           │   ├── fontLibrary.ts               # Universal typography definitions
│           │   ├── calligraphyPresets.ts        # Traditional Devanagari calligraphy
│           │   └── stockPhotos.ts               # Maharashtra heritage & business photos
│           ├── context/
│           │   └── AuthContext.tsx              # JWT session state & Pro entitlement
│           ├── services/
│           │   ├── api.ts                       # REST client with Bearer auth
│           │   └── shortcutRegistry.ts          # Centralized keyboard shortcuts
│           └── types/
│               └── index.ts                     # TypeScript data interfaces
│
├── backend/ (Backend Microservices Module & Parent POM)
│   ├── pom.xml                         # Backend Maven parent POM
│   ├── README.md                       # Backend architecture & microservice ports
│   └── services/                       # 7 Spring Boot 3.3 Microservices
│       ├── api-gateway/ (Port 8080)    # Reverse proxy, CORS, JWT verification
│       ├── identity-service/ (Port 8081)# Auth, BCrypt, user profile management
│       ├── template-service/ (Port 8082)# 28+ templates, 10 GB storage accounting
│       ├── project-service/ (Port 8083)# Multi-page documents, BOLA security
│       ├── media-service/ (Port 8084)  # File uploads, thumbnails, S3 adapter
│       ├── ai-service/ (Port 8085)     # Marathi copywriter, layout assistant
│       └── billing-service/ (Port 8086)# Plan tiers, Razorpay gateway adapters
│
├── packages/ (Shared Contracts & Modules)
│   ├── shared-types/                   # Universal data transfer interfaces
│   ├── design-document-schema/         # Multi-page Fabric JSON document schema
│   ├── font-registry/                  # Devanagari & Latin font metadata
│   ├── shortcut-registry/              # Cross-platform shortcut mapping
│   └── design-engine/                  # Snapping math, bleed margins, export scaling
│
├── infra/ (Infrastructure & Configuration)
│   ├── docker/                         # Docker compose & container definitions
│   ├── mysql/init.sql                  # 6 UTF8mb4 Devanagari database schemas
│   ├── object-storage/                 # MinIO / S3 dual 10 GB limit policies
│   └── monitoring/                     # Healthcheck probes for all 7 services
│
├── tests/ (Automated Test Suites)
│   ├── backend-e2e-test.mjs            # 21 integration & security test assertions
│   └── e2e/
│       ├── comprehensive-canva-platform-test.mjs # 21 module routes & tools test
│       ├── storage-elements-workflow-test.mjs    # 10 GB limits & elements test
│       └── edit-area-functionality-test.mjs      # Advanced editor interaction test
│
├── scripts/ (Operational CLI Scripts)
│   ├── start-all.mjs                   # Starts backend cluster & frontend server
│   ├── stop-all.mjs                    # Gracefully terminates all background services
│   ├── run-all-tests.mjs               # Executes full integration & E2E suite
│   └── verify-storage-quotas.mjs       # Validates independent 10 GB storage limits
│
├── docs/ (Complete System Documentation)
│   ├── ARCHITECTURE.md                 # System architecture & data flow
│   ├── FOLDER_STRUCTURE.md             # This directory reference guide
│   ├── FEATURE_BACKLOG.md              # Status of every feature (Implemented/UI ready)
│   ├── EDITOR_SPECIFICATION.md         # Detailed canvas editor technical specification
│   ├── KEYBOARD_SHORTCUTS.md           # Master shortcuts cheat sheet (Win/Mac)
│   ├── API_CONTRACTS.md                # Swagger/OpenAPI endpoints contract
│   ├── INTEGRATIONS.md                 # Integration placeholders & credentials
│   ├── SECURITY.md                     # BOLA protection, JWT, BCrypt, input sanitization
│   ├── TEST_RESULTS.md                 # Verified test run logs & evidence
│   └── DEPLOYMENT.md                   # Local, Docker, and Production deployment guide
│
├── package.json                        # Root monorepo workspace package
├── pom.xml                             # Parent Maven POM for Java 21 microservices
├── docker-compose.yml                  # Production stack composition
└── README.md                           # Master project overview
```
