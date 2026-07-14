# Felix Ouma — Portfolio

A full-stack personal portfolio built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, Prisma, and Auth.js. Includes a public site (home, project
listing, project detail pages) and a protected `/admin` dashboard for managing
projects and reading contact form submissions.

> **Note on Next.js version:** this project targets **Next.js 16**, which has
> several breaking changes relative to older tutorials/training data —
> `middleware.ts` is renamed to `proxy.ts`, `next lint` is removed in favor of
> the ESLint CLI, PPR is now an opt-in `cacheComponents` flag, etc. See
> `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` if
> something looks unfamiliar.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19.2)
- **Styling:** Tailwind CSS v4, dark-mode-default "terminal" theme with a
  light mode toggle
- **Database:** Prisma 7 + SQLite locally (via the `better-sqlite3` driver
  adapter), swappable for Postgres in production
- **Auth:** Auth.js (NextAuth) v5, single credentials-based admin user
- **Validation:** Zod, shared between client forms and API routes
- **Forms:** React Hook Form
- **Animation:** Motion (the successor to Framer Motion)
- **Testing:** Vitest, run directly against the Route Handler functions
