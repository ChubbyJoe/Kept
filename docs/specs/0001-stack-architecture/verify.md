# Verify 0001. Stack and architecture

These checks prove that the foundation follows the architecture decision. They cover only the empty runnable scaffold promised by the Stack and architecture scope item. Later features verify identity, domain data, offline reconciliation, and reminder delivery.

## Local foundation

- Install dependencies from the committed `package-lock.json` without changing the lockfile.
- Start the supported local Supabase services from repository configuration.
- Start the Next.js application on the documented Node.js LTS version.
- Confirm environment validation fails clearly when a required value is absent.

## Production build

- Run the production build and any checks that exist in the scaffold without depending on tooling that the later coding standards foundation has not yet established.
- Confirm the production build contains no server secret in browser assets.
- Confirm the application starts with production shaped environment validation.

## Installation and browser behavior

- Confirm the manifest is valid and the application is installable on one supported mobile target.
- Confirm the installed application opens and updates after a new service worker version activates.
- Load an installed private route once, disable the network, restart the installed application, and confirm the nonpersonalized offline shell opens.
- Confirm Cache Storage contains only versioned application assets and explicitly public responses.
- Confirm private HTML and React Server Component responses are absent from Cache Storage.

## Configuration and isolation

- Confirm the browser bundle contains only the public Supabase key and never contains `service_role` or secret credentials.
- Confirm local configuration can reach the local Supabase services without production credentials.
- Confirm preview deployments have no production Supabase or Resend credentials.
- Confirm the scaffold provides separate server and browser Supabase client factories without making a domain table or policy.

## Operational checks

- Trigger a controlled scaffold error and confirm the structured log contains no secret or request payload.
- Confirm production backup and point in time recovery settings before real user data is accepted.

## Deferred verification ownership

- Core medication loop verifies email verification, SSR session refresh, user ownership policies, and cross user denial against its real first domain row.
- Offline logging and sync verifies account partitioned IndexedDB, tab coordination, locked session behavior, durable event receipts, transactional mutation, and retry deduplication.
- Reminder delivery verifies protected Cron access, atomic Postgres claims, abandoned claim recovery, bounded batches, generic push payloads, and the chosen duplicate versus missed delivery policy.
