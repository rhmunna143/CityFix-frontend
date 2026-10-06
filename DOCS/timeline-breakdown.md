## 📅 Timeline: 5-Day Work Breakdown

> ⏱️ **Recommended Workload:** 5–8 hours per day. Consistency is key to building a polished UI, avoiding last-minute bugs, and maintaining a clean, meaningful Git history.  
> 💡 **Pro Tip:** Commit your code at the end of *every* day with descriptive messages to naturally hit the 20+ meaningful commits requirement.

---

### 🟢 Day 1 — Planning, Setup & Design System
- [x] Review your B7A6 Backend API Documentation (Postman/Swagger) and map out UI/UX user flows for all **3 distinct roles** (Citizen, Staff, Admin/Super Admin).
- [x] Initialize Next.js (App Router) + TypeScript + Tailwind CSS project (`next@16`, `react@19`).
- [x] Set up your UI component library (`shadcn/ui`, `@base-ui/react`, Sonner, Lucide) and define global theme, typography, and color palette.
- [x] Create base layouts (`layout.tsx`), responsive sidebars/navbars, and foundational routing structure (`(auth)`, `(citizen)`, `(staff)`, `(admin)`).
- [x] Configure environment variables (`.env.local`) for backend API base URLs, demo credentials, Google OAuth, and app URLs.

### 🔵 Day 2 — Authentication & Protected Routes
- [x] Implement Login, Register, and Logout UI flows.
- [x] Set up authentication state management (Custom JWT via HTTP-only cookies `cf_access`, `cf_refresh`, `cf_role` + BFF proxy automatic token refresh).
- [x] Create Next.js route protection, role gating (`RoleGate.tsx`), and role-based redirects.
- [x] **Mandatory:** Implement the **One-Click Demo Login** buttons on the login page for all 3 roles (Citizen, Staff, Admin).
- [x] Build the foundational wireframe/skeleton dashboards for all 3 roles to establish the layout.
- [x] **Enhanced Feature:** Implemented **Google OAuth Login & Registration** using Google Identity Services (GIS) and backend ID token verification.
- [x] **Enhanced Feature:** Full 3-step **Forgot Password flow** with email OTP verification and password reset.
- [x] **Enhanced Feature:** Back buttons on auth pages (Login, Register, Forgot Password) redirecting directly to `/` (home).

### 🟡 Day 3 — Core Features, API Integration & Dashboards
- [x] Integrate TanStack Query (`@tanstack/react-query`) for efficient data retrieval, caching, and cache invalidation.
- [x] Build core CRUD UI views:
  - Citizen: complaint submission, complaint listing, complaint details, delete own complaint.
  - Staff: departmental assigned complaints, status transition (In Progress, Resolved, Closed), resolution notes.
  - Admin: all complaints, staff assignment with department filtering, categories CRUD (All/Active/Trash tabs), departments CRUD, user role management with department selection, delete complaints, and system audit logs.
- [x] Implement **Pagination, Filtering, and Search** with strict URL state synchronization (`useSearchParams`).
- [x] Add loading skeletons (`Skeletons.tsx`), empty states (`EmptyState.tsx`), and toast notifications (`sonner`) for all data views.
- [x] Implement **Data Visualizations** (Recharts) for:
  - Admin dashboard: complaint status distribution, departmental breakdown, monthly trends, and performance KPIs.
  - Staff dashboard: assigned complaint stats, resolution progress, and SLA performance.
  - Citizen dashboard: total reported, resolved count, in-progress complaints, and priority fee summaries.

### 🟠 Day 4 — Complex Workflows, Payments & Optimization
- [x] Implement complex forms using **React Hook Form + Zod** (multi-step complaint filing wizard, address geolocation, Cloudinary attachment and avatar uploads).
- [x] Add **Optimistic UI updates** and query cache invalidations for instant feedback actions (status updates, category toggles, profile editing).
- [x] Implement global client state (AuthContext / React Query / URL state synchronization) for UI states and session persistence.
- [x] **Mandatory:** Integrate frontend flow for **Stripe (Test Mode)**, including priority fee checkout, `/dashboard/payments`, and proper success/cancel redirect handling (`/dashboard/payments/success`, `/dashboard/payments/cancel`).
- [x] Profile management implemented for all 3 roles:
  - `/dashboard/profile` (Citizen)
  - `/staff/profile` (Staff)
  - `/admin/profile` (Admin with role permissions and system privilege overview)
  - Top navigation bar profile links with avatar.
