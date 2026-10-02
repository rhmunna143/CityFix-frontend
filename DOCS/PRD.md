# CityFix Frontend: Product Requirements Document (PRD)

| | |
|---|---|
| **Project** | CityFix, City Complaint & Service Platform (frontend) |
| **Author** | Rimo, Frontend Engineer |
| **Collaborators** | Backend engineers, Solution Architect |
| **Backend (live)** | `https://cityfix-backend-lime.vercel.app` (`/api/v1/...`) |
| **Hard deadline** | **October 10, 2026, 11:59 PM** (60 marks max, no extensions) |
| **Target internal freeze** | October 9, 2026 (one day of buffer) |
| **Status** | Draft v2 (backend/architect answers incorporated, see §13) |

Sources: `project-requirements.md`, `Key_rules.md`, `timeline-breakdown.md`, `Backend_README.md`, the Postman collection and the Postman environment, plus the backend/architect's written answers. Where sources disagree, the **backend answers (they reflect the code) win**, then Postman, then the README (see §13).

---

## 1. Product Overview

CityFix lets **citizens** report municipal problems (potholes, broken lights, waste, and so on), lets **staff** work those complaints through a strict lifecycle, and gives **admins** control, analytics and an audit trail. Citizens can pay a priority fee through Stripe, which shortens the complaint's SLA deadline.

The frontend must not be a thin CRUD shell. It has to show the domain's complexity: the status state machine, SLA tracking and breaches, payment-driven priority, evidence uploads, assignments, feedback, and audit logs.

### 1.1 Goals
1. Satisfy every **mandatory** item in `Key_rules.md` (App Router architecture, 3-role auth, one-click demo login, Stripe flow, RHF + Zod, TanStack Query, 20+ commits, live URL, video).
2. Ship **18+ real, functional pages** (this PRD plans ~28 so cuts are possible).
3. Hit the marks weights: UI/UX 20, architecture 15, auth 15, API/state 15, forms 10, performance 10, code quality 5, deploy 5, commits 2, video 3.

### 1.2 Non-goals
- No mock data or hardcoded JSON in any core workflow.
- No Cash on Delivery or manual "mark as paid" shortcuts.
- No features the backend doesn't expose. Gaps go to the backend team as requests (§13) instead of being faked.

---

## 2. Roles & Permissions

The assignment requires exactly **3 primary roles**. Backend roles map as follows:

| UI Role | Backend role | Home route | Core abilities |
|---|---|---|---|
| **Citizen** | `CITIZEN` | `/dashboard` | Submit complaints, upload evidence, pay priority fee, track status, reopen, give feedback |
| **Staff** | `STAFF` | `/staff` | View assigned queue, update status, add resolution notes and "after" evidence |
| **Admin** | `ADMIN` (`SUPER_ADMIN` treated as Admin) | `/admin` | Analytics, assign and reassign, manage users, roles, departments, categories, audit logs |

Enforcement happens at **three layers**:
1. **Edge** (`proxy.ts` / `middleware.ts`): coarse route-prefix to role check, redirect to `/login` or the user's own home.
2. **Server layout** (`(citizen)/layout.tsx` etc.): authoritative check via `GET /users/me`, `redirect()` on mismatch.
3. **UI**: `<RoleGate>` and a nav config per role, with action buttons shown by `role × status`.

The backend remains the final authority. The frontend never trusts its own checks.

---

## 3. Tech Stack & Key Decisions

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router), TypeScript strict | Server Components by default |
| UI | Tailwind CSS + shadcn/ui, Lucide icons | One theme, defined as CSS variables |
| Server state | Native `fetch` in Server Components, **TanStack Query** for client interactivity | Hybrid, see §3.2 |
| Client state | Zustand | Sidebar, complaint-wizard draft (persisted) |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) | Schemas mirror backend Zod rules |
| Auth | **Custom JWT via Next Route Handlers (BFF) + httpOnly cookies** | See §3.1 |
| Payments | Stripe Checkout (test mode), hosted redirect | Backend creates the session |
| Charts | Recharts | Admin analytics |
| Toasts | Sonner | All API failures |
| Uploads | Backend `POST /complaints/:id/attachments` (it streams to Cloudinary) | Progress and preview on the client |
| Deploy | Vercel | Env vars + CORS verified in production |

### 3.1 Auth architecture (BFF pattern)
Confirmed by the backend: login returns `data: { user, tokens: { accessToken, refreshToken } }` **and** sets API cookies (`sameSite: none`, secure). The API's `Set-Cookie` lands on our server, not the browser, so we own the session. The API's auth middleware accepts a Bearer header or its cookie, and **the header wins**.

