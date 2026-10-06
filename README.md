# 🏙️ CityFix — Modern Municipal Issue Reporting & Civic Action Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)

> **CityFix** is a next-generation civic infrastructure web application built with the **Next.js App Router**. It bridges the gap between citizens reporting public municipal issues (potholes, garbage accumulation, waterlogged sumps, hazardous structures) and municipal departments dispatching field technicians under guaranteed **Service Level Agreement (SLA)** countdown timers.

---

## 🚀 Live Links & Project Submission

| Resource | URL |
| :--- | :--- |
| **Project Name** | **CityFix — Municipal Civic Action & SLA Platform** |
| **Live Frontend Application** | [Deployed Vercel URL](https://cityfix-frontend.vercel.app) *(Set by deployer)* |
| **Live Backend API (B7A6)** | [https://cityfix-backend-lime.vercel.app](https://cityfix-backend-lime.vercel.app) |
| **API Documentation (Postman)** | [Postman Collection Documenter](https://documenter.getpostman.com/view/31457961/2sBYAxNoWH) |
| **Frontend Repository** | [https://github.com/rhmunna143/CityFix-frontend](https://github.com/rhmunna143/CityFix-frontend) |
| **Backend Repository** | [https://github.com/rhmunna143/CityFix-backend](https://github.com/rhmunna143/CityFix-backend) |
| **Demo Video Walkthrough** | *(5–10 min link)* |

---

## 🔐 1-Click Role-Based Demo Credentials

The login page implements distinct **1-Click Demo Login buttons** that authenticate instantly using secure server-side credentials:

| Role | Demo Email | Demo Password | Primary Responsibilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@cityfix.local` | `securepassword123` | Department management, category SLA & price config, staff user roles, system-wide audit logs |
| **Staff (Technician)** | `staff@cityfix.local` | `securepassword123` | Department queue, ticket assignment, status progression, resolution notes, photographic proof |
| **Citizen** | `citizen@cityfix.local` | `securepassword123` | GPS-pinpointed issue filing, photo upload, priority Stripe checkout, feedback ratings, ticket reopening |

---

## ✨ Key Features & Domain Complexity

### 1. 👥 3 Distinct Role Workflows
- **Citizen Experience (`/dashboard`)**:
  - Interactive multi-step issue reporter with GPS coordinate picking, department matching, and photo upload.
  - Optional **Stripe Priority Checkout** for expedited turnaround.
  - Live complaint lifecycle tracking (`SUBMITTED` &rarr; `ASSIGNED` &rarr; `IN_PROGRESS` &rarr; `RESOLVED` &rarr; `CLOSED`).
  - Ability to rate resolved services (1–5 stars) or **Reopen** complaints within 7 days if defective conditions persist.
  - Personal profile and notification center.
- **Staff / Field Technician Experience (`/staff`)**:
  - Departmental assignment queue filtered by urgency and SLA target.
  - Actionable status management (`IN_PROGRESS`, `RESOLVED`) with mandatory technician completion notes and proof upload.
  - Personal performance analytics and on-time SLA metrics.
- **Admin / Oversight Experience (`/admin`)**:
  - System-wide metric overview: live incident volume, resolution turnaround averages, SLA breach alerts.
  - **Departments Management**: Full CRUD operations for city departments.
  - **Categories Management**: Configure SLA turnaround hours and baseline priority service fees.
  - **User & Staff Directory**: Role promotions, department assignments, and account status controls.
  - **Audit Logs**: Immutable log of every status transition, payment, and supervisor intervention.

### 2. ⚡ SLA Watchdog & Automated Escalation
- Automated countdown timers calculate remaining resolution windows upon department assignment.
- Visual status badges (`On Track`, `Approaching Deadline`, `SLA Breached`).
- Escalation alerts automatically routed to department directors on deadline breach.

### 3. 💳 Stripe Payment Integration
- Real Stripe test-mode hosted checkout integration for priority complaints and permits.
- Webhook reconciliation with session recovery (`/payment/success?session_id=...` and `/payment/cancel`).

### 4. 🤖 24/7 CityFix Civic AI Assistant
- Interactive floating live chat assistant with smart keyword knowledge matching.
- Immediate guidance on municipal response times, how to report, departmental routing, and ticket tracking.
- Pre-populated quick suggestion chips and typing animation indicators.

### 5. 🌓 Global Dark / Light Mode Theme System
- Built with `next-themes` and Tailwind CSS OKLCH design variables.
- Framer Motion animated Sun/Moon toggle button mounted in both the public Navbar and Dashboard Shell.

### 6. 🎨 Public Civic Portal (11 Rich Sections)
- **Home (`/`)**: Animated hero, live incident verification switcher, animated impact counters, live municipal action radar, before & after resolution showcase, services catalog, department efficiency leaderboard, citizen testimonials, mobile app showcase, and interactive FAQ accordion.
- **Services (`/services`)**: Filterable category catalog with sliding department tabs, SLA badges, and fee indicators.
- **Public Transparency (`/transparency`)**: Open governance dashboard with verified fix counts, speed metrics, and animated category progress bars.
- **About (`/about`)**: Civic mission, "The Old Bureaucracy vs CityFix" comparison, and 4 core platform principles.
- **Contact (`/contact`)**: Interactive inquiry dispatch form, 311 emergency contacts, and expandable FAQ accordion.

---

## 🏛️ Next.js App Router Architecture

```
app/
├── (admin)/                    # Admin Route Group
│   ├── admin/                  # Dashboard, users, departments, categories, audit logs
│   ├── loading.tsx             # Admin skeleton loading state
│   └── error.tsx               # Admin error boundary
├── (citizen)/                  # Citizen Route Group
│   ├── dashboard/              # Citizen overview, complaints, new report wizard, payments, profile
│   ├── loading.tsx             # Citizen skeleton loading state
│   └── error.tsx               # Citizen error boundary
├── (staff)/                    # Staff / Field Technician Route Group
│   ├── staff/                  # Assigned queue, performance analytics, profile
│   ├── loading.tsx             # Staff skeleton loading state
│   └── error.tsx               # Staff error boundary
├── (public)/                   # Public Civic Pages
│   ├── page.tsx                # Homepage (11 dynamic animated sections)
│   ├── services/page.tsx       # Municipal services directory
│   ├── transparency/page.tsx   # Open governance & SLA portal
│   ├── about/page.tsx          # Civic mission & comparison
│   ├── contact/page.tsx        # Contact & 311 citizen helpline
│   ├── layout.tsx              # Public shell with Navbar, Footer, ScrollToTop & AiAssistantChat
│   ├── loading.tsx             # Public skeleton loading state
│   └── error.tsx               # Public error boundary
├── (auth)/                     # Authentication Routes
│   ├── login/page.tsx          # Credentials + Google OAuth + 3 1-Click Demo Buttons
│   ├── register/page.tsx       # Registration with role selection & Google OAuth
│   └── forgot-password/page.tsx# Multi-step password recovery with OTP verification
├── api/                        # Backend-for-Frontend (BFF) Route Handlers
│   ├── auth/login/             # Secure httpOnly cookie injection
│   ├── auth/demo/              # Server-side 1-click demo credentials handler
│   ├── auth/google/            # Google GIS token exchange
│   ├── auth/logout/            # Cookie revocation handler
│   └── proxy/[...path]/        # Authenticated API gateway proxy
├── layout.tsx                  # Root layout with ThemeProvider, QueryClient, and Sonner Toaster
├── loading.tsx                 # Global fallback loading skeleton
├── error.tsx                   # Global error boundary
├── not-found.tsx               # Custom 404 page with return action
├── robots.ts                   # Search engine crawl directives
└── sitemap.ts                  # Dynamic SEO sitemap generator
```

### 🛡️ Backend-For-Frontend (BFF) Security Pattern
- **HttpOnly Cookies**: JWT tokens (`cf_access`, `cf_refresh`) are stored exclusively in secure `httpOnly` cookies, preventing client-side XSS token theft.
- **SSR Authorization**: Server Components read `cf_access` directly to fetch data with zero client roundtrips.
- **Middleware Guard**: `middleware.ts` enforces route boundaries before pages are rendered, redirecting unauthorized roles to their respective dashboards.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 16.3.8 (App Router & Turbopack)
- **UI & Animation**: Tailwind CSS v4, Framer Motion 12.x, Radix UI primitives, Lucide React
- **Data & Caching**: TanStack React Query v5 with optimistic UI updates
- **Forms & Validation**: React Hook Form with Zod schemas matching backend rules
- **Theming**: `next-themes` (Dark & Light modes)
- **Notifications**: Sonner Toasts
- **Payment Processing**: Stripe Checkout

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
API_BASE_URL=https://cityfix-backend-lime.vercel.app/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server-Side 1-Click Demo Login Credentials
DEMO_ADMIN_EMAIL=admin@cityfix.local
DEMO_ADMIN_PASSWORD=securepassword123
DEMO_STAFF_EMAIL=staff@cityfix.local
DEMO_STAFF_PASSWORD=securepassword123
DEMO_CITIZEN_EMAIL=citizen@cityfix.local
DEMO_CITIZEN_PASSWORD=securepassword123

# Google OAuth Client ID (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

## 💻 Local Setup & Development

```bash
# 1. Clone the repository
git clone https://github.com/rhmunna143/CityFix-frontend.git
cd CityFix-frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 🧪 Verification Commands

```bash
# Verify TypeScript strictness (0 errors)
npx tsc --noEmit

# Test production build (All 40 routes compile cleanly)
npm run build
```

---

## 🎥 Video Presentation Script (5–10 Minutes)

Follow this structure during your video walkthrough to maximize grading marks:

1. **Introduction & Design System (≈1 min)**:
   - Introduce CityFix, its municipal mission, and theme toggle (dark/light mode).
   - Point out the top scroll progress bar, 11 homepage sections, and the 24/7 AI Civic Assistant.
2. **Next.js Architecture (≈2 min)**:
   - Demonstrate the Server Component vs Client Component split.
   - Show `loading.tsx` skeleton and route-group `error.tsx` error boundaries in action.
   - Explain the BFF httpOnly cookie session pattern.
3. **Role-Based Access Control Demo (≈2 min)**:
   - Use the **1-Click Demo Citizen** button to enter `/dashboard`, submit a report with photo & GPS, and view the live SLA timer.
   - Log out and use the **1-Click Demo Staff** button to open `/staff`, inspect the assigned ticket, and add completion notes.
   - Log out and use the **1-Click Demo Admin** button to open `/admin`, view system KPIs, manage departments, and inspect audit logs.
4. **Data-Heavy Dashboard & Query Caching (≈1.5 min)**:
   - Open browser DevTools Network tab on `/admin/complaints` or `/transparency`.
   - Show instantaneous client-side TanStack Query cache revalidation.
5. **Form Validation & Error Handling (≈1.5 min)**:
   - Attempt submitting an invalid form to showcase real-time Zod inline error messages.
   - Show toast alerts and optimistic state rollbacks.
6. **Mobile Responsiveness & Stripe Checkout (≈1 min)**:
   - Switch DevTools to Mobile device view (iPhone / Pixel) to demonstrate responsive navigation drawer and fluid card layouts.
   - Show the Stripe test-mode priority checkout redirect.

---

## 📜 License & Acknowledgements

Built for the **B7A7 Fullstack Frontend Assignment**. Powered by Next.js and the CityFix Municipal Backend API.
