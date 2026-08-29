# Qalam Academy — Backend Reverse-Engineering & Technical Documentation

> **Project Type:** Backend Application (REST API, monolith)
> **Document Version:** 1.0
> **Analysis Date:** 2026-08-13
> **Scope:** `backend/` directory only. The frontend is documented separately in `docs/Frontend_DOCS.md`.

---

# 1. EXECUTIVE SUMMARY

## Project Name
**Qalam Academy Backend** (`educational-platform-api`) — the Express REST API powering an Arabic-first educational e-commerce platform.

## Purpose
The backend serves every piece of data the platform needs:
1. **Public marketing content** — hero sections, services, portfolio, team, partners, blog, contact messages.
2. **Course catalog & LMS** — categories, courses, lessons, course-detail aggregation, enrollment, per-lesson progress, reviews and ratings.
3. **Digital store** — products (PDFs/digital files), cart, coupons, orders, wishlist.
4. **Payments** — Paymob (card / wallet / Fawry via the Intentions API + webhook) and PayPal (Orders API + capture), plus cash orders.
5. **Admin/instructor dashboards** — aggregated statistics and charts.
6. **Platform configuration** — singleton settings (site info, social, theme colors, SEO), role-based user management.

## Business Problem
The business needed a single backend that can:
- Sell courses **and** digital products in the Egyptian market (prices in EGP) through multiple payment channels.
- Gate video lessons behind purchase (enrollment) while offering a free preview lesson.
- Track per-student completion percentage and "continue watching".
- Let admins and instructors manage all content through a dashboard without writing code.
- Serve bilingual (Arabic/English) content from a single data model.

## Target Users
| Role | Description |
| ---- | ----------- |
| **Guest / Visitor** | Reads public endpoints (courses, blog, services, settings, public heroes). |
| **Student** | Registers, verifies email via OTP, buys courses/products, watches lessons, tracks progress, reviews courses. |
| **Instructor** | Manages own courses and lessons; sees dashboard stats for own courses. |
| **Admin** | Full CRUD over all content, users, orders, coupons, settings. |

## Main Capabilities
- REST API under `/api` with 25 mounted route modules.
- JWT session authentication via an HttpOnly cookie (`Qalam_Token`) with optional `Bearer` header fallback.
- Role-based authorization (`admin`, `instructor`, `student`).
- Email OTP verification + password reset (Nodemailer + HTML templates).
- Bilingual data model (`{ ar, en }` subdocuments) with response-time translation driven by `Accept-Language`/`?lang=`.
- Generic CRUD factory (`crudFactory.js`) + reusable query engine (`ApiFeatures.js`) for search/filter/sort/pagination/populate.
- Local file uploads via Multer with MIME allow-listing and automatic old-file cleanup.
- Multi-gateway checkout (Paymob intention + webhook, PayPal order + capture, cash).
- Aggregate dashboards for admin, instructor, and student roles.

## High-Level Architecture

```text
┌──────────────────────────────┐
│   Next.js Frontend (SPA)     │
│   Server Actions → fetch()   │
└──────────────┬───────────────┘
               │  /api/*   Cookie: Qalam_Token
               │  Accept-Language: ar|en
               ▼
┌──────────────────────────────┐
│      EXPRESS APP (src/app.js)│
│  Security → Parsers → Static │
│  → Logger → Language → Routes│
│  → 404 → Global Error Handler│
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   ROUTES (src/routes/index)  │
│  auth users courses lessons  │
│  cart orders enrollment ...  │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   MODULE LAYER (per feature) │
│  controller + service + model│
│  + zod schema + routes       │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   Mongo/Mongoose + Uploads   │
│   + Email (SMTP) + Paymob +  │
│   PayPal (outbound HTTP)     │
└──────────────────────────────┘
```

---

# 2. PROJECT OVERVIEW

## System Description
Qalam Academy's backend is a conventional Express 5 monolith (CommonJS). Every feature lives in its own folder under `src/modules/<name>/` with a consistent file pattern: `*.model.js` (Mongoose schema), `*.controller.js` (request handlers), `*.routes.js` (router), `*.schema.js` (Zod validation), and — where logic is non-trivial — a `*.service.js` layer (e.g. `progress`, `order`, `review`, `dashboard`, `course-details`, `hero`).

All data access is routed through two generic helpers:
- `crudFactory.js` — standard `createOne / getAll / getOne / updateOne / deleteOne` handlers that accept per-module options (file fields, translatable fields, populate, before/after hooks).
- `ApiFeatures.js` — a fluent query builder supporting `search`, `filter` (with Mongo operators), `sort`, `select`, `loadMore`/pagination and `populate`.

Responses follow a fixed envelope: `{ success, message, data, meta?, errors? }` (see `sendResponse.js`). Errors are `ApiError` instances with an HTTP status code, handled by a single global error middleware that translates Mongoose duplicate-key, validation, cast, JWT, and Multer errors.

i18n works two ways:
1. **Static UI strings** (`src/locales/{ar,en}.js`) resolved by `req.t('key', params)` (injected by the `language` middleware).
2. **Document content** — fields stored as `{ ar, en }` objects are flattened to the requested language by `translateDocument`, which also preserves the full bilingual object under a `_translations` key.

## Core Concepts
| Concept | Explanation |
| ------- | ----------- |
| **Module** | A self-contained feature folder under `src/modules/` (controller + model + routes + schema). |
| **CRUD Factory** | Parameterized handlers in `utils/crudFactory.js` used by most modules. |
| **ApiFeatures** | Fluent query builder (`utils/ApiFeatures.js`) for search/filter/sort/pagination/populate. |
| **Bilingual field** | Subdocument `{ ar, en }`; translated at response time based on `req.language`. |
| **Qalam_Token** | HttpOnly JWT cookie (90 days by default). |
| **Singleton** | A document forced to exist exactly once (`singleton: true`) — used by `Settings`, `Journey`, `ChooseUs`. |
| **Enrollment** | The join between a student and a purchased course; holds aggregate `progress` (0–100). |
| **Payment intent** | Paymob Intention ID / PayPal Order ID stored on `Order.paymentIntentId` to correlate webhooks/captures. |

## User Roles
1. **admin** — everything, including user management, orders, coupons, settings, all CMS modules.
2. **instructor** — create/manage own courses and lessons; sees dashboard and enrollments scoped to own courses.
3. **student** — cart/checkout, enrolled courses, progress, reviews, wishlist.
4. **guest** — public GET endpoints only.

---

# 3. TECHNOLOGY STACK

| Layer          | Technology | Purpose |
| -------------- | ---------- | ------- |
| Backend        | Node.js, Express 5.2 (`express@^5`) | HTTP server & routing |
| Database       | MongoDB (via Mongoose 9) | Document store, schemas, hooks, indexes |
| Authentication | JWT (`jsonwebtoken` 9) + HttpOnly cookie (`cookie-parser`) | Sessions & roles |
| Validation     | Zod 4 | Request body validation middleware |
| File uploads   | Multer 2 (disk storage) | Local uploads with MIME allow-lists |
| Email          | Nodemailer 9 (SMTP) | OTP, password-reset, contact notifications |
| Payments       | axios → Paymob Intentions API + PayPal Orders API | Online checkout |
| Logging        | Winston + morgan | Application & request logs |
| Security (declared) | helmet, cors, hpp, compression, express-rate-limit | Mostly configured-off (see §16) |
| Utility        | uuid, slugify, ms, http-status-codes, validator, mime-types | Helpers |
| Dev tooling    | nodemon | `npm run dev` reload |

### Why these choices
- **Mongoose + MongoDB** — rapid iteration for a bilingual CMS; document-per-feature maps directly to a multilingual data model and supports `refPath` polymorphic cart items.
- **Express 5** — async error propagation, modern router semantics.
- **Zod** — schema-first validation with per-field bilingual error messages; `.strict()` blocks mass-assignment of unknown fields.
- **Multer disk storage** — simple static `/uploads` serving; Cloudinary env placeholders exist but are unused.
- **Paymob/PayPal via raw axios** — the market-specific (Egypt) payment providers chosen by the business, with no SDK wrapper.
- **Winston + morgan** — console-based structured logging for dev and prod.

---

# 4. PROJECT STRUCTURE

```text
backend/
├── index.js                        # Entry: connect DB, create HTTP server, process guards
├── package.json
├── package-lock.json
├── .env                            # ⚠️ Committed secrets — see §16
├── .gitignore
└── src/
    ├── app.js                      # Express app assembly (middleware order)
    ├── config/
    │   ├── env.js                  # Central env-variable accessor
    │   ├── languages.js            # SUPPORTED_LANGUAGES = ['ar','en'], default 'ar'
    │   ├── logger.js               # Winston logger (console transport)
    │   └── multer.js               # Multer storage, MIME allow-lists, file filter
    ├── database/
    │   ├── connectDB.js            # Mongoose connect (+ DNS override)
    │   ├── seed.js                 # Full demo dataset seeder
    │   └── seedAdmin.js            # Admin users seeder
    ├── locales/
    │   ├── ar.js                   # Arabic static strings
    │   └── en.js                   # English static strings
    ├── middlewares/
    │   ├── auth.js                 # isAuthenticatedUser, authorizeRoles
    │   ├── catchAsync.js           # async error wrapper
    │   ├── configureLogger.js      # morgan in dev only
    │   ├── configureParsers.js     # json, urlencoded, cookieParser
    │   ├── configureSecurity.js    # cors (helmet/rateLimit/hpp/compression commented out)
    │   ├── configureStaticFiles.js # express.static for /uploads
    │   ├── errorMiddleware.js      # global error handler (duplicate/validation/cast/JWT/Multer)
    │   ├── language.js             # Accept-Language / ?lang resolution → req.t
    │   ├── notFound.js             # 404 handler
    │   ├── parseNestedFormData.js  # flattens `a.b.c` multipart keys into nested objects
    │   ├── uploadMultiple.js       # multer .fields() wrapper
    │   ├── uploadSingle.js         # multer .single() wrapper
    │   └── validate.js             # Zod safeParse → req.body replacement
    ├── modules/                    # 25 feature modules (see §5)
    │   ├── auth/                   # signup/login/OTP/forgot/reset + validators + otp.service
    │   ├── blog/  cart/  category/  choose-us/  contact/  coupon/
    │   ├── course/  course-details/  dashboard/  enrollment/  hero/
    │   ├── journey/  lesson/  order/  partners/  portfolio/  products/
    │   ├── progress/  review/  services/  settings/  team/  timeline/
    │   ├── users/  wishlist/
    │   └── (order/gateways/paymob.service.js, paypal.service.js)
    ├── routes/
    │   └── index.js                # Mounts all module routers under /api
    ├── templates/                  # HTML email templates
    │   ├── verifyEmailTemplate.js
    │   ├── forgotPasswordTemplate.js
    │   └── contactNotificationTemplate.js
    ├── uploads/                    # Local file storage (git-ignored, but present in repo)
    │   ├── users/ services/ products/ categories/ courses/ lessons/ ...
    └── utils/
        ├── ApiError.js             # Operational error class
        ├── ApiFeatures.js          # Query builder
        ├── crudFactory.js          # Generic CRUD handlers
        ├── deleteFile.js           # Remove uploaded file by URL
        ├── generateFileName.js     # uuid + slug file naming
        ├── generateFileUrl.js      # relative path → absolute URL
        ├── generateSlug.js         # slugify helper
        ├── handleUploadedFiles.js  # req.file(s) → req.body, deletes old files
        ├── sendEmail.js            # Nodemailer transporter
        ├── sendResponse.js         # Envelope helper
        ├── sendToken.js            # JWT cookie + login response
        ├── t.js                    # locale lookup
        ├── translate.js            # pick language from {ar,en}
        ├── translateDocument.js    # flatten one doc + _translations
        └── translateDocuments.js   # map translateDocument
```

