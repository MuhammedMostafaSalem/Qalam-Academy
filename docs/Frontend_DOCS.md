# Qalam Academy — Frontend Reverse-Engineering & Technical Documentation

> **Project Type:** Frontend Application (Next.js App Router SPA/SSR hybrid)
> **Document Version:** 1.0
> **Analysis Date:** 2026-08-13
> **Scope:** `frontend/` directory only. Backend API is referenced as the data contract it consumes.

---

# 1. EXECUTIVE SUMMARY

## Project Name
**Qalam Academy** (`frontend`) — an Arabic-first, RTL educational e-commerce platform.

## Purpose
Qalam Academy is a full-featured online education marketplace. It delivers three experiences under one roof:
1. **Public marketing website** — course catalog, services, portfolio, blog, store, about, and contact pages.
2. **Student portal** — enrolled courses, video lessons with progress tracking, certificates, downloads, orders, payment history, and wishlist.
3. **Admin/instructor dashboard** — full CRUD management of courses, lessons, categories, users, students, products, orders, coupons, services, portfolio projects, team, partners, blog posts, contact messages, and global platform settings.

## Business Problem
The platform consolidates what would otherwise be three separate systems (marketing site, LMS, and admin CMS) into a single codebase with one authentication system. It solves:
- Selling educational content (courses and digital products) online in the Egyptian/Arabic market (prices shown in `ج.م` — Egyptian Pounds).
- Delivering video lessons to enrolled students with per-lesson completion tracking.
- Letting admins/instructors manage all platform content without touching code.
- Accepting payments via Paymob and PayPal, plus cash-on-delivery style orders.

## Target Users
| Role | Description |
| ---- | ----------- |
| **Guest / Visitor** | Browses public pages (courses, services, portfolio, blog, store). |
| **Student** | Registers, verifies email via OTP, purchases courses/products, watches lessons, tracks progress. |
| **Instructor** | Manages their courses and lessons through the admin dashboard. |
| **Admin** | Full platform control: users, content, orders, settings. |

## Main Capabilities
- Multi-area routing: `(website)`, `(user)`, `(dashboard)`, `(auth)` route groups.
- Role-based access control via `ProtectedRoute` and `AuthProvider`.
- Server-side (cookie-based) authentication with HttpOnly `Qalam_Token`.
- Multilingual content model (Arabic + English fields per entity, e.g. `title.ar`/`title.en`).
- Bilingual form handling, Arabic-first UI (`dir="rtl"`, Cairo font).
- Dark, glass-morphism design system with Tailwind CSS + CSS custom properties.
- Scroll animations via AOS (Animate On Scroll).
- Redux Toolkit for UI state (toast, delete-modal, category modal).
- Data-fetching abstraction: Server Actions → `authApi()` service → Express backend.

## High-Level Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                      │
│  React 19 components + Tailwind + AOS + Redux (UI state)     │
└───────────────────────────┬──────────────────────────────────┘
                            │ Next.js App Router
