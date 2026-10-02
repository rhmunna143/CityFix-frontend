# Backend Requests & Dependencies

As per PRD §13.2, here is the list of dependencies needed from the backend team:

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