### Folder responsibilities
- **`config/`** — all wiring-level configuration: env access, Multer, Winston, supported languages. Everything else reads from here.
- **`middlewares/`** — cross-cutting concerns. `auth.js` is the security backbone; `validate.js` replaces `req.body` with Zod-parsed data.
- **`modules/`** — domain code, one folder per bounded feature. Controllers are thin; business logic sits in `*.service.js` where present.
- **`utils/`** — shared, framework-independent helpers (no Express dependency except where they wrap it).
- **`database/`** — connection + seed scripts (run via `npm run seed` / `npm run seed:admin`).
- **`templates/`** — inline-HTML email templates (no template engine dependency).

---

# 5. ARCHITECTURE ANALYSIS

## Pattern: Layered Monolith (Feature-Modular)
The app uses a **layered architecture inside feature modules** with a thin global routing layer:

```text
request
   │
   ▼
src/app.js  (middleware chain)
   │
   ▼
src/routes/index.js   (mounts modules)
   │
   ▼
modules/<feature>/routes.js   (URL → handler, auth guards, uploads, validation)
   │
   ▼
modules/<feature>/controller.js   (HTTP concerns: status codes, envelopes)
   │
   ▼
modules/<feature>/service.js   (business logic — optional, used where complex)
   │
   ▼
modules/<feature>/model.js   (Mongoose schema, hooks, indexes)
   │
   ▼
MongoDB
```

- **No inversion-of-control container or dependency injection** — modules require each other's models directly (e.g. `order/orders.controller.js` requires `cart`, `product`, `course`, `enrollment` models).
- **Generic reuse** via `crudFactory` + `ApiFeatures` keeps most controllers ~10–60 lines.
- **Domain coupling note:** `course-details`, `dashboard`, `progress`, `review`, and `order` modules reach into many sibling models. That is the heaviest cross-module coupling in the system.

## Architecture diagram

```text
┌────────────────────────────────────────────────────────────┐
│  PUBLIC (no auth)   │  AUTHENTICATED (cookie/Bearer JWT)   │
│  GET courses/blogs  │  └─ student / instructor / admin     │
│  GET settings/hero  │     role-guarded via authorizeRoles  │
│  POST auth/contact  │                                     │
└──────────────┬─────────────────────────────────────────────┘
               ▼
┌────────────────────────────────────────────────────────────┐
│               ROUTER INDEX (src/routes/index.js)           │
│ /auth /users /courses /lessons /progress /categories       │
│ /products /coupons /cart /orders /enrollments /reviews     │
│ /wishlist /settings /dashboard /heroes /blogs /contact     │
│ /services /portfolios /team /partners /journey /timeline   │
│ /choose /course                                             │
└──────────────┬─────────────────────────────────────────────┘
               ▼
┌────────────────────────────────────────────────────────────┐
│  SHARED CORE                                            │
│  crudFactory  •  ApiFeatures  •  ApiError  •  sendResponse │
│  translate*   •  handleUploadedFiles • sendToken          │
│  validate (Zod)  •  uploadSingle/Multiple (Multer)        │
└──────────────┬─────────────────────────────────────────────┘
               ▼
┌────────────────────────────────────────────────────────────┐
│  DOMAIN MODELS (Mongoose)                                  │
│ User Course Lesson Category Product Coupon Cart Order      │
│ Enrollment Progress Review Settings Hero Blog Service      │
│ Portfolio Team Partner Contact Timeline Journey ChooseUs   │
└──────────────┬─────────────────────────────────────────────┘
               ▼
┌────────────────────────────────────────────────────────────┐
│  INFRASTRUCTURE  Mongo  •  fs/uploads  •  SMTP (Nodemailer)│
│                  Paymob API  •  PayPal API                 │
└────────────────────────────────────────────────────────────┘
```

## Service layer distribution
| Module | Has `service.js`? | Content |
| ------ | ----------------- | ------- |
| auth | `otp.service.js` | OTP verify/resend logic |
| order | `gateways/*.service.js` | Paymob intention, PayPal order/capture |
| progress | `progress.service.js` | Lesson progress, course %, continue-watching |
| review | `review.service.js` | Enrollment check, rating recalculation |
| dashboard | `dashboard.service.js` | All aggregation queries |
| course-details | `course-details.service.js` | Course detail aggregation |
| hero | `hero.service.js` | CRUD + public-by-page lookup |
| settings | `settings.service.js` | Singleton init/update |

---

# 6. REQUEST LIFECYCLE

Example: `GET /api/courses/:id` (public)

```text
Client
  │  fetch('/api/courses/<id>', { headers: { 'Accept-Language': 'ar' } })
  ▼
app.use(configureSecurity)        cors: allows CLIENT_URL with credentials
  ▼
app.use(configureParsers)         express.json / urlencoded / cookieParser
  ▼
app.use(configureStaticFiles)     /uploads → static (not used by this route)
  ▼
app.use(configureLogger)          morgan 'dev' (dev only)
  ▼
app.use(language)                 lang='ar' → req.language='ar', req.t=translater
  ▼
app.use('/api', routes)           router mounted
  ▼
routes/index.js  →  course.routes.js
  ▼
course.controller.getCourse  →  crudFactory.getOne(Course, { translatableFields, populate })
  ▼
Mongoose: Course.findById(id).populate('category').populate('instructor')
  ▼
translateDocument(course, 'ar', ['title','description'])
  │   title.ar, description.ar returned; full {ar,en} kept under _translations
  ▼
sendResponse(res, { statusCode:200, success:true, message:'...', data })
  ▼
JSON response to client
```

Authenticated request example: `POST /api/orders/checkout-paymob/:cartId`

```text
Client (sends Qalam_Token cookie)
  ▼
parsers (cookie parsed) → language → routes
  ▼
orders.routes.js  router.use(isAuthenticatedUser)   → middleware/auth.js
      cookie Qalam_Token → jwt.verify(secret) → User.findById(decoded.id)
      → checks isActive → req.user = user
  ▼
router.post('/checkout-paymob/:cartId', authorizeRoles('student'), createPaymobCheckoutSession)
  ▼
orders.controller.js
  ├─ load Cart by :cartId (populate products.item)
  ├─ pick payment channel by paymentType (card/wallet/fawry)
  ├─ create pending Order (isPaid:false)
  ├─ call paymob.service.createPaymobIntention(...)   [outbound HTTP → Paymob]
  ├─ save paymentIntentId = intention_order_id
  └─ respond { client_secret, redirect_url, orderId }
  ▼
Later: Paymob posts webhook → /api/orders/webhook/paymob (public)
  └─ handleOrderSuccess: mark paid, decrement stock, +1 totalStudents,
     create Enrollments, delete cart
```

Error path: any thrown `ApiError` or async rejection flows to `errorMiddleware.js`, which normalizes it (duplicate key, validation, cast, JWT, Multer) into the `sendResponse` envelope.

---

# 7. FEATURE INVENTORY

## 7.1 Authentication & Account Verification

### Purpose
Register, verify email, log in/out, recover passwords.
### User Role
Guest → Student (admins/instructors are created by seeding/admin tools).
### Entry Points
`POST /api/auth/signup`, `/login`, `/logout`, `/refresh-token`, `/verify-otp`, `/resend-otp`, `/forgot-password`, `PATCH /api/auth/reset-password`.
### Business Value
Secure account lifecycle without an external identity provider.
### Internal Flow
```text
signup
  → validate(signupSchema)
  → User.create (bcrypt hash via pre-save hook)
  → generateOtp('email_verification') → save
  → sendEmail(verifyEmailTemplate) with 6-digit OTP
  → respond "otp sent"

verify-otp
  → validate
  → otp.service.verifyOtp: find by {email, otpPurpose, otpExpires:{$gt:now}}
    → bcrypt.compare(otp, hashed) → isVerified=true → clear OTP fields
  → if purpose=forgot_password: generate resetPasswordToken (32-byte hex, sha256-hashed)
    and return plain token to client

login
  → find user (+password) → must be verified → comparePassword
  → sendToken: sign JWT {id} → set cookie Qalam_Token (httpOnly, sameSite strict)
  → respond { user, sessionExpiresAt, Qalam_Token }

forgot-password  → resendOtp(email,'forgot_password') → email OTP
reset-password   → sha256(token) lookup → update password → clear OTP fields
```
### Files Involved
`modules/auth/*`, `modules/users/user.model.js`, `utils/sendToken.js`, `utils/sendEmail.js`, `templates/*`, `middlewares/validate.js`.
### Database Tables
`users` (otp*, resetPasswordToken*, isVerified).
### APIs Used
Internal only; outbound SMTP email.
### Validation Rules
Zod schemas in `modules/auth/validators/` (email format, phone regex `^\+?[1-9]\d{9,14}$`, password regex `(?=.*[A-Za-z])(?=.*\d)`, OTP exactly 6 digits).
### Security Rules
Password hashed with bcrypt (salt 10) and `select:false`; OTP hashed with bcrypt; OTP 10-min expiry, 1-min resend throttle; reset token single-use.
### Edge Cases
- Resend throttled (`otpResendTimeout` → 429 with seconds-left message).
- Already-verified user blocked from re-verification.
- `refresh-token` endpoint is **broken** (references removed `env.jwtRefreshSecret` / `generateAccessToken`) — see §18.