┌───────────────────────────▼──────────────────────────────────┐
│                    NEXT.JS SERVER (Node)                     │
│  Route Groups: (website) (user) (dashboard) (auth)           │
│  Server Actions (actions/*)  +  authApi service (services/)  │
│  HttpOnly cookie: Qalam_Token  (cookies() from next/headers) │
└───────────────────────────┬──────────────────────────────────┘
                            │ fetch() — /api/*  (Accept-Language: ar)
┌───────────────────────────▼──────────────────────────────────┐
│                  BACKEND API (Express)                       │
│  http://localhost:5000/api  — auth, courses, lessons, etc.   │
└──────────────────────────────────────────────────────────────┘
```

---

# 2. PROJECT OVERVIEW

## System Description
Qalam Academy is built with Next.js 16 (App Router) on React 19. The public site is a combination of server components (rendered by Next.js on the server, fetching data through Server Actions) and client components (interactive: forms, toolbars, menus, video players). Admin and student areas are fully client-rendered dashboards protected by role guards.

The backend is a separate Express.js application exposing a REST API at `NEXT_PUBLIC_BASE_URL/api` (default `http://localhost:5000/api`). All frontend data access goes through **Server Actions** (`frontend/actions/*.js`, each marked `"use server"`). These actions use a shared `authApi()` wrapper (`frontend/services/authService.js`) that:
- Reads the `Qalam_Token` HttpOnly cookie via `cookies()`.
- Forwards it to the backend as a `Cookie` header.
- Sets `Accept-Language: ar` by default.
- Handles `401` by deleting the cookie and flagging `authExpired`.

## Core Concepts
| Concept | Explanation |
| ------- | ----------- |
| **Route Group** | Next.js App Router folder group `(name)` — affects layout hierarchy, not URL. |
| **Server Action** | `"use server"` async function called from client forms via `useActionState`. |
| **Bilingual fields** | Backend stores localized fields as objects `{ ar, en }`; multipart form keys use dot/bracket notation (`title.ar` / `title[ar]`). |
| **Session** | JWT stored in an HttpOnly cookie named `Qalam_Token`; expiry driven by `sessionExpiresAt`. |
| **ProtectedRoute** | Client component wrapper that redirects based on `user.role`. |
| **Toast** | Global notification rendered from Redux `toast` slice, auto-hides after 3 s. |
| **Meta/pagination** | Backend responses include `data` (list or object) + `meta` (`hasMore`, etc.). |

## User Roles
1. **admin** — full dashboard access (`/dashboard`).
2. **instructor** — dashboard access for course/lesson management (`/dashboard`).
3. **student** — student portal access (`/user`).
4. **guest** — public site only.

Role redirection map (used in `useLoginForm.js`, `ProtectedRoute.jsx`, `UserMenu.jsx`):
```js
{ admin: "/dashboard", instructor: "/dashboard", student: "/user" }
```

---

# 3. TECHNOLOGY STACK

| Layer          | Technology                       | Purpose |
| -------------- | -------------------------------- | ------- |
| Framework      | Next.js 16.2.9 (App Router)      | SSR/SSG + client routing + Server Actions |
| UI Library     | React 19.2.4                     | Component model |
| Language       | JavaScript (JSX), no TypeScript  | Implementation |
| Styling        | Tailwind CSS 3.4.19 + PostCSS 8  | Utility-first styling |
| Fonts          | `next/font/google` (Cairo, Inter)| Arabic + Latin typography |
| State (global) | Redux Toolkit 2.12 + react-redux 9.3 | UI state only (toast, modals) |
| Server state   | Custom hooks + Server Actions     | Data fetching/cache/revalidation |
| Forms          | react-hook-form 7.80, zod 4, @hookform/resolvers (declared but *not used* in current pages) | Form validation |
| Data fetching  | Native `fetch` (Server Actions)   | API calls |
| HTTP client    | axios 1.19 (declared; legacy `handleApiError` only) | Legacy utility |
| Animations     | AOS 2.3.4, `aos/dist/aos.css`     | Scroll reveal animations |
| Sliders        | Swiper 14, embla-carousel-react 8.6 | Carousels |
| Charts         | recharts 3.9.2                    | Admin dashboard charts |
| Counters       | react-countup 6.5                 | Animated stat counters |
| Icons          | react-icons 5.6                   | Icon set |
| Lottie         | lottie-react 2.4                  | Lottie animations (declared) |
| Cookies        | js-cookie 3.0.8 (declared; auth uses HttpOnly cookie instead) | Legacy |
| Backend        | Express.js (external, `backend/`) | REST API consumed |
| Auth (frontend)| HttpOnly cookie + Server Actions  | Session management |

### Why these choices
- **Server Actions + Server Components** keep the public site fast (no client data-fetch waterfall) and keep the auth token server-side (never exposed to JS).
- **Tailwind + CSS variables** give a consistent dark theme via tokens in `styles/globals.css` (`--color-*`).
- **Route Groups** enforce layout boundaries and let each experience (website/user/dashboard) have its own chrome.
- **Redux Toolkit** is intentionally minimal — only cross-cutting UI state, avoiding global state bloat for server data.
- **No TypeScript**: the whole codebase is plain JSX with `jsconfig.json` path alias `@/* → ./*`.

---

# 4. PROJECT STRUCTURE

```text
frontend/
├── .env                      # NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_NODE_ENV
├── .gitignore
├── jsconfig.json             # @/* path alias
├── next.config.mjs           # serverActions body limit 100mb, images localhost:5000
├── package.json / package-lock.json
├── postcss.config.js         # tailwindcss + autoprefixer
├── tailwind.config.js        # design tokens mapped to CSS variables
├── README.md                 # default create-next-app README (stale)
│
├── app/                      # App Router pages + layouts
│   ├── layout.js             # Root layout: fonts, providers, Toast, dir=rtl
│   ├── favicon.ico
│   ├── (website)/            # Public marketing pages
│   ├── (user)/               # Student portal
│   ├── (dashboard)/          # Admin/instructor dashboard
│   └── (auth)/               # login, register, verify-otp, forgot/reset password
│
├── actions/                  # "use server" Server Actions (the API gateway layer)
│   ├── authActions.js        # signup, login, OTP, logout, me
│   ├── courseActions.js / lessonActions.js / categoryActions.js
│   ├── cartActions.js / orderActions.js / couponActions.js
│   ├── enrollmentActions.js / progressActions.js / reviewActions.js / wishlistActions.js
│   ├── userActions.js / dashboardActions.js
│   ├── blogActions.js / serviceActions.js / portfolioActions.js / partnerActions.js / teamActions.js
│   ├── productActions.js / settingsActions.js / contactActions.js
│   └── ... (each resource module)
│
├── components/               # All React components (organized by feature)
│   ├── auth/                 # AuthCard, AuthInput, ProtectedRoute, login/register/otp/reset forms
│   ├── layout/               # website Header/Footer, dashboard & user sidebars, auth layouts
│   ├── shared/               # Sidebar, UserMenu, tables, dropdowns, badges
│   ├── ui/                   # Button, Input, Select, Textarea, Table, Toast, modals, cards
│   ├── sections/             # SectionTitle, SectionHeader, etc.
│   ├── home/  courses/  courseDetails/  lesson/  services/  portfolio/  blog/  about/  contact/  store/  project/
│   ├── dashboard/            # Tables, toolbars, headers, forms, charts, widgets for admin
│   └── user/                 # Student dashboard widgets (courses, orders, wishlist, ...)
│
├── constants/                # routes, navigation, colors, typography, testimonials, projects, whyChoose
├── data/                     # empty placeholder folder
├── hooks/                    # Custom data/UI hooks per resource
│   ├── auth/  cart/  courses/  category/  coupons/  dashboard/  users/  ...
│   └── useToast.js, useScrollNavbar.js
│
├── lib/                      # Animation helpers (AOS presets) + lib/animation/* presets
├── animations/               # animationHelper wrappers (fadeUp, fadeLeft, fadeRight, zoom)
├── providers/                # AuthProvider (context: user, loading, logout, refreshUser)
├── services/                 # authService.js — authApi() fetch wrapper
├── store/                    # Redux store + slices (toast, modalDelete, category)
├── styles/                   # globals.css — tokens, gradient/glass utilities, keyframes
├── public/                   # static assets (images, logos)
└── node_modules/
```

### Folder responsibilities
| Folder | Purpose | Key files |
| ------ | ------- | --------- |
| `app/` | Routing, layouts, page composition | `app/layout.js`, `app/(dashboard)/layout.js` |
| `actions/` | Single source of truth for backend calls; all marked `"use server"` | `authActions.js`, `courseActions.js` |
| `services/` | Low-level HTTP wrapper that injects the auth cookie & language header | `authService.js` |
| `hooks/` | Data-hook layer used by client components (fetch + loading/error/meta state) | `useCourses.js`, `useGetCategories.js` |
| `components/` | Presentational + container components, feature-organized | `components/ui/*`, `components/dashboard/*` |
| `store/` | Redux Toolkit store for cross-cutting UI state | `slices/toastSlice.js` |
| `providers/` | React context providers | `AuthProvider.jsx` |
| `constants/` | Static site content & nav config | `navigation.js`, `routes.js` |
| `lib/` + `animations/` | AOS animation config & reusable presets | `lib/aos.js`, `lib/animationHelpers.js` |
| `styles/` | Global CSS: design tokens, gradients, glass effects, keyframes | `globals.css` |

---

# 5. ARCHITECTURE ANALYSIS

## Architecture Pattern
**Hybrid: Feature-first component architecture + thin Server-Action service layer.**

- **Server Components** (pages under `(website)` like `/courses/[slug]`) call Server Actions directly and render HTML on the server.
- **Client Components** (`"use client"`) handle interactivity and call the same Server Actions (which always run server-side).
- **Layering per feature:** `page.js` → feature components → `hooks/*` (client state) → `actions/*` (server) → `authApi` (HTTP) → Backend.

## Layer diagram

```text
Pages (app/**)
   │
   ├── Server Component pages ──► actions/*  ──► authApi()  ──► Backend API
   │
   └── Client pages (dashboards)
         │
         └── hooks/* (useCourses, useOrders, ...)
               │
               └── actions/* ──► authApi() ──► Backend API
```

## Domain structure
| Domain | Server Actions | Hooks | Key components |
| ------ | -------------- | ----- | -------------- |
| Auth | `authActions.js` | `hooks/auth/*` | `AuthProvider`, `ProtectedRoute`, `AuthCard` |
| Courses | `courseActions.js` | `useCourses` | `CoursesTable`, `CreateCourseForm` |
| Lessons | `lessonActions.js` | — | `LessonLayout`, `VideoPlayer` |
| Categories | `categoryActions.js` | `useGetCategories` etc. | `CategoriesTable`, category modals |
| Cart/Orders/Coupons | `cartActions.js`, `orderActions.js`, `couponActions.js` | `useCart`, `useOrders`, `useCoupons` | Orders tables |
| Enrollments/Progress | `enrollmentActions.js`, `progressActions.js` | `useMyCourses`, `useEnrollments` | `MyCoursesGrid`, `ProgressCard` |
| Reviews/Wishlist | `reviewActions.js`, `wishlistActions.js` | `useWishlist` | `ReviewsSection`, `WishlistGrid` |
| Users/Students | `userActions.js` | `useAdminUsers`, `useStudents` | `UsersTable`, `StudentsTable` |
| CMS content | `blogActions.js`, `serviceActions.js`, `portfolioActions.js`, `partnerActions.js`, `teamActions.js`, `productActions.js` | one hook per resource | Admin tables + modals |
| Settings/Contact | `settingsActions.js`, `contactActions.js` | `useSettings` | `SettingsForm`, `MessagesTable` |
| Dashboards | `dashboardActions.js` | `useAdminDashboard`, `useStudentDashboard` | `ChartsSection`, `StatsCards` |

---

# 6. REQUEST LIFECYCLE

## Example: Student lists their enrolled courses

```text
User clicks "كورساتي" in student sidebar
   │
   ▼
app/(user)/user/my-courses/page.js   (client component)
   │
   ▼
components/user/dashboard/courses/MyCoursesGrid.jsx
   │  uses hook
   ▼
hooks/enrollments/useMyCourses.js    (state: courses, loading, error, meta)
   │  calls
   ▼
actions/enrollmentActions.js  →  getMyCoursesAction()    ("use server")
   │
   ▼
services/authService.js  →  authApi("/enrollments/my-courses?<query>", { method: "GET" })
   │   • reads Qalam_Token cookie
   │   • sets Cookie + Accept-Language: ar headers
   │   • fetch(API_URL + endpoint, { cache: "no-store" })
   ▼
Express backend → JSON { success, data: [...], meta: {...} }
   │
   ▼
Hook stores data → Grid renders course cards
```

## Example: Admin creates a course (multipart upload)

```text
app/(dashboard)/dashboard/courses/new/page.js
   │
   ▼
components/dashboard/course-management/CreateCourseForm.jsx
   │  <form action={formAction}> with useActionState(createCourseAction, ...)
   ▼
actions/courseActions.js → createCourseAction(prevState, formData)
   │   builds FormData with keys: title.ar, title.en, category, instructor, level,
   │   price, discountPrice, duration, requirements, objectives, tags, thumbnail(file), trailerVideo(file)
   │   authApi("/courses", { method: "POST", body })  → multipart
   │   revalidatePath("/dashboard/courses"); revalidatePath("/courses")
   ▼
response → form state { success, course, message, errors }
   │
   ▼
useEffect → successMessage(toast) → router.replace(`/dashboard/courses/${course._id}`)
```

## Files involved (for the above flows)
- `app/(user)/user/my-courses/page.js`
- `components/user/dashboard/courses/MyCoursesGrid.jsx`
- `hooks/enrollments/useMyCourses.js`
- `actions/enrollmentActions.js`
- `services/authService.js`
- `components/dashboard/course-management/CreateCourseForm.jsx`
- `actions/courseActions.js`

---

# 7. FEATURE INVENTORY

### Feature: Authentication & Account Management
- **Purpose:** Register, verify email, log in, recover/reset password, session restore, logout.
- **User Role:** Guest → Student/Admin/Instructor.
- **Entry Points:** `/login`, `/register`, `/verify-otp`, `/forgot-password`, `/reset-password`.
- **Business Value:** Gates every dashboard/portal page; ties purchases & progress to an identity.
- **Internal Flow:**
  - **Signup:** `signupAction` → POST `/auth/signup` → success → toast → redirect to `/verify-otp?email=...&purpose=email_verification`.
  - **Login:** `loginAction` → POST `/auth/login` (raw `fetch`, not `authApi` because it needs `set-cookie`) → parse `Qalam_Token` from `set-cookie` → store as HttpOnly cookie with `maxAge` computed from `sessionExpiresAt` → redirect by role.
  - **OTP:** `verifyOtpAction` POST `/auth/verify-otp` (purpose: `email_verification` or password reset).
  - **Forgot password:** `forgotPasswordAction` POST `/auth/forgot-password`.
  - **Reset password:** `resetPasswordAction` PATCH `/auth/reset-password` (token, password, confirmPassword).
  - **Session restore:** `AuthProvider.refreshUser` → `getCurrentUserAction` → GET `/users/me`; on `401` deletes cookie, sets `authExpired`.
  - **Auto expiry:** `AuthProvider` schedules `refreshUser` at `sessionExpiresAt`.
  - **Logout:** `logoutAction` POST `/auth/logout` (best-effort) then deletes cookie.
- **Files:** `actions/authActions.js`, `services/authService.js`, `providers/AuthProvider.jsx`, `hooks/auth/*`, `components/auth/**`, `components/layout/auth/**`.
- **API:** POST `/auth/signup`, POST `/auth/login`, POST `/auth/verify-otp`, POST `/auth/resend-otp`, POST `/auth/forgot-password`, PATCH `/auth/reset-password`, GET `/users/me`, POST `/auth/logout`.
- **Validation:** client HTML `required`; server-side field errors returned as `error.errors` map (shown inline per field in forms).
- **Security Rules:** HttpOnly, `SameSite=Strict`, `Secure` in production cookie; redirect by role; ProtectedRoute guards.
- **Edge Cases:** `401` → cookie removed + toast "انتهت جلسة تسجيل الدخول"; missing token from `set-cookie` → error "لم يتم استلام authentication cookie"; session auto-refresh timer.

```text
Login page
   │
   ▼
loginAction (server) ──► POST /auth/login
   │
   ├── Success ──► set HttpOnly cookie ──► redirect by role (dashboard / user)
   │
   └── Failure ──► fieldErrors + error toast
```

### Feature: Course Catalog & Details
- **Purpose:** Browse, filter, and view detailed course pages.
- **User Role:** Guest, Student.
- **Entry Points:** `/courses`, `/courses/[slug]`.
- **Internal Flow:** `/courses` renders `CoursesHero` + `CoursesSection`; toolbar (search, category, level, sort, view switch) filters client-side from `useCourses`; `/courses/[slug]` is a server component that calls `getCourseDetailsAction(slug)` → GET `/course/:slug/details`; on failure `notFound()`.
- **Business Value:** Primary conversion path (course → enroll).
- **Files:** `app/(website)/courses/page.js`, `app/(website)/courses/[slug]/page.js`, `components/courses/**`, `components/courseDetails/**`, `hooks/courses/useCourses.js`, `actions/courseActions.js`, `actions/lessonActions.js`.
- **API:** GET `/courses?<query>`, GET `/course/:slug/details`.
- **Edge Cases:** missing slug → `notFound()`; course not enrolled → shows enroll/wishlist actions (see CourseActions).

### Feature: Course Enrollment / Buying
- **Purpose:** Purchase a course (enroll) and continue learning.
- **User Role:** Student.
- **Entry Points:** Course details sidebar → "اشترك الآن".
- **Status:** **Partially implemented.** `CourseActions.jsx` has wishlist toggle (wired) but "اشترك الآن" is a placeholder `<Link href="#">`; the checkout flow exists at the action level (`checkoutPaymobAction`, `checkoutPaypalAction`, `createCashOrderAction`).
- **Internal Flow (data layer):** cart actions (add/update/remove/apply coupon) → order actions (create cash order, Paymob/PayPal checkout) → enrollment.
- **Files:** `components/courseDetails/sidebar/CourseActions.jsx`, `actions/cartActions.js`, `actions/orderActions.js`, `actions/enrollmentActions.js`.
- **API:** POST/GET/DELETE `/cart`, PATCH `/cart/apply-coupon`, DELETE `/cart/remove-coupon`, POST `/orders/:cartId`, POST `/orders/checkout-paymob/:cartId`, POST `/orders/checkout-paypal/:cartId`, GET `/enrollments/my-courses`.
- **Edge Cases:** enrolled user sees "متابعة التعلم" button (links to first lesson); wishlist toggle guards against double-clicks.

### Feature: Lesson Player & Progress Tracking
- **Purpose:** Watch lessons, mark completion, track course progress.
- **User Role:** Student (enrolled).
- **Entry Point:** `/courses/[slug]/lesson/[lessonId]` (server component).
- **Internal Flow:** `getLessonByIdAction(lessonId)` + `getCourseProgressAction(courseId)` → `LessonLayout` renders sidebar (curriculum accordion + ProgressCard) and content tabs (Overview, Notes, Q&A, Resources). `VideoPlayer` marks a lesson completed when 90% watched via `updateProgressAction(lessonId, true)`.
- **Business Value:** Core LMS value; drives "continue learning" and certificates.
- **Files:** `components/lesson/**`, `actions/lessonActions.js`, `actions/progressActions.js`.
- **API:** GET `/lessons/:id`, GET `/progress/course/:courseId`, POST `/progress`, GET `/progress/continue-watching`.
- **Validation:** progress only sent once per lesson (`progressUpdateRef`).
- **Edge Cases:** no video URL → placeholder message; missing lesson → `notFound()`.
- **Notes:** Notes/Q&A/Resources tabs are **frontend-only mockups** (static data, no persistence).

### Feature: Student Portal
- **Purpose:** Personal dashboard for learning and purchases.
- **User Role:** Student.
- **Entry Points:** `/user`, `/user/my-courses`, `/user/certificates`, `/user/downloads`, `/user/orders`, `/user/payment-history`, `/user/wishlist`.
- **Internal Flow:** `useStudentDashboard` → GET `/dashboard/student`; stats cards (enrollments, completed, hours, certificates); widgets ContinueLearning + MyCoursesPreview; subpages use respective hooks/actions.
- **Files:** `app/(user)/**`, `components/user/**`, `hooks/dashboard/useStudentDashboard.js`, `hooks/enrollments/useMyCourses.js`.
- **API:** GET `/dashboard/student`, GET `/enrollments/my-courses`, GET `/enrollments/my-products`, GET `/wishlist/course`.
- **Edge Cases:** loading skeleton for stats; wishlist empty-state text.

### Feature: Admin/Instructor Dashboard
- **Purpose:** Full CMS + e-commerce + user management.
- **User Role:** Admin, Instructor.
- **Entry Points:** `/dashboard`, `/dashboard/courses`, `/dashboard/courses/new`, `/dashboard/courses/[courseId]`, `/dashboard/courses/edit/[courseId]`, `/dashboard/courses/[courseId]/lessons/*`, `/dashboard/categories`, `/dashboard/users`, `/dashboard/students`, `/dashboard/products`, `/dashboard/orders`, `/dashboard/coupons`, `/dashboard/enrollments`, `/dashboard/services`, `/dashboard/projects`, `/dashboard/team`, `/dashboard/partners`, `/dashboard/blog`, `/dashboard/messages`, `/dashboard/profile`, `/dashboard/settings`.
- **Internal Flow:** Layout = `Sidebar` + `DashboardHeader` + `<ProtectedRoute allowedRoles={["admin","instructor"]}>`. Each page = PageHeader + Toolbar (search/filters synced to URL query params) + Table + modals (Add/Update/Delete).
- **Business Value:** Lets non-technical staff run the platform.
- **Files:** `app/(dashboard)/**`, `components/dashboard/**`, `components/layout/dashboard/**`, `components/shared/Sidebar/**`, `components/ui/modal/**`.
- **API:** admin CRUD for all resources (see section 9).
- **Edge Cases:** delete confirmations (native `confirm()`); delete modal slice exists but tables mostly use `confirm()`.

### Feature: Analytics (Dashboard Charts)
- **Purpose:** Revenue, sales, student distribution, recent orders overview.
- **User Role:** Admin.
- **Internal Flow:** `useAdminDashboard` → GET `/dashboard/admin` → `ChartsSection` transforms `overview`, `charts.revenue`, `topCourses`, `latestOrders` → recharts + `RecentOrders` widget.
- **Files:** `components/dashboard/home/ChartsSection.jsx`, `components/dashboard/charts/**`, `components/dashboard/widgets/RecentOrders.jsx`, `hooks/dashboard/useAdminDashboard.js`.
- **API:** GET `/dashboard/admin`.
- **Edge Cases:** empty data → empty arrays → charts render empty.

### Feature: Public Marketing Pages
- **Purpose:** Brand, services, portfolio, about, blog, contact, store.
- **User Role:** Guest.
- **Entry Points:** `/`, `/about`, `/services`, `/portfolio`, `/portfolio/[id]`, `/blog`, `/store`, `/contact`.
- **Internal Flow:** Static sections (hero, stats, testimonials, CTAs) driven by constants/static data; services/blog/portfolio pages use hooks to fetch real data; contact form → `submitContactAction`.
- **Business Value:** Converts visitors into students; showcases agency work.
- **Files:** `app/(website)/**`, `components/home/**`, `components/services/**`, `components/portfolio/**`, `components/about/**`, `components/blog/**`, `components/contact/**`, `components/store/**`.
- **API:** GET `/services`, GET `/portfolios`, GET `/blogs`, POST `/contact`.
- **Validation:** contact form fields server-validated; field errors shown.
- **Notes:** Many marketing components use hardcoded placeholder data (`components/about/**/*.js`, `constants/testimonials.js`, `constants/projects.js`) rather than API data.

### Feature: Store (Digital Products)
- **Purpose:** Sell digital products (PDFs) alongside courses.
- **User Role:** Guest/Student.
- **Entry Point:** `/store`.
- **Status:** **Partially implemented / prototype.** Page reuses `PortfolioFilters` + `ProjectsGrid`; product purchase/download flow exists in actions/hooks but the store UI is placeholder.
- **Files:** `app/(website)/store/page.js`, `actions/productActions.js`, `hooks/products/useProducts.js`, `components/user/dashboard/downloads/**`.

### Feature: Global Platform Settings
- **Purpose:** Branding, SEO, contact info, socials, registration/maintenance toggles.
- **User Role:** Admin.
- **Entry Point:** `/dashboard/settings`.
- **Internal Flow:** `SettingsForm` → `updateSettingsAction` (multipart with logos/favicon) → PATCH `/settings` → `revalidatePath("/", "layout")`.
- **Files:** `app/(dashboard)/dashboard/settings/page.js`, `components/dashboard/settings/SettingsForm.jsx`, `hooks/settings/useSettings.js`, `actions/settingsActions.js`.
- **API:** GET `/settings`, PATCH `/settings`.

### Feature: User Profile & Password
- **Purpose:** Edit personal info, avatar, and change password.
- **User Role:** Student/Admin/Instructor.
- **Entry Point:** `/dashboard/profile` (shared).
- **Files:** `components/profile/ProfileHeroCard.jsx`, `PersonalInfoCard.jsx`, `PasswordCard.jsx`, `actions/userActions.js` (`updateProfileAction`, `changePasswordAction`).
- **API:** PATCH `/users/:id`, PUT `/users/:id/change-password`.

### Feature: Theme toggle (partial)
- `userActions.js` exposes `getThemeAction`/`toggleThemeAction` (GET/PATCH `/users/theme`, `/users/theme/toggle`), but no UI consumes them (dead/incomplete).

---

# 8. DATABASE DOCUMENTATION

The frontend has **no local database**. All persistence lives in the backend (Express/Mongo). This section documents the **data contract** the frontend depends on. Each entity is used by the corresponding Server Actions.

### Data shapes the frontend reads
| Entity | Frontend usages (fields accessed) |
| ------ | --------------------------------- |
| **User** | `_id`, `firstName`, `lastName`, `email`, `phone`, `role`, `avatar`, `bio`, `country`, `city`, `address`, `isActive` |
| **Course** | `_id`, `slug`, `title.ar/.en`, `description.ar/.en`, `category`, `instructor`, `level` (`beginner|intermediate|advanced`), `language`, `price`, `discountPrice`, `duration`, `requirements`, `objectives`, `tags`, `thumbnail`, `trailerVideo`, `isPublished`, `isFeatured`, `createdAt`, `lessons[]`, `isEnrolled`, `isInWishlist` |
| **Lesson** | `_id`, `title.ar/.en`, `description.ar/.en`, `course`, `duration`, `video`, `isPreview`, `isPublished`, `sortOrder` |
| **Category** | `_id`, `title.ar/.en`, `description.ar/.en`, `type`, `isActive`, `image` |
| **Enrollment** | course list (`my-courses`), product list (`my-products`) |
| **Progress** | `completedLessons`, `totalLessons`, `progressPercent` |
| **Order** | `_id`, `user`, `cartItems[{price,count}]`, `status` (`paid|cancelled|pending`), `createdAt` |
| **Cart** | `cartItems`, totals, applied coupon |
| **Coupon** | `name`, `discount`, `expire` |
| **Product** | `title.ar/.en`, `description.ar/.en`, `category`, `price`, `discountPrice`, `stock`, `image`, `pdf` |
| **Review** | `course`, `rating`, `comment` |
| **Service** | `title.ar/.en`, `description.ar/.en`, `image` |
| **Portfolio** | `title.ar/.en`, `description.ar/.en`, `category`, `projectUrl`, `githubUrl`, `tags`, `image` |
| **Blog** | `title.ar/.en`, `excerpt.ar/.en`, `content.ar/.en`, `category`, `tags`, `isPublished`, `featuredImage` |
| **Team** | `user`, `position`, `bio`, `socialLinks` |
| **Partner** | `name`, `website`, `image` |
| **Contact** | `name`, `email`, `phone`, `subject`, `message` |
| **Settings** | `siteName`, `siteDescription`, `supportEmail`, `supportPhone`, `whatsapp`, `address`, socials, `allowRegistration`, `maintenanceMode`, `currency`, `defaultLanguage`, `seoTitle`, `seoDescription`, `seoKeywords`, logos/favicon |
| **Admin Dashboard** | `overview { totalRevenue, totalStudents, totalCourses, totalOrders }`, `charts.revenue[{_id:{month,year}, revenue, orders}]`, `topCourses[{title, totalStudents}]`, `latestOrders[]` |
| **Student Dashboard** | `overview { totalEnrollments, completedCourses, totalHours, totalCertificates }` |

### Pagination contract
List endpoints return `meta` (e.g. `{ hasMore }`). Hooks such as `useGetCategories` use `limit`/`skip` query params; `useCourses`/`useOrders` pass the raw search-params string through.

### Relationship summary (as used by frontend)

```text
USER (1) ─────┬── (N) ENROLLMENT ─── (1) COURSE
              ├── (N) ORDER
              ├── (N) REVIEW ─────── (1) COURSE
              ├── (N) PROGRESS ───── (1) LESSON
              ├── (N) WISHLIST ───── (1) COURSE
              └── (N) TEAM MEMBER   (links user → team page)

COURSE (1) ── (N) LESSON
COURSE (1) ── (N) CATEGORY (ref)
COURSE (1) ── (N) ENROLLMENT
CART (1) ── (N) CART ITEM (Course | Product)
ORDER (1) ── (N) CART ITEMS (snapshot)
```

---

# 9. API DOCUMENTATION

All requests go through `authApi()` (see `services/authService.js`) unless noted. Base URL: `{NEXT_PUBLIC_BASE_URL}/api` (default `http://localhost:5000/api`).

**Request conventions**
- Headers: `Cookie: Qalam_Token=<token>` (when logged in), `Accept-Language: ar` (default).
- JSON bodies for simple payloads; `FormData` (multipart) for uploads and localized fields.
- Localized fields use dot/bracket keys: `title.ar`, `title[ar]`, `description.en`, etc.
- `cache: "no-store"` on every fetch.
- Mutations call `revalidatePath(...)` to refresh Next.js cached pages.

**Response conventions**
```json
{ "success": true, "data": { ... }, "meta": { ... }, "message": "..." }
{ "success": false, "message": "...", "errors": { "field": "..." } }
```

### Auth
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| POST | `/auth/signup` | Create account (firstName,lastName,email,phone,password,country,city,address) | No |
| POST | `/auth/login` | Login; returns `set-cookie` token + `sessionExpiresAt`. **Called via raw `fetch`** | No |
| POST | `/auth/verify-otp` | Verify OTP (`email`,`otp`,`purpose`) | No |
| POST | `/auth/resend-otp` | Resend OTP | No |
| POST | `/auth/forgot-password` | Request password reset email | No |
| PATCH | `/auth/reset-password` | Reset password (`token`,`password`,`confirmPassword`) | No |
| POST | `/auth/logout` | Invalidate session (best-effort) | Yes |
| GET | `/users/me` | Current user session restore | Yes |

### Users / Students / Instructors
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/users/admin?search=&role=&isActive=` | Admin user list | Admin |
| GET | `/users?role=student` | Student list | Admin |
| GET | `/users?role=instructor` | Instructor list (for course form select) | Admin/Instructor |
| GET | `/users/:id` | Single user | Yes |
| PATCH | `/users/:id/admin` | Admin updates user (role/status) | Admin |
| DELETE | `/users/:id` | Delete user | Admin |
| PATCH | `/users/:id` | Update own profile (multipart, includes avatar) | Yes |
| PUT | `/users/:id/change-password` | Change own password | Yes |
| GET | `/users/theme` / PATCH `/users/theme/toggle` | Theme preference (unused in UI) | Yes |

### Courses / Lessons
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/courses?<query>` | Course list (search/category/level filters) | Optional |
| GET | `/courses/:id` | Course by ID | Optional |
| POST | `/courses` | Create course (multipart) | Admin/Instructor |
| PATCH | `/courses/:id` | Update course (multipart; supports remove flags) | Admin/Instructor |
| DELETE | `/courses/:id` | Delete course | Admin/Instructor |
| GET | `/course/:slug/details` | Public course details (includes isEnrolled, isInWishlist, lessons) | Optional |
| GET | `/lessons?<query>` | Lesson list | Optional |
| GET | `/lessons/:id` | Lesson detail | Yes |
| POST | `/lessons` | Create lesson (multipart video) | Admin/Instructor |
| PATCH | `/lessons/:id` | Update lesson | Admin/Instructor |
| DELETE | `/lessons/:id` | Delete lesson | Admin/Instructor |

### Categories
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/categories?limit=&skip=&search=&type=&isActive=` | Category list (pagination) | Optional |
| GET | `/categories/:id` | Single category | Optional |
| POST | `/categories` | Create category (multipart) | Admin |
| PATCH | `/categories/:id` | Update category (multipart or JSON) | Admin |
| DELETE | `/categories/:id` | Delete category | Admin |

### E-commerce (Cart / Orders / Coupons / Products)
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/cart` | Get cart | Yes |
| POST | `/cart` | Add item `{itemId, itemType: "Course"|"Product"}` | Yes |
| PUT | `/cart/:cartItemId` | Update quantity `{count}` | Yes |
| DELETE | `/cart/:cartItemId` | Remove item | Yes |
| DELETE | `/cart` | Clear cart | Yes |
| PATCH | `/cart/apply-coupon` | Apply `{couponName}` | Yes |
| DELETE | `/cart/remove-coupon` | Remove coupon | Yes |
| GET | `/orders?<query>` | Admin order list | Admin |
| GET | `/orders/:id` | Order detail | Yes |
| PATCH | `/orders/:id/cancel` | Cancel order | Yes |
| POST | `/orders/:cartId` | Create cash order | Yes |
| POST | `/orders/checkout-paymob/:cartId` | Paymob checkout (returns payment link) | Yes |
| POST | `/orders/checkout-paypal/:cartId` | PayPal checkout (returns payment link) | Yes |
| GET | `/products?<query>` | Product list | Optional |
| GET | `/products/:id` | Product detail | Optional |
| POST | `/products` / PATCH `/products/:id` / DELETE `/products/:id` | Product CRUD (multipart image+pdf) | Admin |

### Learning (Enrollments / Progress / Reviews / Wishlist)
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/enrollments/my-courses?<query>` | Student's enrolled courses | Student |
| GET | `/enrollments/my-products?<query>` | Student's purchased products (downloads) | Student |
| GET | `/enrollments?<query>` | Admin enrollment list | Admin |
| GET | `/enrollments/:id` | Enrollment detail | Admin/Instructor |
| GET | `/progress/continue-watching` | Continue-watching list | Student |
| GET | `/progress/course/:courseId` | Course progress + lesson completion | Student |
| POST | `/progress` | Update progress `{lesson, isCompleted}` | Student |
| GET | `/reviews?<query>` | Reviews list | Public |
| POST | `/reviews` | Create review `{course, rating, comment}` | Student |
| PATCH | `/reviews/:id` / DELETE `/reviews/:id` | Update/delete review | Student/Admin |
| GET | `/wishlist/course` | Wishlist courses | Student |
| POST | `/wishlist/course` | Add `{courseId}` | Student |
| DELETE | `/wishlist/course/:courseId` | Remove from wishlist | Student |

### CMS Content (Blog / Services / Portfolio / Team / Partners / Contact / Settings)
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/blogs?<query>` · `/blogs/:id` | Blog list/detail | Public |
| POST/PATCH/DELETE | `/blogs` · `/blogs/:id` | Blog CRUD (multipart featuredImage) | Admin |
| GET | `/services?<query>` · `/services/:id` | Services | Public |
| POST/PATCH/DELETE | `/services` · `/services/:id` | Service CRUD (multipart image) | Admin |
| GET | `/portfolios?<query>` · `/portfolios/:id` | Portfolio projects | Public |
| POST/PATCH/DELETE | `/portfolios` · `/portfolios/:id` | Portfolio CRUD (multipart image) | Admin |
| GET | `/team?<query>` | Team members | Public |
| POST/PATCH/DELETE | `/team` · `/team/:id` | Team CRUD (links a user) | Admin |
| GET | `/partners?<query>` | Partners | Public |
| POST/PATCH/DELETE | `/partners` · `/partners/:id` | Partner CRUD (multipart image) | Admin |
| GET | `/contact?<query>` · `/contact/:id` | Admin message inbox | Admin |
| POST | `/contact` | Public contact form | Public |
| DELETE | `/contact/:id` | Delete message | Admin |
| GET | `/settings` | Platform settings | Optional |
| PATCH | `/settings` | Update settings (multipart logos/favicon) | Admin |

### Dashboards
| Method | Route | Description | Auth |
| ------ | ----- | ----------- | ---- |
| GET | `/dashboard/admin` | Admin overview (revenue, students, courses, orders, charts, orders) | Admin |
| GET | `/dashboard/instructor` | Instructor overview | Instructor |
| GET | `/dashboard/student` | Student overview (enrollments, completed, hours, certs) | Student |

---

# 10. AUTHENTICATION & AUTHORIZATION

## Login flow

```text
/login (client form)
   │ useLoginForm → useActionState(loginAction)
   ▼
loginAction (server)  ──►  raw fetch POST {NEXT_PUBLIC_BASE_URL}/api/auth/login
   │
   │  response headers: set-cookie: Qalam_Token=...; Max-Age=...
   │
   ├── parse token from set-cookie
   │   cookieStore.set("Qalam_Token", token, { httpOnly, secure(prod), sameSite:"strict", maxAge })
   │
   └── return { success, data:{ user }, sessionExpiresAt }
          │
          ▼
   hook: setUser + setSessionExpiresAt → toast → redirect by role
```

## Registration flow

```text
/register ─► signupAction ─► POST /auth/signup
   └── success ─► toast ─► /verify-otp?email=&purpose=email_verification
                       └── verifyOtpAction ─► POST /auth/verify-otp ─► login
```

## Session management
- **Token storage:** HttpOnly cookie `Qalam_Token` (never readable from JS). `maxAge` derives from backend `sessionExpiresAt`.
- **Restore:** `AuthProvider` calls `refreshUser()` on mount → `getCurrentUserAction` → GET `/users/me`.
- **Expiry:** `sessionExpiresAt` triggers a timer; when it fires, `refreshUser()` runs again. On `401`, `authService` deletes the cookie and marks `authExpired`.
- **Logout:** calls POST `/auth/logout` (best-effort), always deletes cookie, redirects `/`.

## Role management / permissions
- `ProtectedRoute` (`components/auth/ProtectedRoute.jsx`) is the client-side gate:
  - Not authenticated → `router.replace("/")`.
  - Role not in `allowedRoles` → redirect to `{admin:"/dashboard", instructor:"/instructor", student:"/user"}`.
  - Shows `FullPageLoader` while `loading`.
- Layouts wrap children: `DashboardLayout` allows `["admin","instructor"]`, `UserDashboardLayout` allows `["student"]`.

## OAuth
None. No OAuth providers configured.

## Security observations
- Authorization is enforced **client-side only** in this repo; real enforcement must be in the backend (out of scope here). Frontend route guards are UX, not security.
- Token flows only through HttpOnly cookies — good.
- `NEXT_PUBLIC_*` env vars are embedded in client bundle; only non-secret config should use that prefix (current values are non-secret).

---

# 11. BUSINESS RULES

| Rule | Where enforced | Explanation |
| ---- | -------------- | ----------- |
| Arabic-first content | `Accept-Language: ar` header; `dir="rtl"`, Cairo font | All UI copy is Arabic; API defaults to Arabic localization. |
| Bilingual fields required | `CreateCourseForm`, `addCategoryAction`, blog forms, etc. | Every translatable entity carries both `ar` and `en` values. |
| Role-based landing | `useLoginForm.js` roleRedirects | Students → `/user`; admin/instructor → `/dashboard`. |
| Role-based access | `ProtectedRoute` + layouts | Only allowed roles render dashboard/portal chrome. |
| Currency display | `CoursesTable`, charts | Prices formatted with `ج.م` (Egyptian Pound); revenue divided by 1000 (`ألف جنيه`). |
| Lesson completion threshold | `VideoPlayer.jsx` | A lesson is marked completed at ≥90% watch time; only once per lesson. |
| Discount precedence | `CoursesTable`, `WishlistGrid` | If `discountPrice > 0`, display discount price and strike-through original. |
| Session expiry | `AuthProvider` | Token auto-refreshed/cleared when `sessionExpiresAt` passes. |
| OTP purposes | `authActions.js` | `purpose` distinguishes `email_verification` vs password reset. |
| Image/media removal | `updateCourseAction`, `updateCategoryAction` | `removeThumbnail`/`removeTrailer`/`removeImage === "true"` sends empty string to clear file. |
| Default language/level | `CreateCourseForm` | defaults: `language="arabic"`, `level="beginner"`. |
| isActive default true on create | `addCategoryAction` | New categories always created active. |

---

# 12. EXTERNAL INTEGRATIONS

| Integration | Purpose | Auth method | Usage location | Failure handling |
| ----------- | ------- | ----------- | -------------- | ---------------- |
| **Backend REST API (Express)** | All data | HttpOnly `Qalam_Token` cookie forwarded as header | Every `actions/*.js` via `authApi()` | Throws Error with `statusCode`/`errors`; actions catch and return `{success:false,message,fieldErrors}` |
| **Paymob** (via backend) | Payment checkout | Server-side only (frontend calls `/orders/checkout-paymob/:cartId`) | `orderActions.checkoutPaymobAction` | Returns `{success:false,message}`; error toast |
| **PayPal** (via backend) | Payment checkout | Server-side only | `orderActions.checkoutPaypalAction` | Same as above |
| **Google Fonts** (next/font) | Cairo + Inter fonts | Public CDN | `app/layout.js` | Font loading handled by Next.js |
| **Remote images** | Course/media thumbnails from backend | URL allow-list | `next.config.mjs` `images.remotePatterns: http://localhost:5000/**` | Next Image errors on unlisted host |
| **AOS (animate on scroll)** | Scroll animations | N/A (client lib) | `lib/aos.js`, components spread `data-aos` props | None |

**Note:** There are no direct third-party API keys in the frontend; Paymob/PayPal credentials live server-side.

---

# 13. ENVIRONMENT VARIABLES

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `NEXT_PUBLIC_BASE_URL` | Yes (falls back to `http://localhost:5000`) | Backend origin; used to build API URL and to resolve relative media/video paths. |
| `NEXT_PUBLIC_NODE_ENV` | No | Declared in `.env` (=`development`); used nowhere in code — informational. *(inferred)* |
| `NODE_ENV` | No | Next.js built-in; drives cookie `secure` flag. *(standard Next.js)* |

**Inferred/missing (for production):** `NEXT_PUBLIC_BASE_URL` should point to the deployed API domain, and `next.config.mjs`'s `images.remotePatterns` must include the production media host. No `NEXT_PUBLIC_` secrets exist — do not add secrets under this prefix.

---

# 14. CONFIGURATION ANALYSIS

### Build configuration (`next.config.mjs`)
- `experimental.serverActions.bodySizeLimit: "100mb"` — permits large media uploads through Server Actions.
- `images.remotePatterns: [new URL("http://localhost:5000/**")]` — allows Next `Image` optimizer to load backend-hosted media. **Note:** production host must be added here too.

### Environment configuration
- `.env` holds dev values only. `.gitignore` ignores `.env*`.

### Runtime / styling configuration (`tailwind.config.js`)
- `content` scans `app`, `pages`, `components`.
- All color tokens map to CSS variables from `:root` in `globals.css` (dark theme):
  - `primary: #6D5DF6`, `secondary: #1B2A52`, `accent: #3ABEFF`
  - `background: #070B17`, `background-alt: #0C1326`, `card: #11192F`
  - success/warning/error, text colors, glow colors, border `#ffffff14`.
- `container` centered, max `xl:1280px`, padding 1rem.
- Radii: `button/input 14px`, `card 22px`, `image 24px`, `fullCard 32px`.
- Shadows: `card`, `purple`, `blue`, `neon`.
- `jsconfig.json`: `@/*` → `./*`.

### Global CSS utilities (`styles/globals.css`)
- `.gradient-primary`, `.gradient-card`, `.gradient-button`, `.gradient-border`, `.gradient-text`.
- `.glass` (semi-transparent card bg), `.glow-*`.
- Keyframes: `float`, `pulseGlow`, `rotateSlow`, `shine` (+ `animate-*` classes).
- `.input-style`, `.section-title`, `.btn-primary`, `.btn-outline`.

### Package management
- `package.json` scripts: `dev` (next dev), `build` (next build), `start` (next start). No `lint`, `test`, or `typecheck` scripts.
- Dependencies mix current (next16/react19/recharts3) with legacy/unused libs (axios, js-cookie, react-hook-form, zod, lottie-react).

---

# 15. DEPLOYMENT GUIDE

## Local development setup
1. Start the backend first (Express API, defaults to `localhost:5000`).
2. `cd frontend`
3. Ensure `.env` contains `NEXT_PUBLIC_BASE_URL=http://localhost:5000`.
4. `npm install`
5. `npm run dev` → open `http://localhost:3000`.

## Environment setup
- Backend must run on the port matching `NEXT_PUBLIC_BASE_URL`.
- The backend sets `set-cookie: Qalam_Token` on login; the frontend re-sets it as its own HttpOnly cookie.

## Running the project
- `npm run dev` — dev server.
- `npm run build` — production build.
- `npm start` — serve production build.

## Build process
```text
npm run build
   └── Next.js compiles app/, actions/ (server), components/ (client),
       generates static pages, and validates Server Action boundaries.
```

## Production deployment
- Point `NEXT_PUBLIC_BASE_URL` at the production API.
- Update `next.config.mjs` `images.remotePatterns` to the production media domain.
- Deploy as a Node.js app (`next start`) or serverless (Vercel); server runtime is required (Server Actions + cookies).
- Cookie `secure: true` automatically when `NODE_ENV === "production"`.

## CI/CD
- **None present.** No workflow files, Dockerfile, or deploy scripts in the frontend. Recommend adding GitHub Actions for lint/build or a Dockerfile.

---

# 16. SECURITY REVIEW

## Authentication security — Good
| Item | Status | Notes |
| ---- | ------ | ----- |
| Token storage | ✅ | HttpOnly, SameSite=Strict, Secure in prod. |
| Session expiry | ✅ | Backend-driven `sessionExpiresAt` + client timer. |
| Credential handling | ✅ | Passwords never stored/logged on frontend. |

## Authorization security — ⚠️ Client-side only
| Issue | Risk | Impact | Recommendation |
| ----- | ---- | ------ | -------------- |
| Route guards are client-side | Medium | A determined user could bypass UI redirects; data protection depends entirely on backend. | Treat `ProtectedRoute` as UX only; enforce every role check in backend middleware. |
| Dashboard layout allows `admin` + `instructor` equally | Medium | Instructors see admin sections (users, settings) in the menu. | Gate menu items and actions by role; ideally render role-specific dashboards server-side. |

## Input validation
- Client: HTML `required`, basic number `min`; `react-hook-form`/`zod` installed but **not used** in forms.
- Server: backend validation errors surfaced per-field via `error.errors` and rendered inline (auth forms, category forms).
- Risk: Medium (rely on backend for real validation; client forms lack strong validation).

## API security
- `authApi` always sends cookies and `Accept-Language: ar`.
- On `401`, cookie is cleared — good.
- **Issue:** error responses echo backend messages to the UI (acceptable, but confirm no sensitive data leaks).
- `bodySizeLimit: 100mb` is permissive — verify backend accepts and rate-limits large uploads.

## Secrets management
- Only `NEXT_PUBLIC_*` vars exist (non-secret). ✅ No secrets committed.
- `.env*` gitignored. ✅

## Data protection
- Media served from backend; frontend only references URLs.
- `cache: "no-store"` prevents stale authenticated data.

## Vulnerabilities / flagged items
| Issue | Risk | Impact | Recommendation |
| ----- | ---- | ------ | -------------- |
| Unused/incomplete payment UI ("اشترك الآن" links to `#`) | Medium | Dead-end user journey; users cannot actually buy. | Wire checkout to `checkoutPaymobAction`/`checkoutPaypalAction` or `createCashOrderAction`. |
| Debug link on login page (`/login`) to admin/user | Low | Developer shortcut exposed to public | Remove before production. |
| `console.log("CURRENT USER:", ...)` in `AuthProvider` | Low | Logs user data in dev | Remove/guard with env check. |
| Empty/stub utils (`formatDate.js`, `formatPrice.js`, etc.) | Low | Risk of accidental import | Delete stubs or implement them. |
| Placeholder markup in store page reusing portfolio components | Low | Confusing product/store UX | Implement real store UI or remove. |

---

# 17. PERFORMANCE REVIEW

| Area | Status | Notes & recommendations |
| ---- | ------ | ----------------------- |
| Public pages | ✅ Good | Server Components fetch via Server Actions → minimal client JS; `cache: no-store` keeps fresh. |
| Dashboard data | ⚠️ | Every mount fetches all data (no client cache/SWR). Add `unstable_cache`/React Query or persist data server-side. |
| Images | ⚠️ | `next/image` used in places; many `<img>` tags elsewhere (Header, UserMenu, tables) bypass optimization. Convert to `next/image` with correct sizes. |
| Media server | ⚠️ | Videos/pdfs streamed from Express; enable range requests & CDN for large files. |
| Bundle | ⚠️ | Large deps (recharts, swiper, embla, aos, lottie) included globally; code-split heavy chart/carousel imports. |
| List pagination | ✅ | `useGetCategories` implements limit/skip infinite scroll; `LoadMore` component used elsewhere. |
| Revalidation | ✅ | `revalidatePath` after mutations keeps public pages fresh. |
| Animations | ✅ | AOS initialized once globally; animations applied declaratively. |

### Recommendations
1. Add React Query/SWR or server-side caching for dashboard hooks.
2. Lazy-load `recharts`, `swiper`, and `lottie-react` only on pages that use them.
3. Move all `<img>` to `next/image`; add width/height to prevent CLS.
4. Use streaming/partial prerendering for media-heavy lesson pages.

---

# 18. CODE QUALITY REVIEW

## High priority
| Item | Detail |
| ---- | ------ |
| Inconsistent API error access | Some actions read `error.response.data.message` (axios-style), others `error.message`; `authApi` throws plain `Error`. Normalize. |
| Delete confirmation inconsistency | `modalDeleteSlice` + `DeleteModal` exist, but tables use native `confirm()`. Pick one pattern. |
| Naming/typo dirs | `components/user/dashboard/payment-h�istory/` contains a corrupted name (`payment-h�istory`). Rename to `payment-history`. |
| Duplicated fetch boilerplate | ~25 hooks are nearly identical (loading/error/refetch). Extract a `useFetch` generic hook. |

## Medium priority
| Item | Detail |
| ---- | ------ |
| Dead code / unused deps | `axios`, `js-cookie`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lottie-react`, `react-countup` partially unused. Audit and remove. |
| Empty utility files | `formatDate.js`, `formatPrice.js`, `generateSlug.js`, `seo.js`, `storage.js`, `truncateText.js` are empty. |
| Legacy `useUser` hook | Duplicates `AuthProvider`; `result.user` vs `result.data.user` mismatch. Remove or fix. |
| Hardcoded content | About/services/blog/portfolio/testimonials use static `.js` data files instead of API. |
| Inconsistent localization keys | Mixed `title.ar` (actions) and `title[ar]` (forms). Backend parses both, but standardize. |
| Charts static fallback data | `revenueData.js`, `salesData.js`, `studentsDistributionData.js` placeholders likely unused. |

## Low priority
| Item | Detail |
| ---- | ------ |
| README is boilerplate | Replace with real run instructions. |
| Comments in Arabic + English | Fine for the team, but inconsistent. |
| `animations/` vs `lib/animation/` duplication | Two animation helper layers exist; consolidate. |

---

# 19. SYSTEM DEPENDENCY MAP

```text
                        ┌────────────────────────────┐
                        │       app/layout.js        │
                        │  StoreProvider · AuthProvider│
                        │  AnimationProvider · Toast │
                        └──────────┬─────────────────┘
                                   │
        ┌───────────────┬──────────┴──────────┬────────────────┐
        ▼               ▼                     ▼                ▼
  (website)       (dashboard)            (user)           (auth)
  AppLayout    DashboardLayout        UserDashboardLayout  forms
  (server comps)  ProtectedRoute          ProtectedRoute
        │               │                     │
        ▼               ▼                     ▼
  hooks/*  ◄──(client state)──►  actions/* ("use server")
        │               │                     │
        └───────────────┴──────────┬──────────┘
                                   ▼
                        services/authService.js (authApi)
                                   │
                                   ▼
                    Backend REST API (Express, external)
```

**Critical modules:** `services/authService.js`, `actions/*`, `providers/AuthProvider.jsx`, `components/auth/ProtectedRoute.jsx`, `store/` (toast + modals).

**External dependencies:** Backend API; Google Fonts; Paymob/PayPal (via backend); AOS CSS.

---

# 20. DEVELOPER ONBOARDING GUIDE

## What to read first
1. `docs/Frontend_DOCS.md` (this document).
2. `services/authService.js` — the single HTTP wrapper.
3. `actions/authActions.js` — the reference Server Action pattern (login + cookie handling).
4. `providers/AuthProvider.jsx` — global session state.
5. `app/layout.js` — provider composition & fonts.
6. `tailwind.config.js` + `styles/globals.css` — design tokens.

## Important files
| File | Why |
| ---- | --- |
| `services/authService.js` | All API traffic flows here. |
| `actions/*.js` | Every backend call; add new features here first. |
| `components/auth/ProtectedRoute.jsx` | Role gating. |
| `components/ui/Table.jsx` | Table building block for admin screens. |
| `hooks/category/useGetCategories.js` | Reference infinite-scroll hook. |
| `components/dashboard/course-management/CreateCourseForm.jsx` | Reference multipart form pattern. |
| `components/lesson/lessonPlayer/VideoPlayer.jsx` | Progress-marking logic. |

## Key features
Authentication w/ OTP, course CRUD + lessons, category management, cart/orders/coupons, enrollments & progress, reviews, wishlist, CMS (blog/services/portfolio/team/partners), contact inbox, platform settings, admin + student dashboards.

## Development workflow
1. Write/replace a Server Action in `actions/` (calls `authApi`).
2. Create a hook in `hooks/` (fetch + loading/error/meta).
3. Build components in `components/<feature>/`; wire tables via `components/ui/Table` + toolbar.
4. Register pages under the correct route group in `app/`.
5. Always call `revalidatePath(...)` after mutations.

## Common pitfalls
- Forgetting `"use client"` on interactive components or `"use server"` on actions.
- Reading `result.user` vs `result.data.user` (inconsistent response shapes).
- Not forwarding `searchParams` to hooks — filters stop working.
- Adding a new remote image host without updating `next.config.mjs`.
- `authApi` requires the backend running and matching `NEXT_PUBLIC_BASE_URL`.

## Recommended learning path
Next.js App Router → Server Actions → route groups/layouts → Tailwind tokens → Redux Toolkit slices → the actions→hooks→components data flow → payment/checkout actions.

---

# 21. PROJECT COMPLEXITY ASSESSMENT

## System size
**Large** — ~90 pages/routes, ~400 component files across 15 domains.

## Estimated development effort
- **MVP effort:** ~2–3 months (marketing site + auth + courses + enrollment).
- **Current version effort:** ~6–10 months assuming a single full-stack dev or small team (given breadth of CMS + e-commerce + LMS + dashboards).

## Team size required
- 2–3 frontend devs, 1–2 backend devs, 1 UI/UX designer, 1 QA (production).

## Maintenance complexity
**High.** Many near-duplicate CRUD screens (each resource repeats table+toolbar+modal+hook). The dependency on a live backend makes the app non-functional without it.

---

# 22. REBUILD ESTIMATION

| Item | Estimate |
| ---- | -------- |
| Time to rebuild | 4–8 months (1 full-time full-stack team) |
| Required team roles | Frontend (Next.js), Backend (Express/Node), Designer, QA |
| Required skills | React 19, Next.js App Router, Server Actions, Tailwind, Redux Toolkit, REST APIs, RTL/Arabic UX |
| Infrastructure requirements | Node.js runtime, Express API + DB, media storage/CDN, SMTP for OTP emails, Paymob/PayPal accounts |
| Caveats | Rebuilding from scratch would still need the backend contract; the frontend is tightly coupled to backend response shapes (`data`, `meta`, localized fields, `sessionExpiresAt`). |

---

# 23. FINAL SUMMARY

## Complete feature list
- Public site: home, about (story/timeline/team/values/partners), services, courses + filters, course details (curriculum/reviews/instructor/related), portfolio + filters, blog, store, contact.
- Auth: register + email OTP, login, forgot/reset password, session restore, logout, role-based redirect.
- Student portal: dashboard stats, my courses, continue learning, certificates, downloads, orders, payment history, wishlist.
- Admin dashboard: overview analytics (revenue/sales/students/orders charts), courses + lessons CRUD (multipart media), categories, users, students, products, orders, coupons, enrollments, services, projects (portfolio), team, partners, blog, contact messages, platform settings, profile/password.

## Architecture summary
Next.js App Router (React 19) with route groups for website/user/dashboard/auth. Server Actions (`actions/`) form the API gateway through `authApi()` (`services/authService.js`), which injects the HttpOnly `Qalam_Token` cookie and `Accept-Language: ar`. Client components use thin data hooks; Redux Toolkit handles only cross-cutting UI state (toast/modals). Role-based layouts and `ProtectedRoute` guard the dashboards.

## Database summary
No local DB — the frontend consumes the backend's REST API. Documented contract: users, courses (bilingual), lessons, categories, enrollments, progress, cart/orders/coupons/products, reviews, wishlist, services, portfolios, blogs, team, partners, contact, settings, dashboards. Responses follow `{success, data, meta, message}`.

## Security summary
HttpOnly SameSite=Strict cookie auth, session expiry handling, `401` cleanup, secure cookie in production. Gaps: client-side-only authorization, unfinished payment UI, minor debug logging, empty utility stubs.

## Technical risks
1. Backend coupling — no mock/offline data; app unusable without the API.
2. Payment flow incomplete at the UI layer.
3. Unused deps & dead code inflating bundle.
4. Duplicated CRUD patterns hurting maintainability.
5. RTL/`<img>` rendering and image optimization gaps.

## Recommended improvements
1. Wire the real checkout flow (Paymob/PayPal/cash) into course/product purchase buttons.
2. Introduce a generic `useFetch`/query cache; remove duplicated hooks.
3. Remove unused packages; add ESLint/Prettier and a CI build.
4. Standardize API error handling and response normalization in `authApi`.
5. Fix the `payment-h�istory` directory name and empty utils.
6. Move role-based menu filtering into the layout (hide admin items from instructors).
7. Update README and add environment documentation.

## Critical components
`services/authService.js`, `actions/*`, `providers/AuthProvider.jsx`, `components/auth/ProtectedRoute.jsx`, `components/shared/Sidebar/*`, `store/slices/*`, `styles/globals.css` (design tokens).

## Key takeaways
- Qalam Academy is a comprehensive Arabic RTL EdTech + e-commerce platform built with modern Next.js patterns.
- The frontend is well-structured for its size but has duplicated CRUD logic and an incomplete purchase journey.
- Everything hangs on the backend API contract; any rebuild must preserve response shapes (`data`, `meta`, localized fields, `sessionExpiresAt`, `Qalam_Token` cookie).

---

## Legend for Findings
- ✅ **Confirmed** — verified directly in source.
- ⚠️ / 💡 **Inferred** — reasonable deduction from code patterns, not directly observable.
- *(marked where applicable)*
