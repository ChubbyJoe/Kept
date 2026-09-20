<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- **Application**: TypeScript 5.9 modular monolith on Node.js 24 with Next.js 16 App Router, React 19, and Tailwind CSS 4
- **Data and identity**: Supabase Postgres, Auth, and SSR cookie sessions
- **PWA, validation, and delivery**: Serwist 9, Zod 4, Vercel, and npm 11 with pinned dependencies and a committed lockfile

## Build approach

**Tracer Bullet**: prove one real path through every layer, then thicken that working path.

## Commands

```bash
# Install
npm ci
# Local services and application
npm run supabase:start
npm run dev
# Checks
npm run env:check
npm run format:check
npm run typecheck
npm run lint
npm run check
npm run build
npm run log:check
```

## Specs

Architecture records live in `docs/specs/NNNN-title/`. Each directory may contain `index.md`, `rationale.md`, and `verify.md`.

## Rules

- Group product code by capability in vertical modules under `src/`, and keep shared environment, logging, session, and Supabase code in `src/platform/`.
- Prefer React Server Components. Use Client Components for interaction, browser APIs, and live offline state.
- Validate forms, server calls, environment values, and offline events with Zod at their trust boundaries.
- Allow browser Supabase access only for simple user owned operations protected by tested row level security.
- Keep privileged work and every secret behind server boundaries.
- Enable row level security before granting access to any exposed table, and test both allowed and denied cases.
- Never cache or log private health data, authentication values, user identifiers, or sensitive request values.
- Keep private navigation network only. Cache only versioned public assets and the nonpersonalized offline page.
- Pin dependency versions and commit `package-lock.json`.
- Format supported files with Prettier. Run `npm run format` to write changes and `npm run format:check` to verify them.
- Use Conventional Commits. Husky and commitlint check commit messages, and lint-staged formats and lints staged files.
- Keep GitHub Actions green with `npm run check` and `npm run build`.

## Agent skills

- [supabase](.agents/skills/supabase/): `supabase/agent-skills`, Supabase Auth, clients, security, and local development
- [supabase-postgres-best-practices](.agents/skills/supabase-postgres-best-practices/): `supabase/agent-skills`, database schema, security, and query rules

## Context files

- [src/platform/AGENTS.md](src/platform/AGENTS.md) (shared environment, logging, and Supabase boundaries)
