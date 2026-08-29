# Qalam Academy Backend — Postman Collection Coverage Report

Generated from a full scan of the backend implementation (`backend/index.js`, `backend/src/**`).

## Deliverables

| File | Purpose |
|---|---|
| `Qalam_Academy.postman_collection.json` | Complete Postman collection (127 requests, 27 folders) |
| `Qalam_Academy.postman_environment.json` | Postman environment with placeholder variables |

## Coverage Metrics

| Metric | Count |
|---|---|
| Total endpoints discovered | 127 |
| Total endpoints documented | 127 |
| Public endpoints | 38 |
| Authenticated endpoints (all roles) | 89 |
| Admin / role-protected endpoints | 89 (subset of above; role documented per request) |
| Endpoints with request bodies | 51 |
| File upload endpoints | 25 |
| Endpoints with multiple response examples | 109 |
| Endpoints with automated tests | 4 (auth/logout/login, health, webhook) |

## Modules & Endpoint Counts

| Folder | Endpoints |
|---|---|
| System | 1 (`GET /health`) |
| Authentication | 8 |
| Users | 10 |
| Categories | 5 |
| Courses | 5 |
| Course Details | 1 |
| Lessons | 5 |
| Progress | 3 |
| Reviews | 5 |
| Enrollments | 4 |
| Wishlist | 3 |
| Products | 5 |
| Coupons | 5 |
| Cart | 7 |
| Orders | 8 |
| Dashboard | 3 |
| Services | 5 |
| Portfolios | 5 |
| Team | 5 |
| Partners | 5 |
| Heroes | 6 |
| Blogs | 5 |
| Contact | 5 |
| Journey | 2 |
| Timeline | 5 |
| Choose Us | 2 |
| Settings | 4 |

## Verification Checklist

- Every route in `src/routes/index.js` and every module route file is represented. ✅
- HTTP methods and paths match the route definitions. ✅
- Path parameters (`:id`, `:slug`, `:cartId`, `:courseId`, `:itemId`, `:page`, `:courseId`, etc.) represented as Postman variables. ✅
- Query parameters (search, sort, limit, skip, fields, and field filters) documented on list endpoints. ✅
- Request body fields reconstructed from zod schemas and models (fields, types, required/optional, enums, example values). ✅
- Authentication (Bearer/`Qalam_Token` cookie) and role requirements documented. ✅
- File upload field names, allowed mime types, and size limits documented. ✅
- Response examples cover success + realistic error scenarios per endpoint. ✅
- No real secrets copied: all payment/JWT/DB credentials replaced with variables/placeholders. ✅
- No duplicate or invented endpoints. ✅

## Global API Notes

- **Base URL:** all routes mounted under `/api` (`app.use("/api", routes)`), except `GET /health`.
- **Response envelope:** successes `{ success, message, data, meta }`; errors `{ success: false, statusCode, message, errors }`.
- **Error status codes actually used:** `400` (validation / cast / multer), `401` (unauthenticated / invalid/expired token), `403` (forbidden / inactive user / role denied), `404` (route or resource not found), `409` (Mongoose duplicate key), `429` (OTP resend cooldown), `500` (unhandled).
- **Authentication:** JWT accepted via `Qalam_Token` httpOnly cookie **or** `Authorization: Bearer <token>`. Login sets the cookie and returns `data.Qalam_Token`. `accessToken` is stored into a collection variable on login.
- **Roles:** `admin`, `instructor`, `student`.
- **Language:** `Accept-Language: ar|en` (default `ar`). Determines translated response fields and `req.t()` messages. Many standard CRUD messages resolve to raw translation keys (e.g. `Document.fetched`) because many locale keys are missing.

## Ambiguities / Notes Found in the Source

These reflect the actual implementation and are documented in the affected requests:

1. **`POST /api/auth/refresh-token` is non-functional.** Reads a cookie `refreshToken` (never set), verifies against an undefined `env.jwtRefreshSecret`, and calls a non-existent `generateAccessToken()`. Expected to return 401/500.
2. **Blog upload field is named `cover` but maps to the stored `featuredImage`**; `gallery` is effectively not settable via the validated API.
3. **Orders list per-user filter is broken**: the code checks `role === 'user'` which never matches, so every authenticated user sees all orders.
4. **`PATCH /api/users/:id/admin` zod validation is commented out**; invalid roles fall through to Mongoose enum validation.
5. **`apply-coupon` returns a custom response shape** `{ status, coupon, data, meta }`, unlike the standard envelope.
6. **Review/POST is enrollment-gated; review update/delete have no ownership check** (any student/admin can modify any review).
7. **Hero public route is only `GET /api/heroes/page/:page`**; the normal list/get are admin-only (unlike other CRUD modules).
8. **PayMob webhook performs no HMAC/signature verification** (public `POST /api/orders/webhook/paymob`); `type === "TRANSACTION"` + `obj.success === true` marks orders paid. `PAYMOB_HMAC`/`PAYMOB_API_KEY` are defined but unused.
9. **Product update multer filter only allows images**, so PDF re-uploads on PATCH are rejected.
10. **Timeline `sortOrder` auto-assigned on create** (client value ignored); updates may reorder siblings.
11. **Course payment via PayPal hard-codes EGP→USD at `/50`.**
12. **Many standard CRUD `message` values are raw translation keys**; custom singleton/payment handlers use hardcoded English strings.
13. **Response `message` is omitted when undefined**; several endpoints deliberately send `message: ""` (e.g. get-current-user, refresh-token).
14. `PATCH /api/cart/:itemId` `count` has no min-enforcement at update time.