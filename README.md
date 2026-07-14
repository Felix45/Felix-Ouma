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

## Project structure

```
app/
  page.tsx                     Home (hero, about, skills, featured projects, contact)
  projects/page.tsx            All projects, with a tech-stack filter
  projects/[slug]/page.tsx     Project detail page
  admin/
    login/                     Admin sign-in (Server Action + Auth.js Credentials)
    (dashboard)/                Route group: everything below requires a session
      page.tsx                 Project list — reorder / edit / delete
      projects/new/             Create a project
      projects/[id]/edit/       Edit a project
      messages/                 Contact form submissions
  api/
    projects/                  CRUD Route Handlers (GET public, writes admin-only)
    projects/reorder/          Bulk reorder endpoint
    contact/                   POST (public, rate-limited) + GET (admin-only)
    auth/[...nextauth]/        Auth.js route handler
  sitemap.ts / robots.ts / opengraph-image.tsx   SEO file conventions
auth.ts                        Auth.js configuration
proxy.ts                       Route protection for /admin/* (Next 16's renamed middleware.ts)
lib/
  db.ts                        Prisma client singleton
  projects.ts / contact.ts     Data-access layer (used directly by Server Components —
                                see note below)
  validations.ts                Zod schemas shared by forms and API routes
  rate-limit.ts                 In-memory rate limiter for the contact endpoint
components/                    Shared UI (nav, footer, forms, admin widgets, etc.)
prisma/
  schema.prisma                Project + ContactMessage models
  seed.ts                      Seeds 3 sample projects
test/
  api/                         Vitest tests for the Route Handlers
```

**Why Server Components call `lib/projects.ts` directly instead of fetching
`/api/projects`:** the Next.js docs explicitly warn that a Server Component
fetching its own Route Handler adds a needless network hop and breaks static
prerendering. The API routes are still a fully-functional public CRUD surface
(used by the admin dashboard's client-side interactivity, and available to any
external consumer); Server Components just read from the same underlying data
layer directly, which is the documented best practice.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | `file:./dev.db` locally; a Postgres connection string in production |
| `AUTH_SECRET` | Session signing secret — generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` | The one admin account's email |
| `ADMIN_PASSWORD_HASH` | A bcrypt hash — generate with `node scripts/hash-password.mjs "your-password"` |
| `NEXT_PUBLIC_SITE_URL` | Base URL used in metadata, OG tags, and the sitemap |

> **Gotcha:** Next.js expands `$VAR`-style references when it loads `.env`
> files. A bcrypt hash starts with `$2b$10$...`, which gets silently mangled
> unless every `$` is escaped as `\$`. `scripts/hash-password.mjs` already
> prints the escaped form — paste its output as-is. This escaping is only
> needed for local `.env` files; env vars set through a hosting provider's
> dashboard (e.g. Vercel) bypass this parsing and don't need it.

## Getting started

```bash
npm install
cp .env.example .env
node scripts/hash-password.mjs "your-password"   # paste the output into ADMIN_PASSWORD_HASH
npm run db:migrate                                # creates dev.db and applies the schema
npm run db:seed                                   # seeds 3 sample projects
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
for the dashboard (sign in with `ADMIN_EMAIL` / the password you hashed
above).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | ESLint (Next 16 removed `next lint`; this runs the ESLint CLI directly) |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run db:migrate` | Apply Prisma migrations (dev) |
| `npm run db:seed` | Re-run the seed script |
| `npm run db:studio` | Open Prisma Studio |

## Testing

```bash
npm test
```

Tests call the exported `GET`/`POST`/`PATCH`/`DELETE` functions from the
Route Handlers directly (they're plain async functions, not React
components), against a throwaway SQLite database created fresh for each test
run (`test/global-setup.ts`). `next-auth`'s `auth()` is mocked per-test so
authenticated and unauthenticated cases can both be exercised without a real
session.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. **Swap SQLite for Postgres.** Vercel's serverless functions have an
   ephemeral, effectively read-only filesystem — a local SQLite file won't
   persist between requests. Provision a Postgres database (Vercel Postgres,
   Neon, Supabase, etc.), then:
   - Set `DATABASE_URL` to the Postgres connection string.
   - In `prisma/schema.prisma`, change `provider = "sqlite"` to
     `provider = "postgresql"`.
   - In `lib/db.ts` (and `prisma/seed.ts`), swap the
     `@prisma/adapter-better-sqlite3` adapter for `@prisma/adapter-pg` (or
     drop the adapter entirely if you prefer Prisma's default connection
     handling for Postgres).
   - Run `npx prisma migrate deploy` against the new database.
3. Set the remaining environment variables (`AUTH_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD_HASH`, `NEXT_PUBLIC_SITE_URL`) in the Vercel project
   settings.
4. Deploy. Vercel runs `npm run build`, which includes `prisma generate` via
   the `postinstall` script.

## Replacing the résumé link

The "Download résumé" button in the About section points at
`siteConfig.resumeUrl` (`/resume.pdf` by default) in `lib/site-config.ts`.
Drop your résumé at `public/resume.pdf`, or point `resumeUrl` at an external
link.

## Extending the contact form with email

`lib/contact.ts` has a marked hook point (`createContactMessage`) where you
can call an email provider (Resend, Nodemailer, etc.) after a message is
saved, without touching the API route or the form.