- `POST /api/auth/login` (Next Route Handler) calls the backend, reads `tokens` from the **body**, and sets our own **httpOnly, Secure, SameSite=Lax** cookies on the frontend domain (`cf_access`, `cf_refresh`, plus a non-sensitive `cf_role`). Cookie `maxAge` is derived from each JWT's `exp` claim (backend defaults are 15 min access / 7 d refresh, deployed values still to be confirmed).
- Server Components and Route Handlers read `cf_access` and call the backend with `Authorization: Bearer`.
- Client components call `/api/proxy/[...path]`, one Route Handler that attaches the token, forwards the request, and on **401 → refresh → retry once**. Refresh is `POST /auth/refresh-token` with `{ refreshToken }` in the body. The response is `data: { tokens }` **without a user**, so we keep the existing user and role and only replace tokens. Concurrent refreshes are de-duplicated (single-flight).
- **Expiry at the edge**: Server Components can't set cookies, so `proxy.ts` handles it. Access token expired and refresh cookie present: refresh there, write the new cookies on the response, continue. Refresh fails: clear cookies and redirect to `/login?next=...`.
- `/api/auth/logout` clears our cookies and calls the backend `/auth/logout` best-effort. The backend is stateless, so an old refresh token stays valid until it expires. Clearing our cookies is the real logout.
- **Demo login**: `POST /api/auth/demo` with `{ role }`. Credentials come from **server-side env vars** (`DEMO_ADMIN_EMAIL`, etc.), never from client bundles.
- The BFF forwards the end user's IP (`X-Forwarded-For`) so backend rate limiting can bucket per user (§13.2 #2).
- The browser never calls the backend directly, so **no CORS configuration is needed**.

Proxy caveat: Vercel limits request bodies to about 4.5 MB, so the upload UI enforces a **max 4 MB per image** (client-side compression before upload).

### 3.2 Data fetching strategy (justifiable in the video)
- **List and detail pages**: Server Components read `searchParams` and fetch on the server. The **URL is the single source of truth** for filters, search, sort and pagination. That satisfies the URL-sync rule and gets SSR for free.
- **Client interactivity** (TanStack Query): mutations, optimistic updates (status change, mark-notification-read), notification polling, payment-status polling, and anything needing background refetch.
- After mutations: `router.refresh()` for server-rendered data and `queryClient.invalidateQueries` for client data. Wrap both in one `useMutationWithRefresh` helper (DRY).

---

## 4. Information Architecture

### 4.1 Route map (28 pages)

```
Public (SSR, with generateMetadata)
/                      Home: hero, live public stats, how it works, categories
/about                 About the platform and SLA promise
/services              Departments and categories (from API) with SLA hours
/transparency          Public stats: resolution times, department load (GET /public/stats)
/contact               Contact form wired to `POST /public/contact` (requested, fallback in §13)

Auth
/login                 Credentials form + 3 one-click Demo Login buttons
/register              Citizen registration
/forgot-password       3-step: email, OTP, new password

Citizen  (/dashboard)
/dashboard                       My complaints (status/category filters, sort, pagination via URL)
/dashboard/complaints/new        Multi-step wizard
/dashboard/complaints/[id]       Detail: timeline, evidence, SLA, pay priority, reopen, feedback
/dashboard/payments              Payment history
/dashboard/notifications         Notification list
/dashboard/profile               Profile and avatar upload (password change once backend ships it)

Staff  (/staff)
/staff                           Assigned queue (status/SLA filters applied to the `my-assigned` array, URL-synced)
/staff/complaints/[id]           Work view: status transitions, resolution note, evidence
/staff/performance               Personal stats derived client-side from `my-assigned`; avg resolution time awaits backend
/staff/profile                   Profile and avatar upload

Admin  (/admin)
/admin                           Analytics dashboard (charts and stat cards)
/admin/complaints                All complaints: filters, assign, reassign
/admin/complaints/[id]           Detail with assignment and full history
/admin/users                     Users table, role change, deactivate
/admin/departments               CRUD
/admin/categories                CRUD (SLA hours, base price, department)
/admin/audit-logs                Audit trail (exact-match filters and sort, no date range)

Utility / Payment
/payment/success                 Polls payment status, then links back to the complaint
/payment/cancel                  Retry or return (static page, see §8 Phase 4)
not-found.tsx                    Custom 404
error.tsx, global-error.tsx      Error boundaries (root and per role group)
```

