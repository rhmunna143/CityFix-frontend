# 🎬 CityFix — Video Explanation Walkthrough Script

> **Target Duration:** 7–9 Minutes (Fits within the mandatory 5–10 minute requirement)  
> **Recommended Tool:** Loom (Direct shareable link) or OBS Studio (Upload to Google Drive with public "Viewer" link)  
> **Target Audience:** Evaluators, hiring reviewers, and technical assessors  
> **Language:** English (with Bengali presenter reference notes included for each section)

---

## ⏱️ Video Timeline & Agenda Overview

| Segment | Topic | Estimated Time | Key Focus Points |
| :---: | :--- | :---: | :--- |
| **01** | **Project Overview & UI/UX Philosophy** | `0:00 – 1:15` | Problem statement, civic domain complexity, design system, theme system, AI assistant |
| **02** | **Next.js App Router Architecture** | `1:15 – 2:30` | Server vs. Client Components, route groups, `layout.tsx`, `loading.tsx`, `error.tsx`, BFF proxy |
| **03** | **Authentication & Role-Based UI (3 Roles)** | `2:30 – 4:15` | 1-Click Demo Logins, Citizen flow (`/dashboard`), Admin flow (`/admin`), Staff queue (`/staff`) |
| **04** | **API Integration, State & Caching** | `4:15 – 5:30` | TanStack Query v5, Network tab inspection, URL search params sync, loading skeletons |
| **05** | **Form Validation & Error Handling** | `5:30 – 6:45` | React Hook Form + Zod, schema errors, toast feedback (Sonner), Stripe priority checkout |
| **06** | **Responsive Design & Modern Shell** | `6:45 – 7:45` | Collapsible sidebar (`lg`/`md`), Mobile hamburger drawer (`< md`), device mode check |
| **07** | **Conclusion & Production Verification** | `7:45 – 8:15` | Live Vercel deployment, zero TypeScript errors, 20+ commit history, closing |

---

## 🛠️ Pre-Recording Setup Checklist

Before pressing record, make sure your environment is prepared:

- [ ] **Tab 1:** Live production frontend (or `http://localhost:3000`) open on the Homepage (`/`).
- [ ] **Tab 2:** `/login` page ready with the **1-Click Demo Login** buttons clearly visible.
- [ ] **Tab 3:** Chrome DevTools open, docked to the right or bottom (ready on the **Network** tab with "Fetch/XHR" filter selected).
- [ ] **Tab 4:** VS Code open displaying `app/` folder tree, highlighting Server Components and Client Components.
- [ ] **Demo Accounts Seeded:** Ensure sample complaints exist across Citizen, Staff, and Admin roles.
- [ ] **Microphone & Resolution:** Record at 1080p, test microphone volume, turn off notifications.

---

## 🎙️ Section-by-Section Recording Script

---

### Part 1: Project Overview & UI/UX Philosophy (0:00 – 1:15)

#### 🖥️ On-Screen Action:
1. Start recording on the **CityFix Homepage (`/`)**.
2. Scroll smoothly through the Hero section, live incident stats, "How It Works" guide, and before-and-after slider.
3. Toggle the **Theme Switcher** (Light &rarr; Dark &rarr; Light) in the top navigation bar.
4. Briefly click the floating **CityFix Civic AI Assistant** button to show the chat modal with suggestion chips.

#### 🗣️ Spoken Script (English):
> *"Hello everyone! Welcome to the technical walkthrough of **CityFix**, a modern civic engagement and municipal issue resolution platform built with the Next.js App Router.*
>
> *Unlike typical e-commerce or basic CRUD projects, CityFix tackles the real-world operational complexity of city management. It bridges the gap between citizens reporting critical municipal hazards—such as potholes, waterlogging, or hazardous structures—and city departments resolving them under strict Service Level Agreement (SLA) countdown targets.*
>
> *Our UI/UX philosophy is clean, accessible, and mobile-first. We built the platform using Tailwind CSS v4, shadcn/ui components, OKLCH color variables, and fluid Framer Motion micro-interactions. The site includes a full dark/light theme system and an interactive 24/7 Civic AI Assistant to guide citizens on municipal rules and emergency contacts."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *শুরুতেই প্রজেক্টের নাম CityFix উল্লেখ করে বলুন এটি একটি Next.js App Router ভিত্তিক civic issue reporting প্ল্যাটফর্ম। সাধারণ CRUD এর বদলে এটি রিয়েল-লাইফ মিউনিসিপ্যাল কমপ্লেইন্ট লাইফসাইকেল এবং SLA ট্র্যাকিং সমাধান করে। স্ক্রিনে হোমপেজের ডিজাইন, ডার্ক/লাইট থিম এবং AI অ্যাসিস্ট্যান্ট উইজেট দেখান।*