## 7.2 Users & Profile

### Purpose
Manage personal data, avatar, theme mode, password, admin role/status.
### User Role
Any authenticated user (profile), admin (user management).
### Entry Points
`GET /api/users/me`, `PATCH /api/users/:id`, `GET /api/users`, `GET /api/users/admin`, `GET/PATCH /api/users/:id/admin`, `GET /api/users/theme`, `PATCH /api/users/theme/toggle`, `PUT /api/users/:id/change-password`, `DELETE /api/users/:id`.
### Internal Flow
```text
me            → isAuthenticatedUser → return user (no password)
update        → multer avatar → zod → crudFactory.updateOne
change-password → verify currentPassword → ensure new ≠ current → bcrypt re-hash
admin update  → admin-only → change role/isActive with self-guards
theme         → read/toggle user.themeMode
```
### Files Involved
`modules/users/*`, `middlewares/auth.js`, `middlewares/uploadSingle.js`.
### Database Tables
`users`.
### Validation Rules
`updateUserSchema` (first/last name 2–30, phone regex, bio ≤ 500); `changePasswordSchema` (current+new ≥ 8, confirm); `adminUser.schema` (role enum, isActive bool — **not wired into the route**).
### Security Rules
`authorizeRoles('admin')` for delete/admin-update; `isAuthenticatedUser` for the rest.
### Edge Cases / Findings
- `PATCH /api/users/:id` only requires authentication — **any logged-in user can edit any other user's profile (IDOR)**.
- `GET /api/users` and `GET /api/users/:id` are open to any authenticated user (information disclosure).
- Admin self-guards: cannot deactivate self, cannot demote self.

## 7.3 Categories

### Purpose
Typed taxonomy (`course`, `product`, `blog`, `portfolio`, `service`) used across the catalog.
### User Role
Public read; admin write.
### Entry Points
`GET/POST /api/categories`, `GET/PATCH/DELETE /api/categories/:id`.
### Internal Flow
Factory CRUD + auto slug (from `title.en`) + auto `sortOrder` + reorder logic on update.
### Database Tables
`categories` (unique index on `{type, slug}`).
### Validation Rules
Bilingual title 2–100; description ≤ 1000; `type` enum; `isActive` boolean coercion.
### Files Involved
`modules/category/*`.

## 7.4 Courses

### Purpose
The core sellable asset: bilingual course records with pricing, media, level, stats.
### User Role
Public read; admin/instructor write.
### Entry Points
`GET/POST /api/courses`, `GET/PATCH/DELETE /api/courses/:id`.
### Internal Flow
Factory CRUD; `beforeCreate` forces `isPublished=false`, `isFeatured=false`; slug from `title.en`; discount ≤ price validated in pre-save and schema.
### Database Tables
`courses`.
### Files Involved
`modules/course/*`.
### Security Rules
Create/update/delete require `admin` or `instructor` role.
### Edge Cases
- `PATCH` allows toggling `isPublished`/`isFeatured` (string→bool via Zod preprocess).
- `instructor` is a required free-form `User` reference — no ownership enforcement on who sets the instructor.

## 7.5 Course Details (aggregate page)

### Purpose
Single endpoint that returns everything the course-details page needs: course + published lessons (with `canAccess`), latest reviews, and the requesting user's enrollment/progress.
### User Role
Authenticated (requires login).
### Entry Point
`GET /api/course/:slug/details`.
### Internal Flow
`course-details.service.getCourseDetails` → course by `{slug, isPublished}` → published lessons sorted → 5 latest reviews → enrollment for user → `canAccess = enrolled || lesson.isPreview`.
### Files Involved
`modules/course-details/*`, `modules/course`, `lesson`, `review`, `enrollment`.
### Edge Cases
- Requires authentication even for preview browsing.
- `isCompleted` is hardcoded `false` per lesson (not wired to `Progress`).

## 7.6 Lessons

### Purpose
Course content: videos, thumbnails, attachments, ordering, preview/publish flags.
### User Role
Public read; admin/instructor write.
### Entry Points
`GET/POST /api/lessons`, `GET/PATCH/DELETE /api/lessons/:id`.
### Internal Flow
Factory CRUD; `beforeCreate` computes `sortOrder = lessonsCount+1` and marks the **first lesson `isPreview=true`**; `beforeUpdate` implements positional reorder within a course.
### Database Tables
`lessons` (compound indexes on course+sortOrder, course+isPublished).
### Files Involved
`modules/lesson/*`.

## 7.7 Progress Tracking

### Purpose
Per-lesson watch state and aggregate course completion.
### User Role
Student only.
### Entry Points
`POST /api/progress`, `GET /api/progress/course/:courseId`, `GET /api/progress/continue-watching`.
### Internal Flow
`progress.service.updateLessonProgress` validates lesson + enrollment → upsert `Progress` (unique user+lesson) → recompute enrollment `progress %` and `isCompleted` from published-lesson totals.
### Database Tables
`progresses`, `enrollments`.
### Files Involved
`modules/progress/*`.
### Edge Cases
- `completedAt` logic references `progress` before declaration (always `null` → completion date resets to now; see §18).

## 7.8 Enrollment

### Purpose
Records "who bought which course", drives "My Courses", instructor filtering, and course stats.
### User Role
Student (own), instructor (own courses), admin (all).
### Entry Points
`GET /api/enrollments/my-courses`, `/my-products`, `GET /api/enrollments`, `/api/enrollments/:id`.
### Internal Flow
`getAllEnrollments` scopes to the instructor's courses; `getMyEnrollments` scopes to the user; `getMyPurchasedProducts` extracts Products from paid orders.
### Database Tables
`enrollments` (unique `{user, course}`), `orders`.
### Files Involved
`modules/enrollment/*`.

## 7.9 Products (digital store)

### Purpose
Digital goods (PDFs) with image, price, discount, stock.
### User Role
Public read; admin write.
### Entry Points
`GET/POST /api/products`, `GET/PATCH/DELETE /api/products/:id`.
### Files Involved
`modules/products/*`.
### Findings
- Create route uploads `image`+`pdf`; **PATCH route restricts fileType to `"image"`** — updating a product's PDF fails (Multer rejects the PDF).

## 7.10 Cart

### Purpose
Session cart supporting both Products and Courses (polymorphic `refPath`).
### User Role
Student only.
### Entry Points
`POST/GET/DELETE /api/cart`, `PATCH /api/cart/apply-coupon`, `DELETE /api/cart/remove-coupon`, `PUT/DELETE /api/cart/:itemId`.
### Internal Flow
Add item (course counts capped at 1) → recalc totals → coupons apply percentage discount stored in `totalAfterDiscount`.
### Database Tables
`carts`.
### Files Involved
`modules/cart/*`.
### Edge Cases / Findings
- `applyCouponToCart` crashes if the user has **no cart** (`cart.products` on null).
- `calcTotalCartPrice` clears coupon/discount on every mutation (remove-coupon sets null then unsets).
- Item `color` field is accepted in the body but unused.

## 7.11 Coupons

### Purpose
Percentage discount codes with expiry.
### User Role
`admin`/`instructor` (per route), applied by students at checkout.
### Entry Points
`GET/POST /api/coupons`, `GET/PATCH/DELETE /api/coupons/:id`.
### Database Tables
`coupons` (unique `name`, uppercase).
### Files Involved
`modules/coupon/*`.
### Findings
- Controller comments say "Admin/Manager" but routes allow `instructor` too.

## 7.12 Orders & Checkout

### Purpose
Create orders (cash / Paymob / PayPal), capture payments, fulfill purchases (stock, enrollments), expose order history.
### User Role
Student (create/view own), instructor/admin (view).
### Entry Points
- `POST /api/orders/:cartId` — cash order
- `POST /api/orders/checkout-paymob/:cartId` — Paymob intention (`paymentType`: card/wallet/fawry)
- `POST /api/orders/checkout-paypal/:cartId` — PayPal order (EGP→USD at fixed /50)
- `POST /api/orders/paypal/success` — capture PayPal
- `POST /api/orders/webhook/paymob` — **public** Paymob webhook
- `GET /api/orders`, `GET /api/orders/:id`, `PATCH /api/orders/:id/cancel`
### Internal Flow
```text
checkout → create pending Order → gateway call → store intent id
                                      │
                                      ▼
webhook/capture success → handleOrderSuccess(orderId):
   isPaid=true, status=paid, paidAt=now
   → Product stock -= count, totalSales += count
   → Course totalStudents += 1
   → Enrollment.create (per course item)
   → delete user's Cart
```
### Database Tables
`orders`, `carts`, `products`, `courses`, `enrollments`.
### Files Involved
`modules/order/*`, `modules/order/gateways/*`.
### Security Rules
Webhook is intentionally unauthenticated (must remain so), but **no HMAC signature verification** is implemented (`PAYMOB_HMAC` unused).
### Findings
- `filterOrdersForLoggedUser` checks `req.user.role === 'user'` but the enum is `student` → students can list **all** orders, and the factory ignores `req.filterObject` anyway.
- `orders.routes.js` imports `updateOrderToPaid`/`updateOrderToDelivered` that **do not exist** in the controller (dead imports).

## 7.13 Reviews & Ratings

