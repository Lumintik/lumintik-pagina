# Lumintik — website

Site for **Lumintik Developers SAS**. Built with Next.js 16 (App Router),
React 19 and Tailwind CSS v4. Spanish (`/es`) is the default and English
(`/en`) mirrors it page for page. Pages are server components; copy lives in
`src/i18n/` and facts in `src/data/`.

Design rules: two tones (#0A0A0A and #FAFAFA), Poppins, text pure black or
white, colour only in client logos, tool logos and project photos, no dashes as
punctuation and no horizontal rules. A fact the team has not confirmed is set
to `null` and renders as a visible "[dato pendiente]" marker.

## Getting started

```bash
bun install      # or: npm install
bun dev          # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form (`src/components/sections/ContactSection.tsx`) posts to a
Server Action (`src/app/actions/contact.ts`) that emails submissions over SMTP.

1. Copy the env template and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```
2. Set `SMTP_PASSWORD` to a Google **App Password** for `SMTP_USER`
   (Google Account → Security → 2-Step Verification → App passwords).
3. Restart `bun dev`. Submissions are delivered to `CONTACT_TO`.

`.env.local` is gitignored — never commit real credentials. On Vercel, set the
same variables under **Project → Settings → Environment Variables**.

## Project structure

```
src/
  app/[locale]/   Home, casos/[slug], gobierno, privacidad, services/[slug]
  components/
    home/         Home page sections
    cases/        Case study building blocks
    site/         Navbar, Footer, Logo, LanguageSwitcher
    ui/           Section, Pill, Flag, ToolPill, TrackedLink
  data/           Cases, clients, tools, services, company legal data
  i18n/           Spanish and English copy (site, government, privacy, services)
  lib/            Locale, localized routes, SEO, analytics, share cards
scripts/          build-deck-pdf.mjs
```

English URLs (`/en/cases`, `/en/government`, `/en/privacy`) are rewritten onto
the Spanish folders in `next.config.ts`.

## Public sector PDF

`public/documentos/lumintik-sector-publico-{es,en}.pdf` is printed from the
public sector page. After changing that page, regenerate it:

```bash
npm run build && npm start
node scripts/build-deck-pdf.mjs http://localhost:3000
```

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `bun dev`       | Start the dev server       |
| `bun run build` | Production build           |
| `bun start`     | Serve the production build |
| `bun run lint`  | Run ESLint                 |

## Deploy

Deploys to [Vercel](https://vercel.com). Remember to configure the SMTP
environment variables in the Vercel project before the contact form will send.