---

### Part 2: Next.js App Router Architecture (1:15 – 2:30)

#### 🖥️ On-Screen Action:
1. Switch to VS Code and show the `app/` directory layout:
   - Point out route groups: `(public)`, `(auth)`, `(citizen)`, `(staff)`, `(admin)`.
   - Show `layout.tsx`, sibling `loading.tsx` skeletons, and `error.tsx` error boundaries.
2. Open a **Server Component** (e.g., `app/(public)/services/page.tsx` or `app/(public)/page.tsx`) to show `generateMetadata` and direct server data fetching.
3. Open a **Client Component** (e.g., `components/shared/DashboardShell.tsx` or `components/shared/AiAssistantChat.tsx`) and highlight `"use client"`.
4. Briefly mention the BFF (Backend-for-Frontend) Route Handler in `app/api/proxy/[...path]/route.ts`.

#### 🗣️ Spoken Script (English):
> *"Now let's examine our **Next.js App Router architecture**. We adhere strictly to the Server Component default philosophy to optimize performance, SEO, and initial page load.*
>
> *As you can see in our codebase, public pages like `/services` and our homepage are **Server Components**. They pre-render on the server, utilize `generateMetadata` for dynamic OpenGraph SEO, and deliver zero unnecessary JavaScript to the client.*
>
> *We deliberately isolate `"use client"` directives only to components that genuinely require browser APIs or state interactivity—such as our interactive Recharts visualizations, TanStack Query mutations, form wizards, and our collapsible `DashboardShell`.*
>
> *Notice our route organization using Next.js Route Groups: `(public)`, `(auth)`, `(citizen)`, `(staff)`, and `(admin)`. Every single dashboard group features its own dedicated `layout.tsx`, route-level `loading.tsx` skeleton fallback, and `error.tsx` error boundary.*
>
> *For secure session handling, we use a **Backend-For-Frontend (BFF)** pattern. Our Next.js Route Handlers manage HTTP-only, SameSite cookies (`cf_access` and `cf_refresh`), completely protecting JWT tokens from client-side XSS attacks, while our proxy handler automatically handles token refresh on 401 responses."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *VS Code-এ `app/` ফোল্ডারের Route Groups দেখান। বুঝিয়ে বলুন কেন পাবলিক পেজগুলো Server Component (ফাস্ট লোডিং ও SEO) এবং কেন ফর্ম ও ড্যাশবোর্ড Client Component (`"use client"`)। `loading.tsx` ও `error.tsx` এর ব্যবহার এবং সিকিউর HTTP-only কুকি ভিত্তিক BFF আর্কিটেকচার উল্লেখ করুন।*

---

### Part 3: Authentication & Role-Based UI (3 Distinct Roles) (2:30 – 4:15)

#### 🖥️ On-Screen Action:
1. Navigate to `/login`.
2. Scroll to the **"Or one-click demo login"** section showing the three buttons:
   - **Demo Citizen**
   - **Demo Staff**
   - **Demo Admin**
3. Click **"Demo Citizen"**:
   - The app authenticates and redirects to `/dashboard`.
   - Point out Citizen navigation items: *Dashboard, New Complaint, Payments, Notifications, Profile*.
   - Point out the Citizen Portal badge in the sidebar and the new complaint button.
4. Click **Logout**, return to `/login`.
5. Click **"Demo Admin"**:
   - The app redirects to `/admin`.
   - Demonstrate how the entire navigation and permission set dynamically change: *Analytics, Complaints, Users, Departments, Categories, Audit Logs, Profile*.
   - Show the Admin Analytics view with Recharts graphs and Department CRUD table.
6. (Optional 10-second mention): Log in as **Demo Staff** to show `/staff` assigned queue and SLA indicators.