### Purpose
Enrollment-gated course reviews with live average-rating rollup.
### User Role
Public read; students write; student/admin update/delete.
### Entry Points
`GET/POST /api/reviews`, `GET/PATCH/DELETE /api/reviews/:id`.
### Internal Flow
`review.service.checkReviewPermission` (course exists → user enrolled → not already reviewed) → create → `calculateCourseRatings` aggregate updates `Course.averageRating/totalReviews`.
### Database Tables
`reviews` (unique `{user, course}`), `courses`.
### Files Involved
`modules/review/*`.
### Findings
- Update/delete have **no ownership check** — any student/admin can modify/delete anyone's review.

## 7.14 Wishlist

### Purpose
Save courses for later.
### User Role
Authenticated user.
### Entry Points
`POST /api/wishlist/course`, `GET /api/wishlist/course`, `DELETE /api/wishlist/course/:courseId`.
### Database Tables
`users.wishlist` (array of Course refs).
### Files Involved
`modules/wishlist/*`.
### Findings
- `addCourseToWishlist` returns `Course.findById(user.wishlist)` (passing an **array**) — the `data.course` payload is incorrect; no existence check on `courseId`.

## 7.15 Dashboards

### Purpose
Role-specific KPI dashboards.
### User Role
admin / instructor / student (guarded).
### Entry Points
`GET /api/dashboard/admin`, `/instructor`, `/student`.
### Internal Flow
`dashboard.service.js` — parallel `Promise.all` counts, aggregates (revenue by month, orders by status, enrollments by month), top courses/instructors, latest records.
### Files Involved
`modules/dashboard/*`.
### Findings
- `getTopInstructors` uses `$sum: "$courses.totalStudents"` over an array field — brittle aggregation (see §18).

## 7.16 Settings

### Purpose
Singleton site configuration (branding, contact, social, SEO, currency, theme colors, registration/maintenance flags).
### User Role
Public read; admin write.
### Entry Points
`GET/PATCH /api/settings`, `GET/PATCH /api/settings/theme`.
### Internal Flow
`settings.service.initializeSettings` upserts the singleton; update merges fields.
### Files Involved
`modules/settings/*`.

## 7.17 Hero sections

### Purpose
Per-page hero banners (title/subtitle/description, images/video, CTA buttons, layout).
### User Role
Public read; admin write.
### Entry Points
`GET /api/heroes/page/:page` (public), `GET/POST /api/heroes`, `GET/PATCH/DELETE /api/heroes/:id`.
### Files Involved
`modules/hero/*`.

## 7.18 Blog

### Purpose
Articles with bilingual content, gallery, tags, SEO, reading time, featured/published flags.
### User Role
Public read; admin write.
### Entry Points
`GET/POST /api/blogs`, `GET/PATCH/DELETE /api/blogs/:id`.
### Files Involved
`modules/blog/*`.
### Findings
- Route uploads field `"cover"`, but the model/controller expect `featuredImage` — uploaded images are stored to disk but **never attached to the document**.

## 7.19 Contact

### Purpose
Public contact form that stores messages and emails the support address.
### User Role
Public create; admin read/reply.
### Entry Points
`POST /api/contact` (public), `GET /api/contact`, `GET/PATCH/DELETE /api/contact/:id` (admin).
### Files Involved
`modules/contact/*`.

## 7.20 CMS marketing modules
- **Services** (`/api/services`) — bilingual service cards, image.
- **Portfolios** (`/api/portfolios`) — projects with URLs/technologies, category.
- **Team** (`/api/team`) — user + position.
- **Partners** (`/api/partners`) — logo, URL.
- **Journey** (`/api/journey`) — singleton "our journey" block (image + badge).
- **Timeline** (`/api/timeline`) — year-keyed milestones (unique year).
- **Choose Us** (`/api/choose`) — singleton "why choose us" block.

All follow the same pattern: public GETs, admin-only writes, factory CRUD, translated fields.

---

# 8. DATABASE DOCUMENTATION

## 8.1 Entity relationship overview

```text
USER (1) ──── (N) ORDER                USER (1) ──── (1) CART
USER (1) ──── (N) ENROLLMENT (N) ──── (1) COURSE
USER (1) ──── (N) REVIEW (N) ──── (1) COURSE
USER (1) ──── (N) PROGRESS (N) ──── (1) LESSON
USER (1) ──── (N) COURSE (as instructor)
COURSE (1) ── (N) LESSON
CATEGORY (1) ── (N) COURSE / PRODUCT / BLOG / PORTFOLIO / SERVICE
ORDER (1) ──── (N) CART_ITEM → refPath {Product|Course}
COUPON (1) ──── (1) CART (by name)
SETTINGS / JOURNEY / CHOOSE_US : singletons
```

## 8.2 Collection reference

### users
| Column | Type | Description |
| ------ | ---- | ----------- |
| firstName, lastName | String (req) | Display name |
| slug | String, unique, index | `slugify(firstName lastName)-id` |
| email | String, unique | Lowercased |
| phone | String, unique | International format |
| country, city, address | String (req) | Location |
| password | String (req, `select:false`) | bcrypt hash |
| avatar | String | Uploaded URL |
| bio | String ≤500 | About text |
| wishlist | [ObjectId→Course] | Saved courses |
| themeMode | enum light/dark | UI theme (default dark) |
| role | enum admin/instructor/student | default student |
| isVerified | Boolean | Email-verified |
| isActive | Boolean, index | Soft-disabled |
| otp, otpExpires, otpResendTimeout, otpPurpose | (select:false) | Email verification |
| resetPasswordToken, resetPasswordExpires | (select:false) | Password reset |

### categories
| Column | Type | Description |
| ------ | ---- | ----------- |
| title, description | `{ar,en}` | Bilingual |
| slug | String | From title.en |
| image | String | Upload |
| type | enum portfolio/service/course/blog/product | Taxonomy |
| sortOrder | Number | Manual ordering |
| isActive | Boolean | default true |

Unique index `{type, slug}`; indexes on title, type+isActive.

### courses
| Column | Type | Description |
| ------ | ---- | ----------- |
| title, description | `{ar,en}` (req) | Bilingual |
| slug | String, unique | From title.en |
| thumbnail, trailerVideo | String | Media URLs |
| category | ObjectId→Category (req, index) | Taxonomy |
| instructor | ObjectId→User (req, index) | Owner |
| level | enum beginner/intermediate/advanced | Difficulty |
| language | enum arabic/english | default arabic |
| duration | Number (min) | Minutes |
| price | Number (req, ≥0) | Selling price |
| discountPrice | Number (≥0) | Promo price |
| requirements, objectives, tags | [String] | Lists |
| isPublished, isFeatured | Boolean | flags |
| averageRating, totalReviews, totalStudents, totalLessons | Number | Denormalized stats |

Compound index `{category, instructor, isPublished}`.

### lessons
| Column | Type | Description |
| ------ | ---- | ----------- |
| course | ObjectId→Course (req, index) | Parent |
| title, description | `{ar,en}` | Bilingual |
| video, attachment, thumbnail | String | Media |
| duration | Number (min) | Minutes |
| sortOrder | Number, index | Ordering |
| isPreview | Boolean | Free preview |
| isPublished | Boolean | Visibility |

Indexes `{course, sortOrder}`, `{course, isPublished}`.

### products
| Column | Type | Description |
| ------ | ---- | ----------- |
| title, description | `{ar,en}` (req) | Bilingual |
| slug | String, unique, index | From title.en |
| image, pdf | String | Media |
| category | ObjectId→Category (req) | Taxonomy |
| price, discountPrice, stock | Number | Pricing/inventory |
| averageRating, totalReviews, totalSales | Number | Stats |
| isPublished, isFeatured | Boolean | flags |

### coupons
| Column | Type | Description |
| ------ | ---- | ----------- |
| name | String, unique, uppercase | Code |
| expire | Date (req) | Expiry |
| discount | Number 1–100 | Percentage |

### carts
| Column | Type | Description |
| ------ | ---- | ----------- |
| products[].item | ObjectId, `refPath:'products.itemType'` | Polymorphic ref |
| products[].itemType | enum Product/Course | Discriminator |
| products[].count | Number ≥1 | Qty |
| products[].price | Number | Snapshot |
| totalCartPrice, totalAfterDiscount | Number | Totals |
| cartOwner | ObjectId→User (req, index) | Owner |
| coupon | String | Applied coupon name |

### orders
| Column | Type | Description |
| ------ | ---- | ----------- |
| user | ObjectId→User (req) | Buyer |
| cartItems[].item | ObjectId `refPath:'cartItems.itemType'` | Snapshot |
| cartItems[].itemType | enum Product/Course | Discriminator |
| cartItems[].count, price | Number | Snapshot |
| shippingAddress | {details, phone, city, postalCode} | Delivery |
| taxPrice, shippingPrice, totalOrderPrice | Number | Totals |
| paymentMethodType | enum card/wallet/fawry/cash/paypal | Channel |
| paymentIntentId | String | Paymob/PayPal ref |
| isPaid | Boolean | Paid flag |
| status | enum pending/paid/cancelled | Lifecycle |
| paidAt | Date | Paid timestamp |

### enrollments
| Column | Type | Description |
| ------ | ---- | ----------- |
| user | ObjectId→User (req, index) | Student |
| course | ObjectId→Course (req, index) | Course |
| order | ObjectId→Order (req) | Purchase |
| progress | Number 0–100 | Completion % |
| isCompleted | Boolean | 100% |

Unique index `{user, course}`; auto-populates user/course/order.

### progresses
| Column | Type | Description |
| ------ | ---- | ----------- |
| user | ObjectId→User (req, index) | Student |
| course | ObjectId→Course (req, index) | Parent course |
| lesson | ObjectId→Lesson (req, index) | Lesson |
| watchedSeconds, lastPosition | Number | Watch state |
| completed | Boolean | Lesson done |
| completedAt, lastWatchedAt | Date | Timestamps |

Unique index `{user, lesson}`.

### reviews
| Column | Type | Description |
| ------ | ---- | ----------- |
| course | ObjectId→Course (req, index) | Target |
| user | ObjectId→User (req, index) | Author |
| rating | Number 1–5 | Score |
| comment | String ≤1000 | Text |

Unique index `{user, course}`.

