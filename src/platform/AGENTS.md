# Platform

## Overview

This area owns shared environment validation, safe server logging, and Supabase client creation. Keep product rules in vertical feature modules and keep privileged work behind server boundaries.

## Key files

| File                 | Owns                                                      |
| -------------------- | --------------------------------------------------------- |
| `env/public.ts`      | Validation for browser safe environment values            |
| `logging/logger.ts`  | Structured server error logging with a restricted context |
| `supabase/client.ts` | Browser Supabase client creation                          |
| `supabase/server.ts` | Server Supabase client creation with cookie access        |

## Conventions

- Validate environment values with Zod at the boundary.
- Only the Supabase URL and publishable key may enter browser code. Keep `service_role` and every secret on the server.
- Use `createBrowserSupabaseClient` in browser code and await `createServerSupabaseClient` in server code.
- Treat cookie writes from Server Components as unavailable. The future session refresh Proxy owns those writes.
- Log only a stable code and operation. Never log medicine names, dose details, email addresses, tokens, user identifiers, or request values that may contain health data.
- Use the installed Supabase skills before changing Supabase clients, Auth, database access, or security rules.

## Gotchas

The public environment module validates as soon as it is imported, so its required values must exist before either Supabase client factory is used.

## Related specs

- [Stack and architecture](../../docs/specs/0001-stack-architecture/index.md)

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