#### 🗣️ Spoken Script (English):
> *"A core mandatory requirement is support for **three distinct user roles with One-Click Demo Login**. Let's demonstrate this in action.*
>
> *On our login page, we provide immediate one-click demo login buttons for all three roles: Citizen, Staff, and Admin. When I click **Demo Citizen**, the server verifies demo credentials and securely establishes the session.*
>
> *Here on the **Citizen Dashboard** (`/dashboard`), the UI renders only citizen-authorized capabilities: reporting complaints, tracking real-time status transitions, viewing Stripe payment history, and submitting feedback.*
>
> *Now let's log out and click **Demo Admin**. Notice how the entire interface instantly and securely transforms.*
>
> *The sidebar now displays the **Admin Console** layout, unlocking administrative controls: comprehensive system analytics with interactive Recharts graphs, full Department CRUD, Category SLA and pricing controls, User role management, and immutable system-wide Audit Logs.*
>
> *Role-based authorization is enforced at three layers: in our Next.js middleware, in our server layouts via `/users/me` verification, and in our UI components using conditional role-gating."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *লগইন পেজে গিয়ে ১-ক্লিক ডেমো লগইন বোতামগুলো দেখান। প্রথমে Citizen হিসেবে লগইন করে দেখান যে সে শুধু নিজের কমপ্লেইন্ট ও পেমেন্ট দেখতে পায়। এরপর Logout করে Admin হিসেবে লগইন করুন এবং দেখান কীভাবে সাইডবার, চার্ট, ইউজার ম্যানেজমেন্ট ও অডিট লগ ডাইনামিকালি পরিবর্তিত হয়ে অ্যাডমিন পাওয়ার দেয়।*

---

### Part 4: API Integration, State Management & Caching (4:15 – 5:30)

#### 🖥️ On-Screen Action:
1. Stay on a data-heavy page (e.g., `/admin/complaints` or Citizen `/dashboard`).
2. Open Chrome DevTools to the **Network** tab (filter by `Fetch/XHR`).
3. Refresh the page to show:
   - The UI displays custom **Loading Skeletons** (`loading.tsx` / `Skeletons.tsx`) instead of jarring blank screens.
   - The initial API call retrieves paginated complaints.
4. Interact with the filters:
   - Change Status filter to `IN_PROGRESS` or `RESOLVED`.
   - Change Department or Category.
   - Show that the URL changes dynamically (e.g., `?status=IN_PROGRESS&page=1`) via `useSearchParams` synchronization.
5. Click between two pages and return to show **TanStack Query caching**:
   - The cached data renders instantly without unnecessary redundant network refetches.

#### 🗣️ Spoken Script (English):
> *"Next, let's explore our **API integration, state management, and caching strategy**.*
>
> *Watch what happens when we load this data-heavy complaints table: our tailored Skeleton loader renders immediately, providing a smooth perceived performance before the data populates.*
>
> *Notice our filtering and pagination controls. Every search query, status filter, and page change is strictly synchronized with the browser's URL search parameters using Next.js `useSearchParams`. This means any filtered view can be bookmarked, refreshed, or shared directly.*
>
> *Under the hood, we leverage **TanStack Query v5** for client-side state management. In the DevTools Network tab, you can see that when we navigate between tabs or return to previously visited views, our stale-time caching prevents duplicate network requests, keeping bandwidth low and UI responses instantaneous.*
>
> *Furthermore, when actions occur—like updating a ticket status or creating a category—we execute optimistic UI updates and trigger query invalidation alongside `router.refresh()`, ensuring both client state and server-rendered data remain 100% in sync."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *DevTools Network tab খুলে ডাটা ফেচিং দেখান। পেজ রিলোড দিয়ে Skeleton লোডার দেখান। ফিল্টার ও পেজিনেশন পরিবর্তন করে ব্রাউজারের URL সার্চ প্যারামস (`?status=...`) সিঙ্ক হওয়া প্রমাণ করুন। TanStack Query-এর ক্যাশিংয়ের কারণে কীভাবে দ্বিতীয়বার ব্যাক করলে ইনস্ট্যান্ট ডেটা আসে তা দেখান।*

---