### Content/CMS collections
- **heroes** — one per `page` (unique enum list), bilingual title/subtitle/description/buttons, image/backgroundImage/video, layout/textAlignment, isActive, sortOrder, SEO.
- **blogs** — bilingual title/excerpt/content/seoTitle/seoDescription, featuredImage, gallery[], category, tags[{ar,en}], user, readingTime (auto), views, isFeatured, isPublished, publishedAt. Text + unique slug indexes.
- **services / portfolios / partners / team / timeline** — bilingual fields (where applicable), image/URLs, sortOrder, isActive, createdBy.
- **settings** — singleton, site/branding/contact/social/SEO/theme (light/dark color palettes).
- **journey / chooseus** — singletons with bilingual text + image.

## 8.3 Schema hooks (denormalization)
| Model | Hook | Effect |
| ----- | ---- | ------ |
| User | pre validate | auto slug |
| User | pre save | bcrypt password hash |
| Course / Product / Blog / Service / Portfolio / Partner / Category | pre validate | auto slug |
| Course / Product | pre save | reject discountPrice > price |
| Blog | pre save | auto readingTime (words/200) |
| Order / Enrollment | pre find | auto populate |

---

# 9. API DOCUMENTATION

> Base URL: `http://localhost:5000/api` (see `BASE_URL`). All responses use the envelope `{ success, message, data, meta?, errors? }`. `meta` appears on list endpoints (`total`, `limit`, `skip`, `hasMore`). "Public" = no auth. "Auth" = `Qalam_Token` cookie or `Authorization: Bearer <token>`.

## Auth
| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| POST | /auth/signup | Public | Create account + email OTP |
| POST | /auth/verify-otp | Public | Verify OTP (`purpose`: email_verification / forgot_password) |
| POST | /auth/resend-otp | Public | Resend OTP (60s throttle) |
| POST | /auth/login | Public | Login → JWT cookie + token in body |
| POST | /auth/logout | Public | Clear cookie |
| POST | /auth/refresh-token | Public | ⚠️ Broken (see §18) |
| POST | /auth/forgot-password | Public | Send password-reset OTP |
| PATCH | /auth/reset-password | Public | `{token,password,confirmPassword}` |

## Users
| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET | /users/me | Auth | Current user |
| GET | /users/theme | Auth | Theme mode |
| PATCH | /users/theme/toggle | Auth | Toggle light/dark |
| GET | /users | Auth | List users (search firstName/lastName/email/role) |
| GET | /users/admin | Admin | List all users except current admin |
| GET | /users/:id | Auth | One user |
| PATCH | /users/:id | Auth | Update profile (+ avatar upload) |
| PUT | /users/:id/change-password | Auth | Change password |
| PATCH | /users/:id/admin | Admin | Update role / isActive |
| DELETE | /users/:id | Admin | Delete user |

## Catalog & LMS
| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET/POST | /categories[/] | POST: Admin | Categories CRUD (image upload) |
| GET/PATCH/DELETE | /categories/:id | PATCH/DELETE: Admin | |
| GET/POST | /courses[/] | POST: Admin/Instructor | Courses CRUD |
| GET/PATCH/DELETE | /courses/:id | PATCH/DELETE: Admin/Instructor | |
| GET | /course/:slug/details | Auth | Aggregated course detail |
| GET/POST | /lessons[/] | POST: Admin/Instructor | Lessons CRUD |
| GET/PATCH/DELETE | /lessons/:id | PATCH/DELETE: Admin/Instructor | |
| POST | /progress | Student | Update lesson progress |
| GET | /progress/course/:courseId | Student | Course progress |
| GET | /progress/continue-watching | Student | Continue-watching list |
| GET/POST | /reviews[/] | POST: Student | Reviews (public read) |
| GET/PATCH/DELETE | /reviews/:id | PATCH/DELETE: Student/Admin | |
| GET | /enrollments/my-courses | Student | My courses |
| GET | /enrollments/my-products | Student | Purchased products |
| GET | /enrollments[/:id] | Instructor/Admin | All enrollments (instructor-scoped) |

## Store & Payments
| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET/POST | /products[/] | POST: Admin | Products CRUD (image + pdf) |
| GET/PATCH/DELETE | /products/:id | PATCH/DELETE: Admin | ⚠️ PATCH blocks PDF |
| GET/POST | /coupons[/] | Admin/Instructor | Coupons CRUD |
| GET/PATCH/DELETE | /coupons/:id | Admin/Instructor | |
| POST/GET/DELETE | /cart[/] | Student | Add/get/clear cart |
| PATCH | /cart/apply-coupon | Student | Apply coupon |
| DELETE | /cart/remove-coupon | Student | Remove coupon |
| PUT/DELETE | /cart/:itemId | Student | Update count / remove item |
| POST | /orders/:cartId | Student | Create cash order |
| POST | /orders/checkout-paymob/:cartId | Student | Paymob intention |
| POST | /orders/checkout-paypal/:cartId | Student | PayPal order |
| POST | /orders/paypal/success | Student | Capture PayPal |
| POST | /orders/webhook/paymob | **Public** | Paymob webhook |
| GET | /orders[/:id] | Auth (roles) | Orders list/detail |
| PATCH | /orders/:id/cancel | Student | Cancel pending order |
| POST/GET | /wishlist/course[/] | Auth | Add/get wishlist |
| DELETE | /wishlist/course/:courseId | Auth | Remove wishlist |

## CMS & Platform
| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET/POST | /services[/] | POST: Admin | Services CRUD |
| GET/PATCH/DELETE | /services/:id | PATCH/DELETE: Admin | |
| GET/POST | /portfolios[/] | POST: Admin | Portfolios CRUD |
| GET/PATCH/DELETE | /portfolios/:id | PATCH/DELETE: Admin | |
| GET/POST | /team[/] | POST: Admin | Team CRUD |
| GET/PATCH/DELETE | /team/:id | PATCH/DELETE: Admin | |
| GET/POST | /partners[/] | POST: Admin | Partners CRUD |
| GET/PATCH/DELETE | /partners/:id | PATCH/DELETE: Admin | |
| GET/POST | /blogs[/] | POST: Admin | Blog CRUD (⚠️ cover field mismatch) |
| GET/PATCH/DELETE | /blogs/:id | PATCH/DELETE: Admin | |
| POST | /contact[/] | Public | Submit contact (emails support) |
| GET/PATCH/DELETE | /contact[/:id] | Admin | Manage messages |
| GET | /heroes/page/:page | Public | Hero for a page |
| GET/POST | /heroes[/] | Admin | Heroes CRUD |
| GET/PATCH/DELETE | /heroes/:id | Admin | |
| GET/PATCH | /journey[/] | PATCH: Admin | Journey singleton |
| GET/POST | /timeline[/] | POST: Admin | Timeline CRUD |
| GET/PATCH/DELETE | /timeline/:id | PATCH/DELETE: Admin | |
| GET/PATCH | /choose[/] | PATCH: Admin | Choose-Us singleton |
| GET/PATCH | /settings[/] | PATCH: Admin | Settings singleton |
| GET/PATCH | /settings/theme | PATCH: Admin | Theme colors |
| GET | /dashboard/admin | Admin | Admin KPIs |
| GET | /dashboard/instructor | Instructor | Instructor KPIs |
| GET | /dashboard/student | Student | Student KPIs |
| GET | /health | Public | Health check `{status:'healthy'}` |

### Example request/response

`POST /api/auth/login`
```json
// Request
{ "email": "student@qalamacademy.com", "password": "Admin@12345" }

// Response 200
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": { "_id": "...", "firstName": "Sara", "role": "student", "...": "..." },
    "sessionExpiresAt": 1810000000000,
    "Qalam_Token": "eyJhbGciOi..."
  }
}
// Set-Cookie: Qalam_Token=eyJhbGciOi...; Path=/; HttpOnly; SameSite=Strict
```

`GET /api/courses?search=web&limit=2`
```json
// Response 200
{
  "success": true,
  "message": "Course fetched successfully",
  "data": [ { "_id": "...", "title": "مقدمة في تطوير الويب", "description": "...", "_translations": { "title": { "ar": "...", "en": "Introduction to Web Development" } } } ],
  "meta": { "total": 1, "limit": 2, "skip": 0, "hasMore": false }
}
```

### Standard error responses
```json
// 401 Unauthorized (no/invalid token)
{ "success": false, "message": "Unauthorized. Please login to access this resource", "errors": null }

// 400 Validation failed
{ "success": false, "message": "Validation failed", "errors": { "email": "Please enter a valid email address" } }

// 409 Duplicate
{ "success": false, "message": "The Email 'x@y.com' already exists", "errors": null }

// 404 Route not found
{ "success": false, "message": "Route /api/unknown not found", "errors": null }
```

### Query-string API (via `ApiFeatures`)
List endpoints accept:
- `search=<keyword>` (module-defined fields)
- filters like `?price[gte]=100`, `?category=<id>`, `?status=paid` (operators `gt gte lt lte in ne`)
- `sort=price,-createdAt`
- `fields=title,price`
- `limit=<n>&skip=<n>` (load-more pagination → `meta.hasMore`)

---

# 10. AUTHENTICATION & AUTHORIZATION

## Login flow
```text
POST /auth/login
   │  validate(loginSchema)
   ▼
User.findOne({email}).select('+password')
   │  user found?  user.isVerified?  comparePassword?
   ▼ (all pass)
sendToken(user, 200)
   ├─ JWT.sign({id}, JWT_SECRET_TOKEN, {expiresIn: JWT_EXPIRE_TOKEN})   [90d]
   ├─ res.cookie('Qalam_Token', token, { httpOnly, sameSite:'strict', secure: prod, expires })
   └─ respond { user, sessionExpiresAt, Qalam_Token }
```

## Registration flow
```text
POST /auth/signup
  → bcrypt-hash password (pre-save)
  → generateOtp('email_verification'): 6-digit OTP, bcrypt-hashed, 10-min expiry, 1-min resend throttle
  → sendEmail(verifyEmailTemplate)
  → response "otp sent to your email for verification"
  → user remains isVerified:false until POST /auth/verify-otp
```