Required minimum is 18. If time runs short, cut in this order: `/staff/performance`, `/admin/complaints/[id]`, `/dashboard/notifications`, `/forgot-password`.

### 4.2 Route groups and layouts
```
app/
  (public)/        layout: Navbar + Footer
  (auth)/          layout: centered card
  (citizen)/dashboard/...   layout: Sidebar + Topbar, role = CITIZEN
  (staff)/staff/...         layout: Sidebar + Topbar, role = STAFF
  (admin)/admin/...         layout: Sidebar + Topbar, role = ADMIN
  api/auth/{login,demo,logout,register}/route.ts
  api/proxy/[...path]/route.ts
  payment/{success,cancel}/page.tsx
```
Every data page gets a sibling `loading.tsx` (skeleton). Each role group gets an `error.tsx`. The three dashboard layouts share one `<DashboardShell navItems={...}>` component.

---

## 5. Backend API Contract (frontend view)

Base: `{API_BASE_URL}/api/v1`. All calls go through one typed `apiClient` (server) and one `useApi` wrapper (client). No raw `fetch` in components.

### 5.0 Envelope & query rules (confirmed by backend)
```ts
interface PageMeta { page: number; limit: number; total: number; totalPages: number }
interface ApiResponse<T> { success: boolean; message: string; data: T; meta?: PageMeta }
```
- `meta` is a **sibling** of `data`, and `data` is a plain array for lists. `apiClient` adapts this into `Paginated<T> = { items: T[]; meta: PageMeta }` in one place.
- Always send an explicit `limit`. Defaults are 10 (20 for notifications, payments, audit logs; 50 for categories) and there is no max cap.
- **Supported**: `page`, `limit`, `sort` (`createdAt` or `-createdAt` only), and exact-match filters on enum/UUID fields (`status`, `categoryId`, `departmentId`, `role`, `type`, ...).
- **Never send**: `from`/`to`, boolean filters (`isPriority`, `isActive`), `searchTerm`, `sortBy`. They currently produce 500s. A single `buildListQuery()` whitelist enforces this, so one fix covers every page.
- **Search**: `GET /complaints/search?q=` is STAFF/ADMIN only, returns a plain array capped at 20, with no pagination. The UI switches into "search mode" (pagination hidden, "showing top 20" note). Citizens get no text search.
- **Categories**: `meta` is missing on a cache hit, so treat the list as complete and never paginate it.
- **Money**: `amount` and `basePrice` arrive as Decimal **strings**. A `toMoney()` helper formats them, with no float math on them.

