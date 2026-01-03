# AGENTS.md — Core Rules

## Invariants (must always be respected)

- Next.js 14 App Router
- Server components by default
- Auth / Prisma / CI must not break
- No secrets or env changes
- Build, lint, type-check must pass

## Preferences (follow unless justified)

- Reuse existing components before creating new ones
- Prefer composition and variants over duplication
- Tailwind + Radix over custom CSS
- Server actions over API routes when possible

## Freedom

- You may propose UX or architecture improvements
- You may create new components if reuse is not reasonable
- You may suggest refactors (do not apply without approval)

## Workflow

- Plan → Code → Verify → Summarize

## Stack notes

- Next.js 14 App Router (TypeScript) with `@/*` alias; React Query provider is mounted in `app/layout.tsx`.
- Auth: NextAuth v5 + Prisma (MySQL). `auth.ts` maps `AUTH_*`/`NEXTAUTH_*` envs; middleware expects `NEXTAUTH_SECRET`. Keep `DATABASE_URL` + `NEXTAUTH_URL`/`AUTH_URL` set locally.
- Content lives in Prisma (`Page`, `Entity`, `BlogPost`, `FAQ*`); rich text stored as TipTap JSON strings.
- File uploads go through `/api/files` into `EXTERNAL_UPLOAD_DIR` (default `/home/zoutigo/projets/nextjs/files`) and are served by `/api/external-files/[...path]` with MIME/size checks.

## Dev commands

- `npm run dev` to develop; `npm run lint`, `npm run type-check`, `npm test` before shipping.
- DB setup: `npm run prisma:migrate:dev && npm run prisma:seed` (seeds pages, entities, FAQ, blog posts; no users).
- Prod boot: `npm run prod` runs install → build → migrate/seed → `start.js`/`server.js`; don’t break these scripts.

## UI / UX patterns

- Use Tailwind theme tokens and shadcn-style components in `components/ui/*` (`Button`, `Card`, `Dialog`, `Form`, etc.) with `cn` helper; prefer variants over new CSS.
- Reuse layout helpers (`Navbar`, `Footer`, `Breadcrumb`, `PageHolder`, landing blocks) before creating new shells.
- Rich text edit/render via `components/forms/text-editor` and `components/tiptap/page-content`; keep TipTap JSON intact.
- Guard protected UI with `GradeGate` / `RoleGate` and `hooks/use-current-*`; favor server components and server actions for mutations.

## Routing & data flow

- Public/auth/protected routes live in `routes.ts`; middleware relies on them. Update routes + nav structure there when adding sections.
- Server actions live in `actions/*` and rely on zod schemas in `schemas/index.ts`; prefer these over new API routes. Prisma helpers in `data/*` / `lib/auth`.
- Prisma schema has Debian OpenSSL binary targets—preserve when editing `schema.prisma`.