## Password reset flow
```text
POST /auth/forgot-password {email}
  → resendOtp(email,'forgot_password') → OTP email
POST /auth/verify-otp {email,otp,purpose:'forgot_password'}
  → verifyOtp → if ok, generate resetPasswordToken (32 bytes hex)
  → store sha256(token) + 10-min expiry → return plain token
PATCH /auth/reset-password {token, password, confirmPassword}
  → sha256(token) → User.findOne({resetPasswordToken, resetPasswordExpires:{$gt:now}})
  → set password → clear OTP fields
```

## Session management
- Single JWT (no refresh rotation implemented despite commented-out refresh-token scaffolding).
- The token is sent both as an HttpOnly cookie (`Qalam_Token`) and in the response body (so the frontend can call `sessionExpiresAt`).
- `logout` clears the cookie.
- The `refresh-token` route exists but is **non-functional** (see §18).

## Middleware chain (`middlewares/auth.js`)
```text
isAuthenticatedUser
  1. token = cookie Qalam_Token
  2. else token = Bearer header
  3. jwt.verify(token, JWT_SECRET_TOKEN)
  4. User.findById(decoded.id)  → 404 if missing
  5. isActive === false → 403 "deactivated"
  6. req.user = user

authorizeRoles(...roles)
  → roles.includes(req.user.role) ? next : 403
```

## Role/permission matrix (enforced in routes)
| Capability | Guest | Student | Instructor | Admin |
| ---------- | :---: | :-----: | :--------: | :----: |
| Public content read | ✅ | ✅ | ✅ | ✅ |
| Profile / theme / wishlist | ❌ | ✅ | ✅ | ✅ |
| Cart / checkout / orders / progress | ❌ | ✅ | ❌ | ❌ |
| Create reviews | ❌ | ✅ | ❌ | ❌ |
| Manage own courses & lessons | ❌ | ❌ | ✅ | ✅ |
| Coupons | ❌ | ❌ | ✅ | ✅ |
| Enrollments list | ❌ | ❌ | own courses | ✅ |
| Dashboards | ❌ | student | instructor | admin |
| Everything else (CMS, users, settings, orders mgmt) | ❌ | ❌ | ❌ | ✅ |

---

# 11. BUSINESS RULES

| # | Rule | Where enforced |
| - | ---- | -------------- |
| 1 | Discount price must be ≤ original price. | Course/Product pre-save hook + Zod refine |
| 2 | A course cannot be created published/featured. | `course.controller beforeCreate` |
| 3 | The first lesson of a course is always a free preview. | `lesson.controller beforeCreate` |
| 4 | Lessons are positionally ordered (`sortOrder`) within a course. | `lesson.controller beforeUpdate` reorder |
| 5 | Only enrolled students can update lesson progress. | `progress.service.updateLessonProgress` |
| 6 | Course completion = (completed published lessons ÷ total published lessons) × 100. | `progress.service.calculateCourseProgress` |
| 7 | A student can review a course only once and only after enrolling. | `review.service.checkReviewPermission` |
| 8 | Course average rating / review count are denormalized on the Course. | `review.service.calculateCourseRatings` |
| 9 | One user per course enrollment (unique `{user, course}`). | Enrollment model unique index |
| 10 | Course quantity in cart is fixed at 1; product quantity increments. | `cart.controller addProductToCart` |
| 11 | Coupons are percentage-based (1–100%), expire by date. | Coupon model + `applyCouponToCart` |
| 12 | Coupon discount applies only to cart total; order snapshots item prices. | `cart.controller`, `orders.controller` |
| 13 | A paid order cannot be cancelled; a cancelled order cannot be re-cancelled. | `orders.controller cancelOrder` |
| 14 | Cash orders are fulfilled immediately (stock/enrollment). | `orders.controller handleOrderSuccess` |
| 15 | A user cannot deactivate/demote themselves. | `user.controller updateUserByAdmin` |
| 16 | Account must be email-verified before login. | `auth.controller login` |
| 17 | OTPs expire in 10 min; resend throttled to 60 s. | `user.model generateOtp`, `otp.service resendOtp` |
| 18 | New password must differ from current. | `user.controller changePassword` |
| 19 | Blog reading time auto-calculated from word count (200 wpm). | `blog.model pre-save` |
| 20 | Settings / Journey / ChooseUs are singletons (auto-created on read). | `settings.service`, `journey.controller`, `choose.controller` |
| 21 | EGP→USD conversion for PayPal is hardcoded at 50 EGP/USD. | `orders.controller createPayPalCheckoutSession` |
| 22 | Webhook success path clears the user's cart. | `orders.controller handleOrderSuccess` |

---

# 12. EXTERNAL INTEGRATIONS

## Paymob (payment processing — Egypt)
- **Purpose:** card, wallet (Vodafone Cash), and Fawry payments via the Paymob **Intentions API** with a unified checkout redirect.
- **Auth:** server-side `Authorization: Token <PAYMOB_SECRET_KEY>`; checkout URL embeds `PAYMOB_PUBLIC_KEY`.
- **Location:** `modules/order/gateways/paymob.service.js` (`createPaymobIntention`), invoked from `orders.controller.js`.
- **Flow:** order created pending → intention created with item prices ratio-adjusted to match the discounted total (avoids `unmatched_item_prices`) → `paymentIntentId = intention_order_id` → client redirected to `https://accept.paymob.com/unifiedcheckout/?publicKey=...&clientSecret=...` → Paymob calls `POST /api/orders/webhook/paymob` on success.
- **Failure handling:** intention errors delete the temporary order and return 400; webhook wrapped in try/catch with console logging.

## PayPal (payment processing — international)
- **Purpose:** USD checkout via PayPal Orders API (sandbox in current config).
- **Auth:** OAuth2 client-credentials (`Basic base64(clientId:secret)` → bearer token).
- **Location:** `modules/order/gateways/paypal.service.js` (`createPayPalOrder`, `capturePayPalPayment`).
- **Flow:** create order with `reference_id=orderId`, `intent:CAPTURE` → return approval URL → frontend redirects → `POST /api/orders/paypal/success` captures → on `COMPLETED` runs `handleOrderSuccess`.
- **Failure handling:** creation failure deletes temp order; capture errors surfaced as 400.

## SMTP Email (Nodemailer)
- **Purpose:** OTP verification, password reset, and contact-form notifications to support.
- **Auth:** SMTP user/pass from env (`EMAIL_HOST`, `EMAIL_PORT=465`).
- **Location:** `utils/sendEmail.js`, `templates/*`.
- **Failure handling:** auth flows let email errors bubble to the global error handler; the contact-notification email is best-effort (logged, not fatal).

## Local file storage (Multer + `express.static`)
- **Purpose:** store uploaded images/videos/PDFs under `src/uploads/<folder>/`.
- **Auth:** none (public `/uploads` static route).
- **Location:** `config/multer.js`, `middlewares/uploadSingle|uploadMultiple.js`, `utils/handleUploadedFiles.js`, `utils/deleteFile.js`.
- **Note:** Cloudinary env vars are declared but unused — uploads are purely local.

---

# 13. ENVIRONMENT VARIABLES

Source of truth: `src/config/env.js`. Defaults shown are from the committed `.env`.

| Variable | Required | Purpose |
| -------- | :------: | ------- |
| NODE_ENV | ✅ | `development`/`production` (affects morgan, cookie `secure`) |
| PORT | ✅ | Server port (5000) |
| BASE_URL | ✅ | Public base URL used to build file URLs |
| BASE_URL2 | ✅ | Secondary URL (Paymob webhook callback host, e.g. ngrok) |
| CLIENT_URL | ✅ | CORS allow-origin + redirect URLs |
| MONGO_URL | ✅ | MongoDB connection string |
| JWT_SECRET_TOKEN | ✅ | JWT signing secret |
| JWT_EXPIRE_TOKEN | ✅ | JWT lifetime (`90d`) |
| MAX_FILE_SIZE | ⚠️ | Declared, not read by upload middlewares (20 MB hardcoded default) |
| UPLOAD_PATH | ⚠️ | Declared, unused (paths derived from `__dirname`) |
| COOKIE_EXPIRES_IN | ⚠️ | Declared, unused (cookie uses `jwtExpiresInToken`) |
| EMAIL_HOST / EMAIL_PORT / EMAIL_USER / EMAIL_PASS | ✅ | SMTP transport |
| SUPPORT_EMAIL | ✅ | Contact notification recipient |
| PAYMOB_BASE_URL | ✅ | `https://accept.paymob.com` |
| PAYMOB_API_KEY | ⚠️ | Declared, unused (secret key used instead) |
| PAYMOB_PUBLIC_KEY | ✅ | Unified-checkout URL |
| PAYMOB_SECRET_KEY | ✅ | Intention API auth |
| PAYMOB_CARD_INTEGRATION_ID / WALLET / FAWRY | ✅ | Payment channel IDs |
| PAYMOB_HMAC | ⚠️ | Declared, **unused** (webhook signature verification missing) |
| PAYMOB_CURRENCY | ⚠️ | Declared; code hardcodes `EGP` |
| PAYMOB_SUCCESS/CANCEL/FAILURE_URL | ⚠️ | Declared; success/cancel passed to Paymob via redirection URL in code |
| PAYMOB_WEBHOOK_URL | ⚠️ | Declared; code builds webhook URL from `baseUrl2` |
| PAYPAL_BASE_URL | ✅ | Sandbox/live API base |
| PAYPAL_CLIENT_ID / CLIENT_SECRET | ✅ | PayPal OAuth |
| PAYPAL_SUCCESS_URL / CANCEL_URL | ✅ | Redirects |
| PAYPAL_MODE, PAYPAL_WEBHOOK_ID | ⚠️ | Declared, unused |
| CLOUDINARY_* | ⚠️ | Declared, unused |
| SEED_ADMIN_* (EMAIL/PHONE/PASSWORD/COUNTRY/CITY/ADDRESS) | ⚠️ | Used by `seedAdmin.js` / `seed.js` only |

**Inferred values** are marked ⚠️ — they exist in `env.js`/`.env` but are not consumed by application logic.

---

# 14. CONFIGURATION ANALYSIS