### Part 5: Form Handling, Validation (Zod) & Error Handling (5:30 – 6:45)

#### 🖥️ On-Screen Action:
1. Log back in as **Citizen** and navigate to `/dashboard/complaints/new` (Complaint Filing Wizard).
2. Intentionally leave required fields blank or type an invalid description (< 10 characters) and click **"Next" / "Submit"**.
   - Show the immediate inline **Zod validation error messages** (e.g., *"Title must be at least 5 characters"*, *"Please select a valid department"*).
3. Fill in valid data, proceed through the steps, and highlight:
   - GPS address picker / coordinates input.
   - Evidence photo upload preview.
   - The **Priority Stripe Fee** option.
4. Show graceful error feedback:
   - Mention the Sonner toast notification system for network alerts.
   - Point out how `error.tsx` provides a user-friendly fallback with a *"Try Again"* button instead of breaking the entire app.

#### 🗣️ Spoken Script (English):
> *"Now let's examine our **Form Handling, Zod Validation, and Error Handling**.*
>
> *We handle complex workflows using **React Hook Form with Zod schema validation resolvers**. Here in our multi-step Complaint Wizard (`/dashboard/complaints/new`), if I attempt to proceed with empty or malformed input, Zod immediately triggers clean, user-friendly inline error alerts before any network request is dispatched.*
>
> *The form supports department selection, category matching with automatic SLA duration display, GPS location input, and image attachments with client-side preview.*
>
> *In step 3, citizens have the option to upgrade to **Priority Processing** powered by our real **Stripe (Test Mode)** checkout integration. This seamlessly creates a Stripe session, redirects the citizen to Stripe's hosted checkout, and handles success and cancellation webhooks.*
>
> *For error handling, all API exceptions trigger descriptive **Sonner toast notifications**, while catastrophic layout failures are caught gracefully by our Next.js `error.tsx` boundaries, allowing users to retry the operation without reloading the application."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *Citizen ড্যাশবোর্ডে গিয়ে নতুন কমপ্লেইন্ট ফর্মে যান। ভুল বা খালি ইনপুট দিয়ে সাবমিট বাটনে চাপ দিন এবং Zod ভ্যালিডেশন এরর মেসেজগুলো দেখান। মাল্টি-স্টেপ উইজার্ড, ফটো আপলোড ও Stripe টেস্ট পেমেন্ট অপশনটি তুলে ধরুন। Sonner টোস্ট মেসেজ ও `error.tsx` বাউন্ডারির মাধ্যমে গ্রেসফুল হ্যান্ডলিং ব্যাখ্যা করুন।*

---

### Part 6: Responsive Design & Modern Adaptive Shell (6:45 – 7:45)

#### 🖥️ On-Screen Action:
1. Switch to the Dashboard view on a desktop window width (`>= 1024px`).
2. Show the desktop sidebar:
   - Click the **Collapse Sidebar** button (`ChevronLeft` / `PanelLeftClose`).
   - Show the sidebar smoothly transition to a compact `w-[72px]` icon rail with hover tooltips and centered icons.
   - Click the **Expand Sidebar** button (`PanelLeftOpen`) or the header toggle button to expand it back to `w-64`.
3. Open DevTools **Device Mode** (or resize window to mobile screen width: ~375px–390px, e.g. iPhone 14/15 Pro):
   - Show that the desktop sidebar disappears cleanly.
   - Show the **Hamburger Menu button (`Menu` icon)** in the top header.
   - Tap the hamburger button: the mobile drawer slides out from the left with dark backdrop overlay.
   - Show the navigation items, active link highlight, theme toggle, user card, and close button (`X`).
   - Click a link or tap outside to show it smoothly closes with scroll-locking restored.

