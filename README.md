# Kept

Kept is a progressive web app for simple medication adherence tracking. This
repository currently contains the runnable foundation described by architecture
spec 0001.

## Local setup

Use Node.js 24 and npm 11. Install exactly from the committed lockfile:

```bash
npm ci
```

Start the local Supabase services, then copy the reported API URL and
publishable key into `.env.local` using `.env.example` as the shape:

```bash
npm run supabase:start
cp .env.example .env.local
npm run supabase:status
```

Replace the placeholder publishable key before using either Supabase client
factory. Then start Next.js and the Serwist service worker builder together:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run format:check
npm run env:check
npm run typecheck
npm run lint
npm run check
npm run build
npm run log:check
```

Run `npm run format` to apply Prettier formatting. Commits use the Conventional
Commits format, for example `feat: add medicine setup`. Husky runs lint-staged
before each commit and commitlint checks the commit message. GitHub Actions runs
the same repository checks and production build for pull requests and pushes to
`main`.

The service worker only caches versioned Next.js static assets and the public
offline page. Navigation stays network only, so private HTML, React Server
Component responses, authenticated responses, and health records do not enter
Cache Storage.

## Project boundaries

Product capabilities will live in vertical feature modules under `src/`.
Shared environment, logging, session, and Supabase setup lives under
`src/platform/`. Database configuration and future migrations live under
`supabase/`.