- **Build:** none — plain Node.js, no bundler or transpiler. `package.json` scripts:
  - `npm start` → `node index.js`
  - `npm run dev` → `nodemon index.js`
  - `npm run prod` → `NODE_ENV=production node index.js`
  - `npm run seed:admin` → seed admin users
  - `npm run seed` → full demo dataset
- **Dependency management:** `npm` + `package-lock.json`; CommonJS (`"type":"commonjs"`).
- **Environment config:** `dotenv` loaded once in `config/env.js`; all consumers import that module (no re-loading).
- **Runtime config:** singleton patterns for Settings/Journey/ChooseUs; no config-as-code beyond that.
- **Notable:** `mongoose-sequence` and `validator` are installed (`validator` used in Portfolio URL validation) but `mongoose-sequence` is unused (auto-increment commented out). `express-rate-limit` installed but never mounted.

---

# 15. DEPLOYMENT GUIDE

## Local Development Setup
```bash
cd backend
npm install
cp .env.example .env        # (no example file committed; copy .env manually)
```

## Database Setup
- MongoDB must be running locally (or use `MONGO_URL` pointing at Atlas). Default: `mongodb://localhost:27017/Qalam`.
- Optional seed data:
```bash
npm run seed:admin          # creates 2 admin accounts
npm run seed                # creates full demo dataset
```
- Default seeded login (dev only): `student@qalamacademy.com` / `Admin@12345` (admin and instructor variants also seeded).

## Environment Setup
Required before start: `MONGO_URL`, `PORT`, `BASE_URL`, `BASE_URL2`, `CLIENT_URL`, `JWT_SECRET_TOKEN`, `JWT_EXPIRE_TOKEN`, SMTP vars, Paymob/PayPal keys (only needed for the respective payment methods).

## Running The Project
```bash
npm run dev        # development with nodemon
npm start          # production start (no reload)
```

## Build Process
None required (plain Node). Verify syntax with:
```bash
node --check src/app.js
```

## Production Deployment (README-declared: VPS + Nginx + PM2)
1. `npm install --omit=dev` on the server.
2. `npm run prod` (or `pm2 start index.js --name qalam-api`).
3. Serve `src/uploads` through Nginx as `/uploads` or proxy to Express.
4. Expose `/api` through Nginx `proxy_pass`.
5. Set `NODE_ENV=production` so cookies use `secure` and morgan is disabled.

## CI/CD Pipeline
None detected in the repository (no `.github/workflows`, `docker`, or `pm2` configs committed). Deployment is manual.

---

# 16. SECURITY REVIEW

## Authentication security
- ✅ Passwords bcrypt-hashed (10 rounds), `select:false`.
- ✅ OTPs bcrypt-hashed, 10-min expiry, 60-s resend throttle.
- ✅ JWT in HttpOnly + SameSite=Strict cookie; Bearer fallback supported.
- ⚠️ JWT secret is committed in `.env` (long 90-day lifetime, no rotation).
- ⚠️ `refresh-token` route is broken rather than removed; if "fixed" naively it would implement a security-sensitive flow without rotation or revocation.
- ⚠️ No account-lockout/rate limiting on login (`express-rate-limit` installed but commented out).

## Authorization security
- 🔴 **IDOR — profile update:** `PATCH /api/users/:id` only requires authentication; any user can modify any other user's profile.
- 🔴 **IDOR — reviews:** any `student`/`admin` can update/delete anyone's review.
- 🔴 **Order data leak:** `filterOrdersForLoggedUser` checks `role === 'user'` (never true) and `crudFactory.getAll` ignores `req.filterObject` — students can list **all orders** including other users' details.
- ⚠️ Coupons editable by instructors (comment says admin/manager).

## Input validation
- ✅ Zod validation on nearly every write route; `.strict()` rejects unknown fields (prevents mass assignment of `role`, `isActive`, `price`, etc.).
- ✅ Mongoose schema constraints as a second layer.
- ✅ Multer MIME allow-list (image/video/pdf) + size limits.
- ⚠️ File contents are not scanned; SVG uploads can carry script payloads (served under `/uploads` with no `Content-Security-Policy`).
- ⚠️ `parseNestedFormData` merges any `a.b` body keys into arbitrary nested objects before Zod validates (mitigated by `.strict()`).

## API security
- 🔴 **Unverified payment webhook:** `POST /api/orders/webhook/paymob` accepts any payload; an attacker who can spoof/craft a "successful transaction" could mark orders paid, decrement stock, and create enrollments. `PAYMOB_HMAC` is configured but unused.
- ⚠️ No rate limiting anywhere (login, contact form, OTP, general API).
- ⚠️ Helmet, HPP, and compression are commented out.
- ⚠️ CORS locked to a single `CLIENT_URL` origin (fine for prod, but cannot be an array/list of allowed origins).

## Secrets management
- 🔴 `.env` (with live-looking Paymob secrets, PayPal sandbox secrets, and a Gmail app password) is committed to git and listed in `.gitignore` **after** the fact. The secrets should be rotated immediately.
- ⚠️ Error responses echo raw messages/errors in both dev and prod (no scrubbing of internal details).

## Data protection
- ✅ Password/OTP/reset tokens excluded from queries by default (`select:false`).
- ✅ Phone/address fields exist on user models and are returned in many populated lists — review which fields truly need to be public.

## Vulnerabilities — priority table
| Risk | Issue | Impact | Recommendation |
| ---- | ----- | ------ | -------------- |
| High | Paymob webhook HMAC not verified | Payment-forgery/enrollment fraud | Verify HMAC from `PAYMOB_HMAC` before fulfillment |
| High | Committed `.env` secrets | Credential exposure | Rotate all secrets; git-rm `.env`; move to vault/CI |
| High | IDOR on `PATCH /api/users/:id` | Any user edits any profile | Require `req.user.id === req.params.id` (like change-password) or admin |
| High | `GET /api/orders` leaks all orders to students | Data breach | Fix role check (`student`) and apply `req.filterObject` in factory |
| Medium | Review update/delete no ownership check | Content tampering | Restrict to author or admin |
| Medium | No rate limiting (login/OTP/contact) | Brute-force & spam | Enable `express-rate-limit` |
| Medium | Disabled security middleware (helmet/hpp/compression) | Lowered hardening | Re-enable |
| Medium | Unused/raw error leakage | Info disclosure | Clean production error path |
| Low | SVG uploads served without CSP | Stored XSS vector | Block SVG or serve with `Content-Disposition`/CSP |

---

# 17. PERFORMANCE REVIEW

- **Denormalization is used well:** course `averageRating/totalReviews/totalStudents` and enrollment `progress` avoid live joins for hot reads.
- **N+1 awareness:** `crudFactory.getAll` uses Mongoose `populate` (single queries); `course-details` does 4 parallel-ish sequential queries per request — fine at low scale.
- ⚠️ `translateDocument` runs per document and per field — for large lists it adds CPU work; consider caching translated views or limiting fields on list endpoints.
- ⚠️ No caching layer (no Redis, no HTTP cache headers, no ETag) despite high-read/low-write CMS content.
- ⚠️ No pagination in `enrollment.getAllEnrollments` (returns all records).
- ⚠️ `dashboard.getAdminDashboard` fires many `Promise.all` aggregations on every dashboard load — no caching/TTL; can be heavy with large collections.
- ⚠️ `getTopInstructors` aggregation `$sum: "$courses.totalStudents"` over an array is fragile and likely miscalculates; a `$unwind`/`$lookup`+`$group` pattern is safer.
- ⚠️ Uploaded files served from disk via `express.static` — fine on one VPS; would need object storage (S3/Cloudinary) for horizontal scaling (envs already scaffolded).
- **Indexes:** most query paths have indexes (unique email/phone, compound course/category/instructor, `{user,lesson}`, `{user,course}`, text indexes on blog/contact). Missing indexes to review: `orders.user`, `enrollments.createdAt`, `reviews.createdAt`, `progress.lastWatchedAt`.

**Recommendations:** enable `compression()`; add simple in-memory TTL caching for `settings`, `heroes`, and dashboard aggregates; paginate enrollments; index hot filter fields.

---

# 18. CODE QUALITY REVIEW

## Technical debt & bugs
| Priority | Item | Location |
| -------- | ---- | -------- |
| High | `refreshToken` references removed `env.jwtRefreshSecret` and `user.generateAccessToken()` → runtime crash on use | `auth.controller.js:157` |
| High | `orders.routes.js` imports non-existent `updateOrderToPaid` / `updateOrderToDelivered` | `orders.routes.js:9-10` |
| High | `filterOrdersForLoggedUser` checks impossible `role === 'user'`; factory ignores `req.filterObject` | `orders.controller.js:309` |
| High | Paymob webhook lacks HMAC verification | `orders.controller.js:281` |
| Medium | `progress.service.js` uses `progress?.completedAt` before `progress` is declared | `progress.service.js:52` |
| Medium | Blog route uploads `cover` but model/controller expect `featuredImage` | `blog.routes.js`, `blog.controller.js` |
| Medium | Product PATCH restricts upload to `fileType:"image"` (PDF rejected) | `product.routes.js:58-71` |
| Medium | Wishlist returns `Course.findById(user.wishlist)` with an array | `wishlist.controller.js:21` |
| Medium | `applyCouponToCart` crashes when user has no cart | `cart.controller.js:233` |
| Low | `getTopInstructors` `$sum` over array field | `dashboard.service.js:138` |
| Low | `.env` committed despite `.gitignore` | repo root |
| Low | `configureSecurity` has helmet/rateLimit/hpp/compression disabled | `middlewares/configureSecurity.js` |
| Low | Hardcoded EGP→USD `/50` conversion | `orders.controller.js:213` |
| Low | English/Arabic comments mixed throughout (`beforeCreate`, orders) | modules |
| Low | Dead code: commented-out review controller/routes block, `mongoose-sequence`, `ApiFeatures.page/skip` duplication | multiple |

## Duplicated logic
- **Reorder logic** duplicated in `category`, `lesson`, and `timeline` controllers — extract to a shared util.
- **Singleton pattern** re-implemented in `settings`, `journey`, and `choose` controllers — extract a `getOrCreateSingleton(Model)` helper.
- **Translatable-field arrays** repeated per controller.