#### 🗣️ Spoken Script (English):
> *"Next, let's demonstrate our **responsive design and modern layout shell**.*
>
> *In our `DashboardShell` component, we've designed an adaptive layout tailored for all device breakpoints across all three role dashboards.*
>
> *On desktop (`lg`) and tablet (`md`) screens, the left sidebar is fully **expandable and collapsible**. With a single click of our toggle button—either inside the sidebar or from the top header—the sidebar smoothly transitions into a sleek 72-pixel compact icon rail with interactive hover tooltips, maximizing workspace for complex data tables and analytics charts.*
>
> *When we switch to mobile viewport (under 768 pixels), the desktop sidebar hides completely, and an accessible **Hamburger Menu** appears in the sticky header.*
>
> *Tapping the hamburger button opens an accessible slide-over navigation drawer with a backdrop overlay, role badge, theme toggle, and touch-friendly navigation links. It automatically locks background scrolling and closes smoothly upon link selection, backdrop tap, or pressing the Escape key."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *ডেস্কটপ ভিউতে সাইডবারের এক্সপ্যান্ড/কোল্যাপ্স বোতামে ক্লিক করে দেখান কীভাবে মসৃণ ট্রানজিশনে ৭২ পিক্সেল আইকন-রেলে রূপান্তরিত হয়। এরপর ব্রাউজার রিসাইজ করে বা মোবাইল ডিভাইসে টগল করে দেখান কীভাবে ডেক্সটপ সাইডবার বদলে গিয়ে হেডারে হ্যামবার্গার মেনু চলে আসে এবং সুন্দর ড্রয়ার ওপেন/ক্লোজ হয়।*

---

### Part 7: Conclusion & Production Verification (7:45 – 8:15)

#### 🖥️ On-Screen Action:
1. Switch back to full desktop browser view.
2. Open the terminal or project repo/deployment tab:
   - Show that the project is deployed live on **Vercel**.
   - Show terminal output proving **zero TypeScript errors (`tsc --noEmit`)** and a clean production build (`next build`).
   - Mention the repository commit history with **20+ conventional commits**.
3. Finish on the CityFix homepage or dashboard.

#### 🗣️ Spoken Script (English):
> *"In summary, CityFix represents a complete, production-ready frontend architecture:*
> - *A strict Server-and-Client component split in the Next.js App Router;*
> - *Three distinct role workflows with instant One-Click Demo Logins;*
> - *Robust TanStack Query data caching with synchronized URL parameters;*
> - *Complex React Hook Form + Zod validation with Stripe test checkout;*
> - *A fully responsive, collapsible sidebar and mobile drawer navigation;*
> - *And a live deployment on Vercel backed by our B7A6 backend, with 0 TypeScript errors and over 20 structured Git commits.*
>
> *Thank you very much for watching! All repository and live deployment links are provided in the submission details."*

#### 🇧🇩 বাংলা নির্দেশিকা (Bengali Speaking Notes):
> *পরিশেষে প্রজেক্টের লাইভ Vercel ডিপ্লয়মেন্ট লিঙ্ক, ০ টিএস এরর এবং ২০টির বেশি অর্থপূর্ণ Git কমিটের কথা উল্লেখ করে ধন্যবাদ জানিয়ে ভিডিও শেষ করুন।*

---

## 📋 Quick Submission Form Template

Keep this format ready to paste into your assignment submission portal alongside your recorded video link:

```text
Project Name            : CityFix — Municipal Civic Action & SLA Platform
Backend Repo            : https://github.com/rhmunna143/CityFix-backend
Frontend Repo           : https://github.com/rhmunna143/CityFix-frontend
Live Backend URL        : https://cityfix-backend-lime.vercel.app
Live Frontend URL       : https://cityfix-nine.vercel.app
API Documentation       : https://documenter.getpostman.com/view/31457961/2sBYAxNoWH
Demo Video              : [PASTE YOUR LOOM OR GOOGLE DRIVE VIDEO LINK HERE]
Demo Admin Email        : admin@cityfix.local
Demo Admin Password     : securepassword123
```

---

## 💡 Top Tips for a Perfect 100% Score

1. **Keep DevTools Open During API Explanation:** Showing the **Network tab** (XHR requests + cached responses) is the fastest way to prove to examiners that your data fetching and caching are genuinely implemented rather than faked.
2. **Do Not Rush the Demo Login:** Clearly click each 1-click button (Citizen & Admin) and let the dashboard fully render so evaluators see the distinct role UI.
3. **Show Mobile Responsiveness Live:** Examiners place a high 20% weight on UI/UX & Responsiveness—live resizing or toggling device mode proves your mobile-first build instantly.
4. **Speak Confidently:** Follow the timed script sections above to comfortably complete the video within the 7–8 minute sweet spot!
