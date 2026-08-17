# Admin authentication

The admin panel uses two HttpOnly cookies:

- `mjk_admin_access`: a signed, short-lived 15-minute access token used by middleware and admin APIs.
- `mjk_admin_refresh`: a 30-day opaque refresh token scoped to `/api/admin`. Only its SHA-256 hash is stored in Supabase.

Refresh tokens rotate on every refresh. Reusing a rotated, revoked, or expired token revokes the complete token family, which limits the impact of a stolen token. The browser client also single-flights refresh requests so concurrent API calls do not race token rotation.

## Required deployment step

Before deploying this authentication change, run [`supabase/migrations/20260817_admin_refresh_tokens.sql`](../supabase/migrations/20260817_admin_refresh_tokens.sql) in the production Supabase project. The server requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to create and rotate refresh sessions. The service-role key must remain server-only and must never be exposed as a `NEXT_PUBLIC_*` variable.

After applying the migration, deploy the application and test:

1. Login creates both cookies.
2. Admin API requests continue after the 15-minute access token expires because the client refreshes it.
3. Logout revokes the refresh-token family and clears all cookies.
4. Reusing an old refresh token logs the session out and revokes the family.