- [x] Optimize performance: audit bundle size, package optimizations (`optimizePackageImports: ["lucide-react"]`), zero-overhead inline SVG icons, and clean React 19 hydration.

### 🔴 Day 5 — Public Pages, Polish & Optimization (Phase 5)
- [x] **Public Pages with Live API Data & Rich UI**:
  - **Home (`/`)**: High-impact hero, live statistics strip (`GET /public/stats`), 3-step interactive "How it Works" guide, core services overview, trust badges, and CTA banner.
  - **Services (`/services`)**: Interactive directory with department filter tabs, search filter, category cards with SLA turnaround badges, and service fee badges.
  - **Transparency (`/transparency`)**: Open governance dashboard with key resolution KPIs, category load progress bars, and civic accountability pillars.
  - **About (`/about`)**: Civic mission, "The Old Bureaucracy vs CityFix" comparison, and 4 core platform principles.
  - **Contact (`/contact`)**: Interactive citizen inquiry form, 311 municipal emergency hotlines, city hall walk-in desk information, and citizen FAQ accordion.
- [x] **SEO & Social Metadata**:
  - Custom `Metadata` (`title`, `description`, `openGraph`) configured on every public page.
  - Next.js dynamic `app/robots.ts` and `app/sitemap.ts` configured for search engine crawling.
- [x] **Theme System & Framer Motion Animations**:
  - Global dark and light mode theme toggle system using `next-themes` and Framer Motion micro-interactions.
  - Integrated `ThemeToggle` component across public `Navbar` (desktop & mobile) and `DashboardShell` (citizen, staff, admin headers).
  - Framer Motion animation suite (`FadeIn`, `StaggerContainer`, `StaggerItem`, `HoverLiftCard`, `AnimatedCounter`, `FloatingBadge`, `ScrollProgressBar`, `AnimatePresence`).
  - Interactive incident switcher in Hero, animated department tab pill indicator, animated category progress bars, and animated FAQ accordion.
- [x] **AI Civic Assistant & Floating Action Controls**:
  - **CityFix Civic AI Assistant (`AiAssistantChat`)**: Interactive live chat modal with 24/7 municipal guidance, question suggestions, smart responses for road/water/waste/SLA queries, action links, and typing animations.
  - **Go To Top Floating Button (`ScrollToTop`)**: Scroll-triggered floating button with smooth scroll-to-top behavior and Framer Motion spring elevation.
  - **Top Scroll Progress Bar (`ScrollProgressBar`)**: Viewport progress bar attached to window scroll.
- [x] **Expanded Home Page (11 Dynamic Sections)**:
  - Hero with interactive case switcher, stats strip with animated counters, live city action radar, 3-phase workflow guide, interactive before & after resolution slider, municipal services catalog, department SLA accountability leaderboard, verified citizen testimonials, mobile app smart features, homepage interactive FAQ accordion, and radiant CTA banner.
- [x] **Navigation & Layout Polish**:
  - `Navbar`: Responsive mobile navigation drawer, brand identity badge, dark/light theme switch, and auth-state awareness (links to citizen/staff/admin dashboard when authenticated).
  - `Footer`: Multi-column layout with civic directories, emergency contacts, and live operational status indicator.
  - Direct `/` back button redirects on Login and Register pages.
- [x] **Performance & Optimization**:
  - Configured `optimizePackageImports: ["lucide-react", "recharts", "date-fns"]` in `next.config.ts`.
  - Replaced external icon chunk factories with self-contained SVG components on auth pages to eliminate HMR factory issues.
  - Zero TypeScript errors (`tsc --noEmit`).
  - Production build passing (`next build` compiled all 40 static & dynamic routes in 13.6s with zero errors).

---

### 📊 Current Progress Summary
- **Day 1 (Planning & Setup):** 100% Completed ✅
- **Day 2 (Auth & Protected Routes):** 100% Completed ✅ *(+ Google OAuth & OTP Password Reset)*
- **Day 3 (Core Features & Dashboards):** 100% Completed ✅ *(+ Multi-role analytics)*
- **Day 4 (Workflows, Payments & Profiles):** 100% Completed ✅ *(+ Admin profile & Stripe)*
- **Day 5 (Public Pages, Polish & SEO):** 100% Completed ✅ *(+ All 5 public pages, robots, sitemap & full build pass)*
- **Next Step (Phase 6):** Deployment to Vercel, live production verification, commit review (20+ commits), and video recording.