## Refactoring opportunities (ranked)
- **High:** enable/verify HMAC on the Paymob webhook; fix order filtering; fix refresh-token (remove or implement properly).
- **Medium:** shared reorder + singleton helpers; centralize `modelName` in locale files (many `req.t('X.…')` keys are missing from `locales/*` and fall back to the raw key).
- **Low:** unify `req.user._id` vs `req.user.id` usage; extract price/currency config; remove dead code.

---

# 19. SYSTEM DEPENDENCY MAP

```text
                    ┌─────────────────────────┐
                    │   src/app.js (Express)  │
                    └────────────┬────────────┘
                                 │
                  ┌──────────────┼──────────────┐
                  ▼              ▼              ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │  middlewares │ │   routes/    │ │   config/    │
        └──────┬───────┘ └──────┬───────┘ └──────────────┘
               │                │
               ▼                ▼
        ┌─────────────────────────────────────────┐
        │                 utils/                  │
        │  crudFactory → ApiFeatures → model      │
        │  ApiError · sendResponse · translate*   │
        │  handleUploadedFiles · sendToken        │
        └──────┬──────────────────────────┬────────┘
               │                          │
               ▼                          ▼
   ┌───────────────────────┐   ┌──────────────────────────┐
   │  domain modules (25)  │   │  infra adapters          │
   │  auth users courses   │   │  Mongoose (database/)    │
   │  lessons progress ... │   │  Nodemailer (utils)      │
   └───────────────────────┘   │  axios → Paymob/PayPal   │
                               │  Multer → fs/uploads     │
                               └──────────────────────────┘
```

### Critical modules (a failure here breaks the platform)
- `middlewares/auth.js` — every protected route.
- `utils/crudFactory.js` + `utils/ApiFeatures.js` — most read/write paths.
- `modules/users/user.model.js` — referenced by nearly every other module.
- `modules/order/*` + gateways — revenue flow.
- `modules/enrollment` + `modules/progress` — LMS gating & tracking.
- `modules/course`, `modules/course-details`, `modules/lesson` — core catalog.

### External dependencies
`MongoDB` (database), `SMTP` (email), `Paymob` & `PayPal` (payments), local filesystem (uploads).

---

# 20. DEVELOPER ONBOARDING GUIDE

## What To Read First
1. `README.md` (project overview).
2. `src/app.js` + `src/routes/index.js` — how the app is assembled and mounted.
3. `src/config/env.js` + `.env` — configuration.
4. `src/utils/crudFactory.js` + `src/utils/ApiFeatures.js` — the two helpers that generate most endpoints.
5. `src/middlewares/auth.js` + `src/middlewares/validate.js` — auth & validation contract.
6. One full module end-to-end (e.g. `modules/course/*`) as a reference implementation.

## Important Files
| File | Why |
| ---- | --- |
| `src/app.js` | Middleware order & app assembly |
| `src/routes/index.js` | Full API surface map |
| `src/utils/crudFactory.js` | Generic CRUD engine |
| `src/utils/ApiFeatures.js` | Query API (search/filter/sort/pagination) |
| `src/middlewares/auth.js` | Authentication + authorization |
| `src/modules/order/orders.controller.js` | Payment fulfillment flow |
| `src/modules/order/gateways/paymob.service.js` | Paymob integration |
| `src/modules/dashboard/dashboard.service.js` | Aggregation reference |
| `src/database/seed.js` | Demo data & schema assumptions |
| `src/utils/translateDocument.js` | Bilingual response handling |

## Key Features
Auth/OTP, role-based CMS, course+lesson management, cart/coupon/order + Paymob/PayPal, enrollment + progress, reviews with rating rollup, dashboards, bilingual content, singleton settings.

## Development Workflow
1. Add a feature module under `src/modules/<name>/` (model → controller → routes → schema → optional service).
2. Mount it in `src/routes/index.js`.
3. Prefer `crudFactory` + `ApiFeatures`; add `before/after` hooks for custom logic.
4. Run `npm run dev`; test with curl/Postman (collection deleted from repo).
5. Seed data via `npm run seed`.

## Common Pitfalls
- Forgetting that `validate` middleware **replaces `req.body`** with Zod output — route order matters (upload → parseNestedFormData → validate).
- `.strict()` schemas reject any field not declared — keep schemas in sync with models.
- Bilingual fields must be added to the module's `translatableFields` array or the response stays an object.
- `req.user._id` vs `req.user.id` are equivalent; don't rely on one only.
- Webhook routes must stay public but SHOULD verify HMAC (currently missing).
- Form-data uploads need the field names to match the model field names exactly.

## Recommended Learning Path
Middleware chain → `ApiFeatures`/`crudFactory` → auth & users → course/lesson → cart/order/payments → enrollment/progress/review → dashboard → CMS modules → security hardening.

---

# 21. PROJECT COMPLEXITY ASSESSMENT

## System Size
**Large** — 25 feature modules, ~180 source files, 22 collections, 3 user roles, 2 payment gateways, bilingual i18n, multiple admin CMS areas.

## Estimated Development Effort
- **MVP effort:** ~4–6 weeks (single senior full-stack dev) — auth, courses, lessons, enrollment, progress, cart/order with one gateway, basic CMS.
- **Current version effort:** ~10–14 weeks for one dev (or ~6–8 weeks for a 2-dev team) — includes all CMS modules, dashboards, dual payment gateways, i18n, uploads, seeds.

## Team Size Required
- **Sustain:** 1 backend dev + 1 frontend dev (or 1 full-stack) with part-time QA.
- **Grow:** add 1 DevOps for deployment/security hardening.

## Maintenance Complexity
**Medium-High** — high reuse (factory) lowers per-feature cost, but cross-module coupling (order→cart/product/course/enrollment; dashboard→many models), missing tests, and latent bugs raise the cost of safe changes.

---

# 22. REBUILD ESTIMATION

## Time to rebuild
- Faithful rebuild (same features): **10–14 weeks** for a solo backend engineer; **6–8 weeks** with a 2-person team.
- Polished rebuild (fixing the issues in §16–§18, adding tests, CI/CD): **14–18 weeks**.

## Required team roles
1 Senior Node.js/Express backend engineer (lead)
1 DevOps engineer (deployment, Nginx, PM2, secrets) — part-time
1 QA engineer — part-time (no test suite currently exists)
Frontend engineer(s) to consume the API (out of scope here)

## Required skills
Node.js, Express 5, MongoDB/Mongoose (indexing, aggregation, hooks), JWT + cookie sessions, Zod, Multer, Nodemailer, Paymob & PayPal APIs, REST API design, bilingual data modeling.

## Infrastructure requirements
- 1 VPS (2 vCPU / 4 GB RAM) with Node 18+ and MongoDB (or Atlas).
- Nginx reverse proxy + PM2 process manager.
- SMTP account; Paymob account (card/wallet/fawry integrations); PayPal Business account.
- Object storage if scaling uploads (Cloudinary/S3 — envs already declared).

---

# 23. FINAL SUMMARY

## Complete Feature List
Auth & OTP · users & roles · categories · courses · course-details aggregation · lessons · progress · enrollments · products · cart · coupons · orders (cash/Paymob/PayPal) · reviews · wishlist · dashboards (admin/instructor/student) · settings · heroes · blog · contact · services · portfolios · team · partners · journey · timeline · choose-us · bilingual i18n · file uploads · email.

## Architecture Summary
Express 5 monolith, feature-modular layout, generic CRUD factory + fluent query builder, thin controllers with service layer where logic demands, Mongoose schema hooks for denormalization, envelope-based responses, JWT-cookie sessions, Paymob/PayPal outbound HTTP, local Multer uploads.

## Database Summary
MongoDB with 22 collections. Core relational spine: `users → enrollments → courses`, `orders.cartItems → products/courses` (polymorphic `refPath`), `users → progresses → lessons`, `reviews → courses`. Unique constraints enforce one-enrollment-per-course, one-review-per-user, one-progress-per-lesson, coupon name, category slug-per-type, timeline year, and singleton settings.

## Security Summary
Good foundations (bcrypt, hashed OTPs, HttpOnly cookies, Zod strict validation, role guards) undermined by: an unverified Paymob webhook, an IDOR on user updates and reviews, an order-data leak for students, committed secrets in `.env`, and disabled hardening middleware/rate limiting. These are the highest-priority fixes before production.

## Technical Risks
1. Payment webhook forgery (no HMAC).
2. IDORs exposing/modifying other users' data.
3. Missing tests across the entire API.
4. Broken/legacy code paths (refresh-token, order filter, blog upload) that indicate drift.
5. No CI/CD, no containerization, manual deploy.
6. Hardcoded business values (EGP→USD 50, currency `EGP`).

## Recommended Improvements
1. **Fix first:** webhook HMAC; user-update ownership; order filtering; review ownership; remove/repair `refresh-token`; rotate committed secrets.
2. **Security hardening:** enable helmet/hpp/compression/rate-limit; block SVG uploads; scrub production errors; verify admin-only coupon creation.
3. **Reliability:** add automated tests (supertest + mongodb-memory-server) for auth, checkout, progress, and the factory; add CI.
4. **Maintainability:** extract shared reorder/singleton helpers; align locale keys with `modelName`s; remove dead code.
5. **Scale:** index hot query fields, cache settings/dashboard reads, move uploads to object storage.

## Critical Components
`middlewares/auth.js` · `utils/crudFactory.js` · `utils/ApiFeatures.js` · `modules/users/user.model.js` · `modules/order/*` (+ gateways) · `modules/enrollment` · `modules/progress` · `modules/course` · `modules/course-details` · `modules/dashboard`.

## Key Takeaways
- A well-factored Express/Mongoose monolith where the generic CRUD factory keeps feature modules tiny and consistent.
- The bilingual `{ar,en}` model + `Accept-Language` translation layer is the platform's signature design decision.
- The order lifecycle (pending → gateway → webhook/capture → fulfill stock/enrollments → clear cart) is the highest-value, highest-risk flow — secure it first.
- The codebase is production-shaped but not production-safe yet: the documented security gaps should be closed before launch.
