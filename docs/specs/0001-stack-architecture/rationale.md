# Rationale for 0001. Stack and architecture

## Context

Kept is a new medication adherence product for adults managing their own chronic care. It must work as an installable responsive web app, protect sensitive medication and adherence data, support reminders, and allow the core logging action to work during a connection loss. The first delivery approach is a Tracer Bullet, which means one real path should cross every layer before the product grows wider. (basis: `docs/scope/scope.md`)

There is no existing application code or project convention file. The architecture therefore needs a clear default that a small team can scaffold, understand, and operate. The expected first scale is no more than roughly 10,000 monthly active users. The first market is Nigeria, and the product is not a clinical decision tool.

The browser platform creates two important constraints. Installation, background work, and push support differ by browser. Sensitive offline data must also survive ordinary connection loss without becoming an uncontrolled full account replica. Production data needs isolation and recovery, while the chosen two environment model limits what preview deployments can safely exercise.

## Options considered

### Option 1: Managed TypeScript modular monolith

One Next.js application uses Supabase for Postgres and identity, Vercel for hosting and scheduled work, and a narrow browser outbox for offline events. (basis: modular monolith practice, [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps), [Supabase Auth](https://supabase.com/docs/guides/auth))

**Pros**:

- It provides the shortest path to one complete, production shaped user journey.
- The managed services remove database, identity, and application server operations.
- Postgres and row level security match relational private data.

**Cons**:

- It creates provider dependence across three services.
- Correct row level security and server secret separation are essential.
- Serverless scheduling and browser background behavior cannot guarantee exact reminder timing.

### Option 2: React frontend with a separate custom API

A browser application calls a separately deployed API that owns all database access and identity integration. (basis: service boundary practice)

**Pros**:

- It creates a clear network boundary and leaves room for other clients.
- It centralizes authorization and business logic on the server.

**Cons**:

- It adds a second deployment, more contracts, and more operational work before another client exists.
- It slows the first thin path through the product without solving a current scale or ownership problem.

### Option 3: Full local first application

The browser database is primary and continuously replicates with a server data model designed around synchronization. (basis: local first software practice)

**Pros**:

- It gives the strongest offline behavior and very fast local interaction.
- It can support long disconnected periods once replication is mature.

**Cons**:

- Conflict resolution, migrations, security, and recovery become foundational distributed systems concerns.
- It stores a wider set of sensitive health data on each device.
- The complexity is not justified by the initial requirement to log a dose during ordinary connection loss.

## Rationale

The managed modular monolith best matches the product stage and the Tracer Bullet approach. One application can prove identity, a protected data write, offline capture, reconciliation, and production delivery without a second application runtime or a replication platform. The expected scale gives no reason to accept microservice or distributed sync costs.

Supabase fits because Kept has strongly relational data and per user ownership. Its benefit depends on treating database grants and row level security as part of the security boundary, not as optional database configuration. The installed Supabase skills make those rules explicit and should govern implementation. (basis: `.agents/skills/supabase/SKILL.md`, `.agents/skills/supabase-postgres-best-practices/SKILL.md`)

The narrow IndexedDB outbox is deliberately less ambitious than a full offline replica. It solves the important failure, recording a dose when the connection drops, while leaving domain conflict rules to the later dedicated specs. Background Sync is only an optimization because browser support is incomplete. (basis: [MDN Background Sync](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API))

Using Vercel for scheduled work keeps code in one deployable unit, but it is not a durable queue and does not promise precise delivery. The reminder slice must validate scan frequency, idempotency, and unavailable states before it claims dependable reminders. (basis: [Vercel Cron documentation](https://vercel.com/docs/cron-jobs), idempotent consumer practice)

## Landscape evidence

The current official documentation confirms that Next.js supports manifests, service workers, installation guidance, and Web Push. Supabase provides Postgres, Auth, browser data APIs, and row level security, while warning that exposed tables need deliberate grants and policies. Apple supports Web Push for installed Home Screen web apps on supported systems. OpenTelemetry browser instrumentation remains less mature, which supports starting with redacted server logs and platform metrics. (basis: [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps), [Supabase secure data guide](https://supabase.com/docs/guides/database/secure-data), [Apple Web Push guidance](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers?language=objc), [OpenTelemetry JavaScript](https://opentelemetry.io/docs/languages/js/))

## References

**Project sources**:

- `docs/scope/scope.md`, product shape, foundation outcome, and Tracer Bullet approach
- `.agents/skills/supabase/SKILL.md`, Supabase Auth, API, row level security, CLI, and secret handling conventions
- `.agents/skills/supabase-postgres-best-practices/SKILL.md`, Postgres schema, security, connection, and query conventions

**Practices and standards**:

- Modular monolith
- Least privilege and defense in depth
- Idempotent consumer
- Local outbox
- Local first software

**Links**:

- Next.js PWA guide: https://nextjs.org/docs/app/guides/progressive-web-apps
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase row level security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase secure data guide: https://supabase.com/docs/guides/database/secure-data
- Supabase API security: https://supabase.com/docs/guides/api/securing-your-api
- Vercel Cron documentation: https://vercel.com/docs/cron-jobs
- MDN Background Sync: https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API
- MDN Push API: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
- Apple Web Push guidance: https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers?language=objc
- OpenTelemetry JavaScript: https://opentelemetry.io/docs/languages/js/
