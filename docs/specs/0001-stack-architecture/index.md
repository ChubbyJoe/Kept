# 0001. Stack and architecture

**Date**: 2026-09-20
**Status**: Accepted

## Summary

Kept will be a TypeScript progressive web app built as a modular monolith with Next.js. Supabase will provide Postgres data and identity, while Vercel will run the application and scheduled work. This keeps the first product simple to operate while giving sensitive medication data a clear security boundary and giving dose logging a dependable offline path.

## Decision

**Chosen option**: Managed TypeScript modular monolith

Build one deployable Next.js application organized into vertical feature modules. Use Supabase Postgres and Auth as managed foundations, strict row level security for every exposed user table, Vercel for application hosting and scheduled work, and a small IndexedDB outbox for offline dose events. (basis: `docs/scope/scope.md`, Supabase security guidance, modular monolith practice)

**Implementation skills**: `supabase` (`supabase/agent-skills`, `.agents/skills/supabase/`) · `supabase-postgres-best-practices` (`supabase/agent-skills`, `.agents/skills/supabase-postgres-best-practices/`)

## Proposed stack

| Layer                | Choice                                                                                    | Reason                                                                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application pattern  | Modular monolith with vertical feature modules                                            | One deployable unit is easier to build and operate, while module ownership keeps later slices separate.                                                                                                                   |
| Language             | TypeScript                                                                                | Shared types reduce mistakes across forms, server boundaries, database clients, and queued events.                                                                                                                        |
| Runtime              | Current active Node.js LTS supported by Vercel                                            | It gives the broadest compatibility across the selected server libraries.                                                                                                                                                 |
| Package manager      | npm with a committed lockfile                                                             | It needs no extra package manager setup and makes dependency resolution reproducible.                                                                                                                                     |
| Web framework        | Next.js App Router with React Server Components                                           | One framework can serve the private app, public pages, server actions, and route handlers. (basis: [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps))                                          |
| Styling              | Tailwind CSS with CSS custom properties                                                   | It provides a responsive foundation without deciding the later design system.                                                                                                                                             |
| PWA support          | Serwist with explicit cache rules                                                         | It handles service worker mechanics while keeping sensitive cache policy visible.                                                                                                                                         |
| Primary database     | Supabase Postgres                                                                         | The domain is relational and needs transactions, constraints, SQL, and row ownership policies.                                                                                                                            |
| Schema workflow      | Supabase SQL migrations with generated TypeScript types                                   | SQL must own tables, grants, functions, and row level security policies.                                                                                                                                                  |
| Data access          | Supabase Data API for safe user operations, Next.js server boundaries for privileged work | Routine access stays small, while secrets and elevated actions never enter the browser. (basis: [Supabase API security](https://supabase.com/docs/guides/api/securing-your-api))                                          |
| Authentication       | Supabase Auth with verified email and password                                            | It provides proven session and recovery flows without custom authentication code. (basis: [Supabase Auth](https://supabase.com/docs/guides/auth))                                                                         |
| Session handling     | Supabase SSR cookie sessions                                                              | Server Components and route handlers can resolve identity consistently.                                                                                                                                                   |
| Authorization        | Postgres row level security plus explicit server checks                                   | The database protects every owned row even when application code is wrong. (basis: [Supabase row level security](https://supabase.com/docs/guides/database/postgres/row-level-security))                                  |
| Input validation     | Zod at every trust boundary                                                               | One schema style can validate forms, server calls, environment values, and offline events.                                                                                                                                |
| Offline storage      | Dexie over IndexedDB                                                                      | It gives transactions, schema versions, and subscriptions for a small local outbox.                                                                                                                                       |
| Offline sync         | Local first write to an event outbox, then server reconciliation                          | Dose logging remains immediate without making the browser database authoritative.                                                                                                                                         |
| Background work      | Vercel Cron calling protected Next.js route handlers                                      | Scheduled work remains inside the monolith and uses idempotent handlers. (basis: [Vercel Cron documentation](https://vercel.com/docs/cron-jobs))                                                                          |
| Notifications        | Direct Web Push with VAPID keys                                                           | It avoids an additional notification aggregation vendor and permits a minimal payload. Browser push services still transport messages. (basis: [MDN Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)) |
| Authentication email | Resend through Supabase custom SMTP                                                       | Production verification and recovery mail use a dedicated transactional service.                                                                                                                                          |
| Hosting              | Vercel for Next.js, Supabase for data and identity                                        | Both are managed services, so the project can focus on product behavior.                                                                                                                                                  |
| Environments         | Local development and isolated production only                                            | This matches the chosen cost posture, with limited previews until a separate nonproduction backend exists.                                                                                                                |
| Observability        | Redacted structured server logs and Vercel runtime metrics                                | The first release gets operational signals without sending health data to another provider.                                                                                                                               |
| Recovery             | Managed backups with point in time recovery before accepting real user data               | Real medication data needs recovery from a bad write or migration.                                                                                                                                                        |

## Architecture

### Application boundaries

The repository stays a single application. Code is grouped by product capability, such as identity, medicines, regimens, doses, reminders, adherence, and account controls. Each module owns its interface, domain rules, and data access. A small platform area owns Supabase clients, sessions, logging, service worker setup, and environment validation.

React Server Components render initial server data where useful. Client Components are limited to interaction, browser APIs, Dexie, and live offline state. There is no general global state store and no second server data cache.

Kept exposes no public API in this phase. Browser code may call Supabase directly only for simple user owned operations covered by tested row level security. Server actions handle application mutations that need a server boundary. Route handlers handle Cron, Web Push, export, deletion, and external callbacks.

### Security boundary

Every table in an exposed schema has row level security enabled before access is granted. Policies combine the authenticated role with an ownership predicate. Update policies use both read eligibility and write checks. Authorization never relies on editable user metadata. Views use the caller's security context, and privileged functions remain outside exposed schemas unless they have a reviewed need. The `service_role` key and all secret keys remain server only. (basis: `.agents/skills/supabase/SKILL.md`, [Supabase secure data guide](https://supabase.com/docs/guides/database/secure-data))

Email and password sign in requires verified email. Web sessions use the Supabase SSR cookie flow. Sensitive account operations require a fresh server identity check. Application logs exclude medicine names, dose details, email addresses, tokens, user identifiers, and request values that may contain health data.

The first market is Nigeria. Medication and adherence records are treated as sensitive personal data. The production Supabase project and Vercel deployment should use suitable nearby regions, with the exact region checked against current provider availability before provisioning. This spec does not claim clinical, HIPAA, or medical device compliance.

### Offline and PWA boundary

The supported installation targets are current iOS Safari, Android Chrome, and desktop Chromium browsers. Other modern browsers receive a responsive web experience without a promise of equal install or push behavior.

The service worker precaches a nonpersonalized offline shell so an installed private route can open without a network. The shell reads an authorized local snapshot after startup. Private HTML, React Server Component responses, authenticated responses, and health records remain network only and never enter Cache Storage.

IndexedDB holds today's schedule, the recent context required to show it, and pending events. Each authenticated account has a separate local database keyed by its Supabase user ID. A `BroadcastChannel` coordinates sign out, lock, and data change notices across tabs for the same browser origin.

An explicit sign out or confirmed remote session invalidation clears that account's local database. A temporary refresh failure locks the local snapshot instead of deleting it, so pending events survive a service outage. The application reveals no locked health data and accepts no new health action until it can restore and verify the same account session. Detailed recovery interface behavior remains owned by the offline sync feature.

An offline dose action is written atomically to the local outbox with a client generated unique event ID. Sync runs when the app opens, returns to the foreground, or detects a network connection. Browser Background Sync may speed this up but is never the only delivery path because support is uneven. (basis: [MDN Background Sync](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API), idempotent consumer practice)

The server accepts each event ID once for its authenticated owner. Postgres stores a durable event receipt and the resulting domain mutation in one transaction. A retry reads the receipt and returns the recorded result, even when it reaches another serverless instance. The later data model spec owns the exact receipt fields, and the dose status and offline sync specs own domain conflict rules.

### Reminder boundary

Vercel Cron calls an authenticated route handler that claims due work from Postgres in bounded batches. Claims are atomic so concurrent invocations cannot work the same available row. A claim has a limited lifetime so abandoned work becomes eligible again. The route does not assume the scheduler or push network delivers at an exact time.

Database state and external push submission cannot commit atomically. The later reminder spec must choose the final duplicate versus missed reminder policy and define attempt recording around that choice. A dedicated queue is deferred until measured volume or delivery behavior requires it.

Push messages contain generic reminder text and an opaque dose reference. They contain no medicine name or dosage. The app resolves details only after it opens and verifies the session. Web Push remains an opt in capability, and the reminder feature must provide a useful unavailable state. (basis: [Apple Web Push guidance](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers?language=objc))

### Environments and delivery

Local development uses the Supabase CLI and local services. Production uses isolated Vercel and Supabase resources. Preview deployments must not use production credentials or data. With no hosted nonproduction backend, preview checks are limited to static behavior, mocked paths, and production builds.

Dependencies use pinned versions and a committed `package-lock.json`. Database changes use reviewed Supabase SQL migrations. The build should generate database types after schema changes and verify row level security with both allowed and denied cases.

The architecture is sized for up to roughly 10,000 monthly active users. It uses one application region and one primary database region. Multiple active regions, microservices, a dedicated queue, a public API, and a complete offline replica are deferred until evidence demands them.

## Consequences

**Positive**:

- One TypeScript application can deliver the first complete path through interface, identity, data, and deployment.
- Postgres constraints and row level security fit the relational and private nature of medication data.
- Managed hosting, identity, email, and database services keep operational work small.
- The offline outbox makes the core logging action dependable without adopting a full local first platform.

**Negative and tradeoffs**:

- The product depends on Vercel, Supabase, and Resend availability, pricing, and regional support.
- Direct browser data access makes correct grants and row level security tests a release requirement.
- Serverless scheduled work has timing, duration, and stateless execution limits. Reminder delivery cannot promise exact timing.
- Supporting only local and production environments limits realistic preview testing and makes production isolation discipline essential.
- IndexedDB and service worker behavior varies across browsers, especially under storage pressure and on installed iOS web apps.
- A session refresh outage locks local health data until the same account can be verified again, even if the data remains on the device.
- Web Push submission and database completion cannot be one atomic operation, so the reminder feature must choose between limited duplicates and possible missed delivery.
- Point in time recovery may require a paid Supabase plan before real user data can be accepted.

**Neutral**:

- The later data model spec owns domain entities, constraints, and indexes.
- The later design system spec owns visual tokens and components.
- The later reminder and offline sync specs own delivery policy, conflict resolution, and user facing failure states.

## Follow-up

- [ ] Add the installed `supabase` skill to the future root `AGENTS.md` under `## Agent skills`, because its identity, API, and security rules affect the whole project.
- [ ] Add the installed `supabase-postgres-best-practices` skill to the future root `AGENTS.md` under `## Agent skills`, because its database rules affect the whole project.
- [ ] Connect the official Supabase MCP server and authenticate it before implementation, as planned by the engineer.
- [ ] Confirm the exact Vercel and Supabase production regions against current provider availability and Nigerian data handling needs before provisioning.
- [ ] Confirm that the selected Vercel plan supports the reminder scan frequency before the reminder delivery slice begins.
- [ ] Add a hosted nonproduction Supabase project if realistic preview testing becomes necessary.
- [ ] Select the exact transactional email domain and complete its DNS verification before enabling production authentication email.

## Verification

The checks that prove the scaffold follows this decision are in [verify.md](verify.md).

## Rationale

Reasoning and options: see [rationale.md](rationale.md).
