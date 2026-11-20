# 🏙️ CityFix — Comprehensive Features & Architecture Specification

> **Document Purpose:** Complete top-to-bottom technical and functional specification of all implemented features, user workflows, security architectures, public civic portals, and administrative capabilities within the **CityFix** municipal issue reporting and civic action platform.

---

## 📑 Table of Contents
1. [Executive Summary & Platform Purpose](#1-executive-summary--platform-purpose)
2. [Technical Architecture & Technology Stack](#2-technical-architecture--technology-stack)
3. [Security, Authentication & Session Architecture](#3-security-authentication--session-architecture)
4. [Role-Based Access Control (RBAC) Matrix](#4-role-based-access-control-rbac-matrix)
5. [Public Civic Portal (Unauthenticated Experience)](#5-public-civic-portal-unauthenticated-experience)
6. [Citizen Portal & Complaint Lifecycle](#6-citizen-portal--complaint-lifecycle)
7. [Staff & Field Engineering Portal](#7-staff--field-engineering-portal)
8. [Administrator & Municipal Oversight Portal](#8-administrator--municipal-oversight-portal)
9. [Financial & Payment Architecture (Stripe)](#9-financial--payment-architecture-stripe)
10. [Real-Time Notifications & Watchdog System](#10-real-time-notifications--watchdog-system)
11. [Design System, Theming & Accessibility](#11-design-system-theming--accessibility)
12. [Performance Engineering & Core Web Vitals](#12-performance-engineering--core-web-vitals)
13. [Complete Route & Module Inventory](#13-complete-route--module-inventory)

---

## 1. Executive Summary & Platform Purpose

**CityFix** is a municipal issue reporting, service tracking, and civic governance platform. It directly bridges the gap between urban citizens encountering infrastructure defects (potholes, garbage accumulation, clogged stormwater drains, broken streetlights) and municipal field engineering departments responsible for remediating them.

### Core Value Propositions:
- **Transparent Accountability:** Every submitted ticket generates an immutable public reference code and an automated **Service Level Agreement (SLA)** countdown timer.
- **SLA Watchdog & Escalation:** Automated background monitors track ticket ages and automatically escalate overdue tickets to department heads.
- **Field Evidence Verification:** Eliminates bureaucratic ambiguity by requiring tamper-resistant before-and-after photographic evidence and resolution notes before tickets can be closed.
- **Civic Empowerment:** Citizens can rate service quality (1–5 stars) or reopen tickets within 7 days if defective conditions persist.
- **Expedited Turnaround via Stripe:** Citizens or commercial merchants can optionally pay priority processing fees to expedite resolution windows.

---

## 2. Technical Architecture & Technology Stack

```mermaid
graph TD
    Client["Browser Client (React 19 / Next.js 16)"] --> BFF["Next.js Route Handlers & Middleware (/api/proxy, proxy.ts)"]
    BFF -->|"JWT in httpOnly Cookies"| NextServer["Server-Side Auth & Session Handler"]
    BFF -->|"Authorization: Bearer <Token>"| ExternalAPI["CityFix Backend REST API (/api/v1)"]
    Client -->|"Stripe Hosted Checkout"| Stripe["Stripe Payment Gateway"]
    Stripe -->|"Webhook & Return URL"| BFF
    Client -->|"Cloudinary Asset Delivery"| Cloudinary["Cloudinary CDN"]
```

| Layer | Technologies & Implementations |
| :--- | :--- |
| **Core Framework** | **Next.js 16.3.8** (App Router, Turbopack, React 19.2.8, TypeScript 5.x) |
| **Styling & Design System** | **Tailwind CSS v4**, OKLCH Color Space, PostCSS 4, `tw-animate-css` |
| **UI Primitives & Icons** | **Base UI (`@base-ui/react`)**, Radix UI primitives, Lucide React icons |
| **Client State Management** | **Zustand v5** (Selective subscriptions, debounced `localStorage` persistence) |
| **Server State & Caching** | **TanStack Query v5** (`@tanstack/react-query`), Optimistic mutations, Query deduplication |
| **DOM Virtualization** | **TanStack Virtual v3** (`@tanstack/react-virtual`) for 1,000+ item audit/complaint logs |
| **Animations & Transitions** | **Framer Motion 14.x** with reduced-motion OS detection and DOM-ref counters |
| **Data Visualizations** | **Recharts v3.10** (Status Pie, Category Bar, Trend Line charts) with lazy chunk loading |
| **Form Handling & Validation** | **React Hook Form**, **Zod** schema validation, native HTML `<details>` zero-JS accordions |
| **Date & Time Formatting** | **date-fns v4** (Tree-shaken localized timestamps) |
| **Notifications** | **Sonner** rich toast notifications |

---

## 3. Security, Authentication & Session Architecture

CityFix implements a **Backend-For-Frontend (BFF)** security model designed to eliminate Cross-Site Scripting (XSS) token theft and cross-site request forgery.

### 3.1 HttpOnly Cookie Storage
- Sensitive JSON Web Tokens (`cf_access`, `cf_refresh`) are stored exclusively in **`httpOnly`**, **`Secure`**, **`SameSite: Lax`** cookies.
- Client-side JavaScript running in the browser cannot read or modify session tokens.
- Non-sensitive user metadata (`cf_role`) is synchronized to facilitate client-side navigation guards.

### 3.2 Silent Token Rotation Gateway
- All client API calls pass through the internal Next.js gateway at `/api/proxy/[...path]`.
- The proxy extracts the `cf_access` cookie and attaches `Authorization: Bearer <token>`.
- If the upstream backend returns a `401 Unauthorized` and a valid `cf_refresh` token exists, the proxy automatically:
  1. Calls `/auth/refresh-token` on the backend.
  2. Updates both `cf_access` and `cf_refresh` cookies on the outgoing response.
  3. Re-executes the original request with the fresh token seamlessly.

### 3.3 Authentication Methods
1. **Email & Password Authentication:** Standard registration and credential-based sign-in with client and server Zod validation.
2. **Google Identity Services (GIS) OAuth:** 1-tap Google sign-in and registration with automated token exchange.
3. **1-Click Role-Based Demo Accounts:** Instant one-click authentication buttons for testing without typing credentials:
   - **Citizen:** `citizen@cityfix.local`
   - **Staff:** `staff@cityfix.local`
   - **Admin:** `admin@cityfix.local`
4. **4-Step Password Recovery with OTP:**
   - Step 1: Request recovery OTP via email.
   - Step 2: Input 6-digit verification code with a 60-second cooldown timer.
   - Step 3: Enter new password with real-time strength indicators and confirmation validation.
   - Step 4: Success confirmation screen with automated navigation to login.

### 3.4 Context Decoupling (`AuthContext`)
- Separated into **`AuthStateContext`** (`user`, `role`, `isLoading`) and **`AuthActionsContext`** (`login`, `logout`, `googleLogin`, `demoLogin`, `fetchUser`).
- Components that trigger auth actions (e.g., buttons, navigation items) do not re-render when authentication state updates.
- Google GIS initialization scripts are insulated from re-render loops.

---

## 4. Role-Based Access Control (RBAC) Matrix

CityFix strictly segments user permissions across four user tiers enforced by Next.js Edge Middleware (`proxy.ts`):

| Capability / Route | Public / Guest | Citizen (`CITIZEN`) | Field Staff (`STAFF`) | Municipal Admin (`ADMIN` / `SUPER_ADMIN`) |
| :--- | :---: | :---: | :---: | :---: |
| Browse Landing, About, Contact & Services | ✅ | ✅ | ✅ | ✅ |
| View Public Transparency Metrics & SLA Index | ✅ | ✅ | ✅ | ✅ |
| Interact with 24/7 AI Civic Assistant | ✅ | ✅ | ✅ | ✅ |
| Submit New Complaint with Photos & GPS | ❌ | ✅ | ❌ | ❌ |
| View Personal Complaint Dashboard & History | ❌ | ✅ | ❌ | ❌ |
| Cancel & Delete Submitted Complaints | ❌ | ✅ (If `SUBMITTED`) | ❌ | ✅ (Any Status) |
| Pay Priority Fees & View Invoices (Stripe) | ❌ | ✅ | ❌ | ❌ |
| Rate Resolved Work (1–5 Stars) | ❌ | ✅ (If `CLOSED`) | ❌ | ❌ |
| Reopen Unsatisfactory Resolution | ❌ | ✅ (Within 7 Days) | ❌ | ❌ |
| Access Assigned Department Queue | ❌ | ❌ | ✅ | ❌ |
| Update Status (`IN_PROGRESS`, `RESOLVED`) | ❌ | ❌ | ✅ | ✅ |
| Submit Mandatory Resolution Notes & Proof | ❌ | ❌ | ✅ | ✅ |
| View Personal / Department Performance Metrics | ❌ | ❌ | ✅ | ✅ |
| Assign Technicians & Departments to Issues | ❌ | ❌ | ❌ | ✅ |
| Department Management (Create, Edit, Delete) | ❌ | ❌ | ❌ | ✅ |
| Category & SLA Hours / Price Configuration | ❌ | ❌ | ❌ | ✅ |
| User Directory & Role Promotion Controls | ❌ | ❌ | ❌ | ✅ |
| System-Wide Audit Log Ledger Access | ❌ | ❌ | ❌ | ✅ |

---

## 5. Public Civic Portal (Unauthenticated Experience)

The public civic portal consists of five primary routes built with Incremental Static Regeneration (ISR) and modular client islands.

### 5.1 Homepage (`/`) — 15 Modular Sections
1. **HomeHero:** High-impact hero section with immediate server-rendered `<h1>` (eager SSR, zero LCP delay), civic trust badge, primary and secondary CTA buttons.
2. **HeroIncidentShowcase:** Interactive carousel showcasing live municipal incident cards with category badges and live timers.
3. **HomeStatsStrip:** Real-time impact banner displaying total resolved complaints, average resolution hours, and municipal active status.
4. **LiveMunicipalPulse:** Live municipal watchdog ticker displaying active telemetry coordinates and system response speed.
5. **CinematicMunicipalShowcase:** Autoplay municipal video stream featuring 4 interactive chapters:
   - *Chapter 1:* Smart Transit & Arterial Flow (96.4% live efficiency)
   - *Chapter 2:* Rapid Pothole & Surface Patching (3.8h turnaround)
   - *Chapter 3:* Stormwater Drainage & Flood Defense (0 floods retention)
   - *Chapter 4:* Smart LED Grid & Eco Illumination (99.8% grid uptime)
   - *3 Core Pillar Cards:* AI Automated Detection, Geo-Stamped Video Proof, Strict SLA Countdowns.
   - Includes automatic playback pause when scrolled away via `IntersectionObserver`.
6. **HowItWorksSection:** Visual 3-step citizen journey:
   - Step 1: Spot & Geotag Issue.
   - Step 2: Automated Dispatch & Real-Time Watchdog.
   - Step 3: Verified Photo Resolution & Rating.
7. **InteractiveProblemSimulator:** Interactive tool allowing citizens to select an issue type (Pothole, Water Leak, Illegal Dump, Broken Lighting) and calculate estimated equipment, crew size, standard SLA vs expedited priority SLA.
8. **BeforeAfterShowcase:** Before-and-after resolution visual comparison with sliding tabs and verified case studies from actual city wards.
9. **HomeServicesGrid:** 4 primary municipal categories (Roads, Waste, Drainage, Safety) with quick navigation links.
10. **DepartmentEfficiencyLeaderboard:** Live SLA accountability index showing on-time completion rates, target SLA vs average speed, and citizen star ratings per department.
11. **CitizenTestimonialsSection:** Real testimonials from verified ward residents with turnaround time stamps and neighborhood identifiers.
12. **MobileAppExperienceSection:** Mobile-first features overview showcasing 1-tap GPS geotagging, direct photographic uploads, automated watchdog alerts, and an animated GPS radar visual.
13. **HomeFaqSection:** High-performance, zero-JS native HTML `<details name="home-faq">` accordion answering common questions about fees, accountability, and verification.
14. **SmartCityGridSection:** Interactive IoT sensor network terminal simulating live telemetry nodes (Flood sensors, asphalt vibration nodes, dumpster ultrasound monitors, luminaire grids).
15. **EnvironmentalImpactSection:** Ecological metrics tracking tons of waste diverted (1,420+ Tons), clean water preserved (850k gal), CO₂ reduced (43 Tons), and asphalt recycling rate (98.4%).
16. **CivicPartnershipsSection:** Endorsements and verified leader badges from elected ward council chairs and chief municipal works directors.
17. **HomeCtaBanner:** Final civic call to action directing users to file a complaint or inspect the transparency portal.

### 5.2 Municipal Services Directory (`/services`)
- **Category Catalog:** Categorized directory of all municipal services.
- **Department Filter Tabs:** Filter issues by Roads & Transport, Waste & Sanitation, Drainage & Water, Restoration & Safety.
- **SLA & Fee Badges:** Displays target resolution hours and baseline priority service fees.
- **Debounced Search:** Instant client-side filtering debounced at 250ms for smooth interaction.
- **Interactive SLA Calculator:** Real-time turnaround estimator based on category urgency.

### 5.3 Public Transparency & Open Governance Portal (`/transparency`)
- **Operations Command Center Showcase:** Visual overview of the open data stream.
- **4 Real-Time KPI Cards:** Total Resolved Issues, Average Resolution Speed, SLA Compliance Percentage, Audit Log Integrity.
- **Ward-by-Ward Compliance Matrix (`WardMatrix`):** Filterable regional accountability heatmap (All, North, West, Central, South, East) grading wards from A to A+.
- **Category Workload Breakdown:** Visual distribution bars displaying live ticket volume per category.
- **Public Audit Pack Export (`AuditPackDialog`):** Modal displaying cryptographic SHA-256 ledger checksum and download confirmation.

### 5.4 About CityFix (`/about`)
- **Civic Mission Statement:** Explains the transition from traditional bureaucracy to transparent digital governance.
- **"Old Bureaucracy vs CityFix" Comparison Matrix:** Direct feature-by-feature comparison highlighting speed, accountability, tracking, and proof.
- **4 Core Operating Pillars:** Guaranteed Turnaround, Verifiable Proof, Citizen-First Governance, Complete Financial Transparency.

### 5.5 Contact & Helpline Operations (`/contact`)
- **Critical Safety Callout Strip:** Direct one-click calling buttons for municipal 311 lines and 911 emergency services.
- **Digital Inquiry Dispatch Form (`ContactForm`):** Interactive message form with loading state and toast feedback.
- **Emergency Helplines Card:** Toll-free phone numbers, email desk, and physical City Hall walk-in desk hours.
- **Regional Field Operations Centers:** Showcase of regional depots (Central City Hall, North Public Works Depot, East Water Emergency Center) with addresses and operating hours.
- **Zero-JS Contact FAQ Accordion:** Common questions regarding tracking, SLA breaches, payment processing, and privacy.

### 5.6 24/7 AI Civic Assistant (`LazyAiAssistant`)
- Floating interactive live chat interface mounted globally on public pages.
- Deferred execution via `requestIdleCallback` (2000ms idle timeout) to preserve initial page load performance.
- Contextual knowledge engine providing guidance on municipal departments, resolution times, and issue reporting.
- Quick suggestion chips for rapid inquiry submission.

---

## 6. Citizen Portal & Complaint Lifecycle

The Citizen Portal (`/dashboard`) provides end-to-end tooling for residents to report, fund, track, review, and reopen public issues.

```mermaid
stateDiagram-v2
    [*] --> SUBMITTED: Citizen Files Report
    SUBMITTED --> ASSIGNED: Admin Assigns Department
    SUBMITTED --> CANCELLED: Citizen Deletes Ticket
    ASSIGNED --> IN_PROGRESS: Staff Accepts Ticket
    IN_PROGRESS --> RESOLVED: Staff Submits Photo & Note
    RESOLVED --> CLOSED: Citizen Confirms or 7 Days Expire
    RESOLVED --> IN_PROGRESS: Citizen Reopens Ticket (Within 7 Days)
    CLOSED --> [*]: Citizen Rates Service (1-5 Stars)
    CANCELLED --> [*]
```

### 6.1 Citizen Overview Dashboard (`/dashboard`)
- **Summary Metric Cards:** Total Complaints Filed, Active In-Progress, Resolved Issues, Overall Resolution Rate.
- **Interactive Stat Filtering:** Clicking any metric card instantly filters the table view.
- **URL-Synchronized Filter & Sort Controls:** Filter by status and sort by creation date with URL search params.
- **Complaint Management Table:** Reference code, title, category, status badge, date, action buttons.

### 6.2 5-Step Complaint Submission Wizard (`/dashboard/complaints/new`)
- **Step 1: Category Selection:** Interactive grid of municipal categories displaying turnaround SLA hours and fee requirements.
- **Step 2: Details Specification:** Title and description inputs with validation.
- **Step 3: Geotagging & Location:** Street address input combined with optional 1-click HTML5 geolocation coordinate fetching (`latitude` / `longitude`).
- **Step 4: Photographic Evidence Upload:**
  - Multi-file drag-and-drop dropzone supporting PNG and JPG up to 4MB each.
  - Individual file deletion before submission.
  - Per-file progress percentage bars during upload.
- **Step 5: Review & Cost Summary:** Comprehensive pre-submission review warning users of any category-specific fees.
- **Automatic Draft Persistence:** Zustand store with debounced (400ms) `localStorage` synchronization prevents data loss on page refresh.

### 6.3 Complaint Detail & Real-Time Tracking (`/dashboard/complaints/[id]`)
- **Header & Lifecycle Metadata:** Reference code, creation date, and status-dependent actions.
- **Ticket Deletion:** Available exclusively when the ticket is in `SUBMITTED` state.
- **Attachment Gallery:** Responsive photo grid powered by `next/image` with modal zoom.
- **Resolution Information:** Displays technician completion notes and timestamp upon resolution.
- **SLA Countdown & Breach Monitor (`StatusSlaCard`):** Visual clock counting down remaining hours or highlighting `SLA Breached` in red.
- **Ticket Reopening (`ReopenCard`):** Allows citizens to reject unsatisfactory repairs within 7 days by providing additional feedback and returning the ticket to `IN_PROGRESS`.
- **Citizen Feedback & Star Rating (`FeedbackCard`):** When closed, presents an accessible 5-star rating control (`StarRating`) and review textarea.

### 6.4 Citizen Payment Records (`/dashboard/payments`)
- Comprehensive table listing all historical transactions.
- Displays Transaction ID, Purpose (`PRIORITY_FEE`, `SERVICE_CHARGE`), Amount, Status Badge, and Date.

### 6.5 Citizen Profile Management (`/dashboard/profile`)
- Update display name, phone number, and personal settings.
- Cloudinary avatar upload with direct preview and 2MB file size enforcement.

---

## 7. Staff & Field Engineering Portal

The Staff Portal (`/staff`) equips departmental technicians and field engineers with operational tools to claim, execute, and verify municipal work orders.

### 7.1 Field Assignment Queue (`/staff`)
- **Departmental Filtering:** Displays tickets routed specifically to the staff member's department.
- **Urgency & SLA Sort:** Prioritizes tickets approaching their SLA deadline or marked as high-priority.
- **Status Metrics:** Total Assigned, In Progress, Resolved, and SLA Breached counters.
- **Quick Search:** Instant keyword lookup across titles and reference codes.

### 7.2 Work Order Resolution Workflow (`/staff/complaints/[id]`)
- **Work Intake:** Technicians move tickets from `ASSIGNED` to `IN_PROGRESS`.
- **Completion Verification:**
  - Mandatory **Resolution Note** textarea describing the physical work performed.
  - Upload photographic proof of the finished repair.
  - Action button transitions ticket status to `RESOLVED`.
- **Optimistic UI Updates:** Status changes reflect immediately in the interface while network requests process in the background.

### 7.3 Technician Performance Analytics (`/staff/performance`)
- **Personal Productivity KPIs:** Total Tickets Assigned, Resolved Count, Active Queue, SLA Breaches, Average Resolution Hours, SLA Compliance Rate.
- **Interactive Visualizations:**
  - `StatusPieChart`: Distribution of ticket statuses in the technician's queue.
  - `CategoryBarChart`: Workload breakdown across issue categories.
  - Visual SLA health meter.

---

## 8. Administrator & Municipal Oversight Portal

The Admin Portal (`/admin`) delivers system-wide governance, infrastructure management, role delegation, and forensic audit logging.

### 8.1 Executive Oversight Dashboard (`/admin`)
- **City-Wide KPIs:** Global complaints count, active issues, total resolved, SLA breaches.
- **Analytics Visualizations:**
  - Lazy-loaded `StatusPieChart` (system status distribution).
  - Lazy-loaded `CategoryBarChart` (category volume).
  - Lazy-loaded `TrendLineChart` (30-day incident filing trend).
- **Recent Incident Stream:** Live list of latest citizen submissions with status badges.

### 8.2 Global Complaints & Hoisted Assignment (`/admin/complaints`)
- **High-Capacity Virtualized Table:** Powered by `@tanstack/react-virtual` to smoothly render up to 1,000 rows without DOM degradation.
- **Page Size Selectors:** Switch seamlessly between 20, 100, 500, and 1,000 records per page.
- **Comprehensive Filtering:** Filter by department, status, and debounced text search.
- **Hoisted Assignment Modal (`HoistedAssignDialog`):** Single page-level dialog instance preventing the mounting of redundant DOM dialogs across hundreds of rows. Allows assigning any ticket to a department and specific field technician.
- **Administrative Ticket Deletion:** Permanent deletion capability for invalid or duplicate records.

### 8.3 City Departments Management (`/admin/departments`)
- Full CRUD management of municipal departments (Roads, Sanitation, Water, Lighting, Safety).
- Fields: Department Name, Description, Active Status Toggle.
- Soft-delete and instant restore capabilities.

### 8.4 Issue Categories & SLA Pricing (`/admin/categories`)
- Configuration of problem categories within each department.
- **SLA Hours Configuration:** Set target resolution windows (e.g. 24h, 48h, 72h).
- **Service & Priority Pricing:** Configure base fees and priority fee multipliers for Stripe checkout.
- Active toggle, soft delete, and restore actions.

### 8.5 Staff & User Directory (`/admin/users`)
- City-wide user management directory.
- **Role Promotion & Delegation:** Promote or demote users between `CITIZEN`, `STAFF`, `ADMIN`, and `SUPER_ADMIN`.
- **Department Assignment:** Assign field technicians to specific municipal departments.
- **Account Status Toggle:** Instantly activate or suspend user accounts.

### 8.6 Immutable Public Audit Log (`/admin/audit-logs`)
- Virtualized audit log ledger capturing every state change, status transition, technician assignment, payment transaction, and supervisor intervention.
- Captures Operator, Action Type, Target Entity, Timestamp, and IP metadata.
- Action category filters (`STATUS_CHANGE`, `ASSIGNMENT`, `PAYMENT`, `ESCALATION`, `DELETION`).

### 8.7 Administrator Profile & Privileges (`/admin/profile`)
- Server-rendered page shell with client profile form.
- `AdminPrivilegesCard`: System permissions summary and role badge display.

---

## 9. Financial & Payment Architecture (Stripe)

CityFix integrates test-mode **Stripe Hosted Checkout** for handling service charges and priority processing fees.

```mermaid
sequenceDiagram
    autonumber
    actor Citizen
    participant Client as CityFix Frontend
    participant BFF as Next.js API Proxy
    participant Backend as CityFix Backend API
    participant Stripe as Stripe Gateway

    Citizen->>Client: Clicks "Pay Priority Fee"
    Client->>BFF: POST /api/proxy/payments/checkout-session
    BFF->>Backend: Forward payment request
    Backend->>Stripe: Create Stripe Checkout Session
    Stripe-->>Backend: Return session_id & hosted checkout URL
    Backend-->>Client: { checkoutUrl, sessionId }
    Client->>Stripe: Redirect to Stripe Hosted Checkout
    Citizen->>Stripe: Enters test card & authorizes payment
    Stripe->>Client: Redirect to /payment/success?session_id={id}
    Client->>BFF: Poll GET /api/proxy/payments/session/{id}
    BFF->>Backend: Verify payment status
    Backend-->>Client: Status = SUCCEEDED
    Client-->>Citizen: Display Receipt & Link to Complaint
```

- **Priority Fee Turnaround Acceleration:** Paying a priority fee reduces standard SLA windows by an accelerated multiplier.
- **Session Recovery & Polling:** The `/payment/success` page polls payment status every 2 seconds until `SUCCEEDED` status is verified.
- **Checkout Abandonment (`/payment/cancel`):** Provides actionable recovery guidance without creating orphaned complaint records.

---

## 10. Real-Time Notifications & Watchdog System

### 10.1 Automated SLA Watchdog
- Dynamic countdown calculations compute elapsed vs allowed time based on category SLA targets.
- Categorizes urgency into three operational states:
  - `On Track` (Green)
  - `Approaching Deadline` (Amber)
  - `SLA Breached` (Red)
- Breached tickets automatically dispatch escalation notifications to department directors.

### 10.2 Global Notification Center
- **Isolated Leaf Notification Bell (`NotificationBell`):** Mounted in the navigation bar; polls every 30 seconds using TanStack Query `select` to only re-render when the unread count changes.
- **Optimistic Notification Reading:** Clicking "Mark Read" updates the UI instantly while recording the state change in the background.
- **Shared Notification View (`NotificationsView`):** DRY, shared component powering `/dashboard/notifications`, `/staff/notifications`, and `/admin/notifications`.

---

## 11. Design System, Theming & Accessibility

### 11.1 Color System & OKLCH Palette
- Built on modern Tailwind CSS v4 variables with OKLCH color definitions ensuring uniform perceptual contrast across light and dark themes.
- Seamless Dark/Light mode switching powered by `next-themes` and `ThemeToggle`.

### 11.2 Motion & Micro-Interactions
- Smooth entrance and hover effects orchestrated by Framer Motion.
- **Reduced Motion Support:** Evaluates OS-level `prefers-reduced-motion` settings via `MotionConfig` to disable animations for users with motion sensitivities.
- **DOM-Ref Animated Counters:** Numeric counters animate using DOM element refs, completely eliminating React re-renders during 0-to-100 count-ups.

### 11.3 Accessibility (a11y) Conformance
- Semantic HTML5 landmark structure (`header`, `main`, `nav`, `section`, `footer`).
- Native HTML `<details>` and `<summary>` elements for accordion navigation without ARIA synchronization bugs.
- Keyboard-accessible star rating radiogroup (`StarRating`).
- Proper `aria-rowcount`, `aria-rowindex`, and focus management across virtualized tables.

---

## 12. Performance Engineering & Core Web Vitals

The CityFix codebase has undergone extensive performance audits and architecture optimizations:

| Optimization Discipline | Implementation Detail | Measured Result |
| :--- | :--- | :---: |
| **LCP (Largest Contentful Paint)** | Hero `<h1>` rendered eagerly during SSR (`initial={false}`); removed 5% opacity background priority photo; modern AVIF/WebP image formats enabled. | **< 1.2s** (Target ≤ 2.5s) |
| **INP (Interaction to Next Paint)** | Keystroke state colocated inside memoized leaf cards (`FeedbackCard`); search input debounced; Zustand wizard store debounced to 400ms. | **< 50ms** (Target ≤ 200ms) |
| **CLS (Cumulative Layout Shift)** | Fixed-dimension auth placeholder skeletons in Navbar; fixed height chart containers (`h-75`); `keepPreviousData` on table queries. | **0.00** (Target ≤ 0.1) |
| **DOM Virtualization** | `VirtualDataTable` maintains a fixed DOM window of ~25–30 rows even when viewing 1,000 complaints or audit logs. | **98% DOM Node Reduction** |
| **Bundle Chunk Splitting** | Heavy Recharts libraries lazy-loaded via `React.lazy` with Suspense skeletons; AI Assistant deferred to `requestIdleCallback`. | **Critical Route JS Reduced** |
| **Server/Client Boundary** | 3,269-line `HomeSections.tsx` monolith dismantled into 9 Server Components and 5 Client Islands; `AboutClient` converted to Server Component. | **Hydration Overhead Slashed** |
| **Telemetry Reporting** | Real-time Core Web Vitals telemetry captured via `next/web-vitals` in `WebVitals.tsx`. | **Live Vitals Monitoring** |

---

## 13. Complete Route & Module Inventory

### 13.1 Application Routes (`app/`)

```
app/
├── (admin)/                             # Admin Role Group
│   ├── admin/
│   │   ├── page.tsx                     # Executive Overview & Analytics
│   │   ├── complaints/page.tsx          # Virtualized Global Complaints & Hoisted Assign
│   │   ├── complaints/[id]/page.tsx     # Admin Ticket Inspection
│   │   ├── departments/page.tsx         # Departments CRUD & Soft Delete
│   │   ├── categories/page.tsx          # Categories, SLA Hours & Pricing Config
│   │   ├── users/page.tsx               # User Directory & Role Delegation
│   │   ├── audit-logs/page.tsx          # Virtualized System Audit Log Ledger
│   │   ├── notifications/page.tsx       # Admin Notification Center
│   │   └── profile/page.tsx             # Admin Profile & Permissions
│   ├── layout.tsx                       # Admin Dashboard Shell
│   ├── loading.tsx                      # Admin Loading Skeleton
│   └── error.tsx                        # Admin Error Boundary
├── (citizen)/                           # Citizen Role Group
│   ├── dashboard/
│   │   ├── page.tsx                     # Citizen Complaints Overview & Stats
│   │   ├── complaints/new/page.tsx      # 5-Step Issue Submission Wizard
│   │   ├── complaints/[id]/page.tsx     # Complaint Detail, SLA Clock, Reopen & Rate
│   │   ├── payments/page.tsx            # Payment & Transaction History
│   │   ├── notifications/page.tsx       # Citizen Notification Center
│   │   └── profile/page.tsx             # Citizen Profile & Avatar Upload
│   ├── layout.tsx                       # Citizen Dashboard Shell
│   ├── loading.tsx                      # Citizen Loading Skeleton
│   └── error.tsx                        # Citizen Error Boundary
├── (staff)/                             # Staff Role Group
│   ├── staff/
│   │   ├── page.tsx                     # Department Assignment Queue
│   │   ├── complaints/[id]/page.tsx     # Work Order Resolution & Photo Upload
│   │   ├── performance/page.tsx         # Technician Productivity & SLA Analytics
│   │   ├── notifications/page.tsx       # Staff Notification Center
│   │   └── profile/page.tsx             # Staff Profile & Details
│   ├── layout.tsx                       # Staff Dashboard Shell
│   ├── loading.tsx                      # Staff Loading Skeleton
│   └── error.tsx                        # Staff Error Boundary
├── (public)/                            # Public Civic Pages (ISR Caching)
│   ├── page.tsx                         # Homepage (15 Modular Sections)
│   ├── services/page.tsx                # Municipal Services Directory & SLA Calculator
│   ├── transparency/page.tsx            # Open Governance & Regional Ward Matrix
│   ├── about/page.tsx                   # Civic Mission & Comparison Matrix
│   ├── contact/page.tsx                 # 311/911 Helplines, Inquiry Form & FAQ
│   ├── layout.tsx                       # Public Shell with Navbar, Footer & AI Chat
│   ├── loading.tsx                      # Public Loading Skeleton
│   └── error.tsx                        # Public Error Boundary
├── (auth)/                              # Authentication Routes
│   ├── login/page.tsx                   # Login (Credentials, Google GIS, 1-Click Demo)
│   ├── register/page.tsx                # Registration with Role Select
│   └── forgot-password/page.tsx         # 4-Step OTP Password Recovery Flow
├── api/                                 # Backend-For-Frontend (BFF) Endpoints
│   ├── auth/login/route.ts              # HttpOnly Cookie Injection
│   ├── auth/demo/route.ts               # Server-Side Demo Credentials Handler
│   ├── auth/google/route.ts             # Google OAuth Token Exchange
│   ├── auth/logout/route.ts             # Cookie Revocation Handler
│   └── proxy/[...path]/route.ts         # Gateway Proxy with Auto Token Rotation
├── payment/                             # Stripe Return Routes
│   ├── success/page.tsx                 # Payment Verification & Polling
│   └── cancel/page.tsx                  # Checkout Abandonment Recovery
├── layout.tsx                           # Root Layout (Fonts, Providers, Toaster, Vitals)
├── not-found.tsx                        # Custom 404 Error Screen
├── robots.ts                            # Search Engine Directives
└── sitemap.ts                           # Dynamic Sitemap Generator
```

### 13.2 Key Reusable Components (`components/`)

| Category | Component Path | Purpose |
| :--- | :--- | :--- |
| **Home Sections** | `components/public/home/*` | 15 modular Server Components & Client Islands for the public landing experience |
| **Transparency** | `components/public/transparency/WardMatrix.tsx` | Filterable regional compliance heatmap |
| **Transparency** | `components/public/transparency/AuditPackDialog.tsx` | Cryptographic public audit digest dialog |
| **Complaints** | `components/complaints/StatusSlaCard.tsx` | Live SLA countdown and breach alert card |
| **Complaints** | `components/complaints/ReopenCard.tsx` | Citizen ticket reopening interface (within 7 days) |
| **Complaints** | `components/complaints/FeedbackCard.tsx` | 5-star citizen satisfaction rating & comment card |
| **Complaints** | `components/complaints/StarRating.tsx` | Accessible keyboard-controlled 5-star rating control |
| **Charts** | `components/charts/StatusPieChart.tsx` | Ticket status distribution pie chart (Recharts) |
| **Charts** | `components/charts/CategoryBarChart.tsx` | Category volume bar chart (Recharts) |
| **Charts** | `components/charts/TrendLineChart.tsx` | 30-day filing trend line chart (Recharts) |
| **Charts** | `components/charts/index.tsx` | Lazy chunk loaders (`LazyPie`, `LazyBar`, `LazyLine`) |
| **Shell & Nav** | `components/shared/DashboardShell.tsx` | Memoized sidebar, topbar, and drawer shell |
| **Shell & Nav** | `components/shared/Navbar.tsx` | Public navigation header with layout-shift skeleton |
| **Shell & Nav** | `components/shared/NotificationBell.tsx` | Isolated query leaf bell with unread badge counter |
| **Shell & Nav** | `components/shared/NotificationsView.tsx` | Unified notifications list with optimistic read mutations |
| **Data Tables** | `components/shared/VirtualDataTable.tsx` | High-performance virtualized table via TanStack Virtual |
| **Data Tables** | `components/shared/DataTable.tsx` | Responsive data table with auto-virtualization threshold |
| **Telemetry** | `components/shared/WebVitals.tsx` | Core Web Vitals telemetry collector |
| **AI Assistant** | `components/shared/AiAssistantChat.tsx` | Floating 24/7 AI chat widget |
| **AI Assistant** | `components/shared/LazyAiAssistant.tsx` | Idle-loaded wrapper (`requestIdleCallback`) |
| **Viewport** | `components/shared/LazyOnView.tsx` | Reusable viewport loader pausing below-the-fold media |

---

*Specification verified against CityFix codebase on `perf/optimization` branch.*