### 5.1 Endpoints used
| Module | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `/auth/login`, `/auth/refresh-token`, `/auth/logout`, `/auth/forgot-password`, `/auth/verify-otp`, `/auth/reset-password` (`/auth/google` out of scope) |
| Users | `GET /users/me`, **`PUT /users/me`** (not PATCH), `PATCH /users/me/avatar` (multipart `file`). `change-password` **does not exist yet** (§13.2) |
| Departments | `GET` (public), `POST`, `PATCH/DELETE /:id` (admin) |
| Categories | `GET` (public), `POST`, `PATCH/DELETE /:id` (admin) |
| Complaints | `POST/GET /complaints`, `GET/DELETE /complaints/:id`, `PATCH /:id/status`, `POST /:id/reopen`, `GET /search?q=`, `GET /my-assigned`, `POST /:id/assign`, `PATCH /assignments/:id/reassign` |
| Attachments | `POST /complaints/:id/attachments` (`file`, `stage`, `fileType`), `DELETE /attachments/:id` |
| Feedback | `POST /complaints/:id/feedback` (citizen), `GET` (public) |
| Payments | `POST /payments/initiate` returns `{ payment, sessionUrl }`; `GET /payments/:id`; `GET /payments/my-history` |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read` |
| Admin / Public | `GET /admin/dashboard-stats`, `/admin/audit-logs`, `/admin/users`, `PATCH /admin/users/:id/role` (`role`, `departmentId`, `employeeCode`), `PATCH /admin/users/:id/deactivate` (`isActive`), `GET /public/stats` (public) |

Open without auth (public pages render server-side with `revalidate`): `GET /categories`, `/departments`, `/public/stats`, `/complaints/:id/feedback`.

### 5.2 Domain rules the UI must reflect

**Status transitions (single source: `lib/complaint-status.ts`)**

| Transition | Who | Notes |
|---|---|---|
| `SUBMITTED → ASSIGNED` | Admin via Assign dialog | Blocked until a succeeded payment exists for chargeable categories |
| `ASSIGNED → IN_PROGRESS` | Assigned Staff | |
| `IN_PROGRESS → RESOLVED` | Assigned Staff | Requires `resolutionNote` |
| `RESOLVED → CLOSED` | Assigned Staff or Admin | **Citizens cannot close** |
| `RESOLVED → reopen` | Owning citizen | Once only (`reopenCount < 1`), no reason field |
| `CLOSED` | Terminal | Cannot be reopened |

- The UI offers only transitions valid for `role × status`. There is **no staff "reject"** action. Admins use the Assign dialog and don't get raw `ASSIGNED`/`IN_PROGRESS` status controls (the API allows them without an assignment record, which would corrupt history).
- **Citizen on RESOLVED**: show "Resolved, awaiting closure" with a Reopen button (if `reopenCount < 1`). Feedback unlocks only after staff or admin closes. If `POST /complaints/:id/confirm` ships, add a "Confirm resolved" button.
- **Feedback**: `CLOSED` only, citizen only, one per complaint, `GET` is public.
- **SLA**: show a countdown, plus a "Breached" badge from `isSlaBreached` on overdue `ASSIGNED`/`IN_PROGRESS` items.
- **Payments**: `PRIORITY_FEE` is optional and shortens the SLA (applied by webhook). `SERVICE_CHARGE` is mandatory for chargeable categories and gates assignment.
- **Create complaint**: `latitude` and `longitude` are required JSON **numbers**, `address` is required with at least 5 characters. **Never send `isPriority`**, because that must only be set by the priority payment.
- **Role change**: promoting to `STAFF` requires `departmentId` and `employeeCode`.

---

## 6. Shared Building Blocks (DRY inventory)

Build these **once**, in Phase 1 and 2, and reuse everywhere.

**Components** (`components/shared/`): `DataTable` (generic, typed columns), `Pagination` (URL-driven), `SearchInput` (debounced, writes `?q=`), `FilterBar` / `SelectFilter` (writes URL), `StatCard`, `StatusBadge`, `PriorityBadge`, `SlaIndicator`, `StatusTimeline`, `EmptyState`, `PageHeader`, `ConfirmDialog`, `FormField` (RHF + shadcn wrapper), `FileDropzone` (preview + progress), `RoleGate`, `DashboardShell`, `SkeletonTable` / `SkeletonCards` / `SkeletonDetail`.

**Hooks** (`hooks/`): `useDebounce`, `useUrlState` (read/write search params, resets `page` on filter change), `usePagination`, `useAuth` (user and role from context), `useMutationWithRefresh`, `useUploadWithProgress`, `usePolling`.

**Lib** (`lib/`): `api/server.ts`, `api/client.ts`, `auth/session.ts`, `auth/roles.ts` (role to home, role to nav), `complaint-status.ts`, `validators/*.ts` (Zod), `format.ts` (dates, SLA remaining), `constants.ts`.

**Types** (`types/`): one interface per API entity and the `ApiResponse<T>` / `Paginated<T>` envelopes. **No `any`**; enforce via ESLint `no-explicit-any`.

---

## 7. Design System

- **Direction**: civic, trustworthy, calm. Light and dark mode via CSS variables.
- **Palette** (tokens in `globals.css`): primary civic blue, accent teal, plus semantic status colours (`submitted` slate, `assigned` indigo, `in_progress` amber, `resolved` green, `closed` gray, `breached` red). Must meet WCAG AA contrast.
- **Typography**: one sans family via `next/font`, a defined scale (display, h1 to h4, body, caption).
- **Spacing and radius**: Tailwind scale only, one radius token.
- **Responsive**: mobile-first. Sidebar becomes a Sheet drawer below `lg`. Tables collapse to stacked cards below `md`.
- **Images**: `next/image` only, with real assets (no placeholders). Home and About use real, licensed or self-made imagery.
- **A11y**: labelled inputs, focus rings, keyboard-navigable dialogs and menus, `aria-live` for toasts and status.

---

## 8. Phased Delivery Plan

Dates map the 5-day breakdown onto the remaining time, leaving **two buffer days**. Adjust if the start date moves.

### Phase 0: Alignment & Contract Lock (Oct 2–3, ~2 h)
**Status**: mostly done. The backend answered all ten questions (§13).

**Deliverables**
- Send the backend the dependency list in §13.2 with needed-by dates. The critical ones are **seed-demo data by Oct 5** and **payment redirect env values by Oct 6**.
- Fix our local Postman copy using the drift list (§13.3). Hit the live API once each for login, `GET /complaints`, `GET /admin/dashboard-stats` and `POST /payments/initiate` to freeze response shapes.
- Write the TypeScript types, including `ApiResponse`/`Paginated` and Decimal-as-string money fields.

**Exit criteria**: types exist for all entities; every dependency has an owner and a date.

### Phase 1: Setup, Design System & Layout Shells (Oct 3 | Day 1)
**Tasks**
- `create-next-app` (TS, Tailwind, App Router, ESLint), init shadcn/ui, install core components.
- Theme tokens, fonts, dark mode, `Toaster` mounted in the root layout.
- `.env.local` and `.env.example`: `API_BASE_URL`, `NEXT_PUBLIC_APP_URL`, `DEMO_*_EMAIL/PASSWORD`.
- Build `DashboardShell`, `Navbar`, `Footer`, `EmptyState`, `PageHeader`, `StatCard`, skeleton primitives.
- Route groups and empty pages for all roles. Root `not-found.tsx`, `error.tsx`, `global-error.tsx`.
- Public pages **Home / About / Services** skeletons with metadata.

**Exit criteria**: every route renders inside the right layout; theme and responsive shell verified at 375 / 768 / 1280 px.
**Commits (≈4)**: `chore: init next app with tailwind and shadcn`, `feat: add design tokens and theme`, `feat: add dashboard shell and public layout`, `feat: add not-found and error boundaries`.

### Phase 2: Authentication & Route Protection (Oct 4 | Day 2)
**Tasks**
- Route Handlers: `login`, `register`, `demo`, `logout`; `api/proxy/[...path]` with 401-refresh-retry.
- `lib/auth/session.ts` (`getSession()` for server, `AuthProvider` + `useAuth` for client).
- `proxy.ts` / `middleware.ts`: protect `/dashboard`, `/staff`, `/admin` by decoding the `cf_access` role claim, redirect authenticated users away from `/login`, send mismatched roles to their own home, and **silently refresh an expired access token** from the refresh cookie (§3.1).
- Login page per the wireframe in `project-requirements.md`: email and password form, "OR" divider, **three Demo Login cards (Admin, Citizen, Staff)** with loading states, auto-redirect to role home.
- Register and Forgot-password flows (RHF + Zod).
- Role-aware sidebar config and `<RoleGate>`.

**Exit criteria**: all three demo buttons work locally and land on the correct dashboard; direct URL access to another role's route redirects; logout clears the session; an expired access token is silently renewed (test with a short expiry).
**Commits (≈4)**: `feat: add auth route handlers and session cookies`, `feat: add role-based middleware`, `feat: login page with one-click demo login`, `feat: register and password reset flows`.

### Phase 3: Core Data Views & URL State (Oct 5 | Day 3)

**Depends on**: seed-demo data from the backend (§13.2 #1), so lists and the dashboard show real content.

**Tasks**
- Build `DataTable`, `Pagination`, `SearchInput`, `SelectFilter`, `useUrlState`.
- Citizen `/dashboard` (filters: status, category, sort, page, all in URL; no text search for citizens) and `/dashboard/complaints/[id]` (timeline, evidence gallery with `next/image`, SLA indicator).
- Staff `/staff` queue and `/staff/complaints/[id]` with status-transition actions per the §5.2 matrix (optimistic update with rollback and toast on error).
- Admin `/admin/complaints` with assignment and reassignment dialogs (assign is disabled with an explanation while a chargeable complaint is unpaid), and `/admin/users`.
- Skeleton `loading.tsx` and meaningful empty states for every list.
- **Admin analytics `/admin`**: stat cards and Recharts (complaints by status, by department, resolution time trend, SLA breaches) from `GET /admin/dashboard-stats`.

**Exit criteria**: every list is bookmarkable (`?page=2&status=IN_PROGRESS&sort=-createdAt`, with `q` for staff and admin search); skeletons show on slow network; API failure shows a toast and `error.tsx`, never a blank page.
**Commits (≈6)**: `feat: reusable data table and url-synced filters`, `feat: citizen complaint list and detail`, `feat: staff queue with status transitions`, `feat: admin complaint management and assignment`, `feat: admin users table`, `feat: admin analytics charts`.

### Phase 4: Complex Workflows, Payments & Admin CRUD (Oct 6 | Day 4)
**Tasks**
- **Complaint wizard** `/dashboard/complaints/new` (5 steps), with its draft held in a persisted Zustand store:
  1. Category (cards from `GET /categories`, showing SLA hours and base price)
  2. Title and description
  3. Location (browser geolocation with manual coordinate fallback, address of at least 5 characters, reverse-geocoded through a small server route; Zod ranges lat -90..90 and lng -180..180; send numbers)
  4. Evidence images (preview, per-file progress, 4 MB cap)
  5. Review and submit (never send `isPriority`), then attachments, then payment: a **mandatory `SERVICE_CHARGE` checkout for chargeable categories** (assignment is blocked until it succeeds), or an optional `PRIORITY_FEE` CTA otherwise
  Per-step Zod validation; the final submit does `POST /complaints` then attachments sequentially.
- **Stripe flow**
  - Pay buttons call `POST /payments/initiate` (`PRIORITY_FEE` or `SERVICE_CHARGE`). Save `payment.id` in `sessionStorage`, then redirect to `sessionUrl` (the key is `sessionUrl`, not `url`).
  - `/payment/success` reads the saved payment id and polls `GET /payments/:id` (TanStack `refetchInterval`) until it leaves `PENDING`. The webhook is the source of truth and can lag a few seconds. Stop after about 30 s with a friendly "still processing, check payment history" state. If the id is missing (new tab), show that same state. When `GET /payments/by-session/:sessionId` ships, switch to the `session_id` query param.
  - `/payment/cancel` is **static**: clear message, retry button, back link. The backend only handles `checkout.session.completed`, so cancelled or expired sessions stay `PENDING` and there is nothing to poll.
  - The backend env must be set to `.../payment/success?session_id={CHECKOUT_SESSION_ID}` and `.../payment/cancel` (the default cancel path is `/payment/failed`, §13.2 #2).
  - Unpaid chargeable complaint: citizen detail shows a "Payment required" banner with a Pay button.
  - `/dashboard/payments` history table (amounts formatted from Decimal strings).
- Feedback form (1–5 stars + comment) on `CLOSED` complaints only; Reopen action on `RESOLVED` complaints when `reopenCount < 1` (no reason field).
- Admin CRUD: departments, categories (with Zod and confirm-delete), role change dialog (department + employee code when promoting to Staff), deactivate user, audit-logs table with filters.
- Notifications page with optimistic mark-as-read, and a topbar bell with unread count (polling).
- Profile pages: edit details (`PUT /users/me`) and avatar upload. Password change is deferred until the backend adds the route.

**Exit criteria**: full happy path works end to end with the Stripe test card `4242 4242 4242 4242`; cancel path works; wizard survives a refresh mid-flow; all forms show human-readable, real-time validation.
**Commits (≈6)**: `feat: multi-step complaint wizard`, `feat: image upload with progress`, `feat: stripe priority payment flow`, `feat: payment success/cancel pages`, `feat: admin departments and categories crud`, `feat: notifications and profile settings`.

### Phase 5: Polish, Optimisation & Public Pages (Oct 7 | Day 5)
**Tasks**
- Finish public pages with real API data: Home (live stats), Services (departments and categories), Transparency, About, Contact. Add `generateMetadata` (title, description, Open Graph) to every public page.
- Performance: audit bundle (`next build` output, analyzer), dynamic-import Recharts and heavy dialogs, `next/image` sizing and `priority` on LCP images, remove unnecessary `"use client"`, and fix hydration warnings.
- A11y pass (keyboard, labels, contrast), dark-mode pass, and responsive QA at 375 / 768 / 1280.
- ESLint, `tsc --noEmit`, and a search for stray `any`, `console.log`, and TODOs.

**Exit criteria**: Lighthouse ≥ 90 performance and ≥ 95 accessibility on Home and one dashboard page; zero TS and ESLint errors.
**Commits (≈3)**: `feat: public pages with live data and metadata`, `perf: code-split charts and optimise images`, `chore: a11y and responsive fixes`.

### Phase 6: Deployment, Verification & Submission (Oct 8–9, buffer Oct 10)
**Tasks**
- Deploy to Vercel. Set env vars (including `DEMO_*`). Confirm the backend `PAYMENT_SUCCESS_URL` / `PAYMENT_FAILED_URL` point at the live frontend (`/payment/success?session_id={CHECKOUT_SESSION_ID}` and `/payment/cancel`). CORS is not needed (BFF), but verify the BFF isn't throttled by the shared-IP rate limiter.
- **Production checks**: all three demo logins, one full payment (test mode), upload, role redirects, 404 and error pages.
- Review git log for 20+ conventional commits (squash or reword messy ones).
- Record the 5–10 min video (§10), write the frontend `README.md`, and prepare the submission block.

**Exit criteria**: submission block complete and tested from an incognito window by someone else.

---

## 9. Cross-Cutting Requirements

| Area | Requirement |
|---|---|
| **Error handling** | API errors normalised into one `ApiError` type, toast via Sonner, `error.tsx` per route group, no blank screens |
| **Loading** | `loading.tsx` skeleton for every data-fetching page, no full-page spinners |
| **Empty states** | Every list and table has an icon, message, and next-step CTA |
| **Forms** | RHF + Zod everywhere, with server validation errors mapped back onto fields via `setError` |
| **Security** | httpOnly cookies, no tokens in JS-readable storage, demo credentials only in server env, no secrets in `NEXT_PUBLIC_*` |
| **SEO** | Metadata API on all public pages, `robots.txt`, `sitemap.ts` |
| **Typing** | `strict: true`, no `any`, API types shared between server and client |
| **Optimistic UI** | Status updates, mark-as-read, and (optional) feedback submit, with rollback on error |

---

## 10. Submission & Video Checklist

**Submission block** (exact format from `Key_rules.md`): Project Name, Backend Repo, Frontend Repo, Live Backend URL (`https://cityfix-backend-lime.vercel.app`), Live Frontend URL, API Documentation (Postman link), Demo Video, Demo Admin Email / Password (`admin@cityfix.local`, using the dedicated demo account, never a personal password).

**Video script (5–10 min)**
1. Overview and design system (≈1 min)
2. Architecture: show a Server Component page vs a Client Component, `layout.tsx`, and `loading.tsx` in action (≈2 min)
3. Demo-login as **Citizen**, then logout, then **Admin**, showing nav and route changes (≈2 min)
4. Data-heavy page: skeleton, populated table, URL filters, Network tab (≈1.5 min)
5. Invalid form submission (Zod errors) and a forced API error (toast / `error.tsx`) (≈1.5 min)
6. Responsive demo via DevTools (≈1 min), then the Stripe test payment if time allows

---

## 11. Acceptance Checklist (mapped to marks)

- [ ] **UI/UX (20)**: consistent theme, mobile-first, a11y basics, dark mode
- [ ] **Architecture (15)**: server-first, justified `"use client"`, layouts, `loading.tsx`, `error.tsx` in every group
- [ ] **Auth (15)**: BFF cookies, middleware plus server-layout guard, role-based UI, 3 demo buttons
- [ ] **API/State (15)**: typed client, URL-driven lists, TanStack Query for mutations, optimistic updates, Zustand for wizard and sidebar
- [ ] **Forms (10)**: RHF + Zod everywhere, 5-step wizard, upload with progress and preview
- [ ] **Performance (10)**: `next/image`, dynamic imports, URL state, Lighthouse targets
- [ ] **Code quality (5)**: DRY shared components and hooks, no `any`
- [ ] **Deployment (5)**: live URL, env vars set, CORS verified
- [ ] **Commits (2)**: 20+ conventional commits (this plan targets about 23)
- [ ] **Video (3)**: follows §10

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **No demo data** (seed creates no complaints, assignments or extra staff) | Empty dashboards, can't verify Phase 3 or record the video | Backend `seed-demo` by Oct 5 (§13.2 #1). Fallback: create data by hand through the UI and Stripe test checkouts |
| **Shared-IP rate limiting** (global 100/15 min, auth 10/15 min, all BFF traffic from one IP) | Demo logins or the video could get throttled | Forward `X-Forwarded-For`; backend enables `trust proxy` or exempts the BFF (§13.2 #2) |
| Unsupported query params return 500 | Broken lists | `buildListQuery()` whitelist; no date, boolean or `searchTerm` filters |
| 15-minute access tokens | Random logouts mid-demo | Refresh in `proxy.ts` and the proxy route, tested with short expiry |
| Webhook delay; cancelled sessions stay `PENDING` | Confusing payment UX | Poll with timeout on success, static cancel page |
| Citizens can't close complaints | Feedback is unreachable in the demo | Seed one closed complaint with feedback; ask for `POST /complaints/:id/confirm` |
| Vercel 4.5 MB body limit on proxied uploads | Upload failures | 4 MB cap with client-side compression |
| Scope too large for 8 days | Missed deadline | Cut-list in §4.1; Phases 1–4 are the must-haves |

---

## 13. Backend Answers, Dependencies & Doc Drift

### 13.1 Answers received and what changed
| # | Topic | Answer | Frontend impact |
|---|---|---|---|
| 1 | Tokens | Body `{ user, tokens }` plus API cookies; Bearer wins; lifetimes default 15 min / 7 d (deployed values unconfirmed) | BFF uses body tokens and Bearer, owns its cookies, `maxAge` from JWT `exp` (§3.1) |
| 2 | Refresh | Cookie or body `{ refreshToken }`; returns `{ tokens }` without user; logout doesn't revoke | Refresh in `proxy.ts` and proxy route; keep user; honest logout (§3.1) |
| 3 | Lists | Envelope with sibling `meta`; `page`, `limit`, `sort`, exact filters; others 500; search is staff/admin, cap 20 | `buildListQuery` whitelist, search mode (§5.0) |
| 4 | Payments | `{ payment, sessionUrl }`; env-driven redirects (default cancel `/payment/failed`); no by-session lookup; only `completed` webhook; Decimal strings; `SERVICE_CHARGE` gates assignment | Phase 4 payment flow, static cancel page |
| 5 | Close / reopen | Assigned staff or admin close; citizens can't; reopen once on `RESOLVED`, no reason | Transition matrix (§5.2), "awaiting closure" state |
| 6 | Staff performance | No endpoint | Client-side counts behind one adapter `getStaffPerformance()`, swap when the endpoint ships |
| 7 | Contact | No endpoint; backend offered `POST /public/contact` | **Our preference: build it.** A real API keeps us within the no-placeholder rule. Fallback if not shipped by Oct 7: a content page with a real department directory |
| 8 | Location | Required numbers, `address` ≥ 5 chars, no geocoding; don't send `isPriority` | Wizard step 3, client-side validation |
| 9 | Public reads / rate limit | Four open endpoints; per-IP limits, no `trust proxy` | `revalidate` on public pages; forward client IP |
| 10 | Seed | 2 departments, 2 categories (none for Sanitation), 3 users; nothing else | Dependency #1 below. Category picker must handle a department with no categories |

### 13.2 What we need from backend
| # | Ask | Needed by | Blocking? |
|---|---|---|---|
| 1 | `seed-demo`: categories for every department, a second Roads staff member, about 12 complaints in every status (created via real transitions), some assigned to `staff@cityfix.local`, one SLA-breached, one reopened, one closed with feedback. No seeded payments | Oct 5 | **Yes** (Phase 3, video) |
| 2 | Set `PAYMENT_SUCCESS_URL` to `.../payment/success?session_id={CHECKOUT_SESSION_ID}` and `PAYMENT_FAILED_URL` to `.../payment/cancel`; enable `trust proxy` or exempt the BFF from rate limits | Oct 6 | **Yes** (Phase 4, demo reliability) |
| 3 | Confirm deployed `JWT_ACCESS_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` | Oct 3 | No |
| 4 | List of enum values: complaint status, payment status, payment purpose, audit log `type`, notification `type` | Oct 3 | Needed for filter dropdowns and types |
| 5 | `GET /payments/by-session/:sessionId` (owner-checked). Yes, we accept the recommendation | Oct 6 | No (sessionStorage fallback) |
| 6 | `POST /complaints/:id/confirm` for citizens. Yes | Oct 7 | No |
| 7 | `POST /public/contact` (`name`, `email`, `subject`, `message`). Yes | Oct 7 | No (content-page fallback) |
| 8 | `PATCH /users/change-password`, or confirm it's dropped | Oct 7 | No (form hidden) |
| 9 | `GET /staff/performance` | After MVP | No |
| 10 | Fix the query builder (clean 400s, boolean filters), range-check lat/lng, strip `isPriority` on create | Oct 5 | No (we whitelist and don't send it) |

### 13.3 Doc drift (code is the truth)
- Profile update is `PUT /users/me`. `PATCH /users/change-password` doesn't exist. Payment history is `/payments/my-history`. Assign is `POST /complaints/:id/assign`. Feedback is `POST /complaints/:id/feedback`. The README's `/assignments`, `/feedback` and `/payments/history` are outdated.
- The password-reset flow is three flat endpoints: `/auth/forgot-password`, `/auth/verify-otp`, `/auth/reset-password`.
- The seed runs manually via `npm run db:seed`, not on first boot.
- The backend's own PRD says refresh tokens are hashed, rotated and revoked. That is not built.
- `project-requirements.md` says "Minimum 15 Pages" in its heading but "18+" in the body. We target 18+.

---

## 14. Companion Documents (next)
- `fix.md`: defect log (template: ID, page, steps, expected vs actual, severity, status).
- `new-feature.md`: post-MVP additions (Google OAuth, map picker, realtime notifications, i18n for Bengali).
