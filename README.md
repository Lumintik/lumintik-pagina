# Lumintik — website

Marketing site for **Lumintik SAS**, a software engineering studio. Built with
Next.js 16 (App Router), React 19, Tailwind CSS v4 and a Spline 3D hero. UI copy
is bilingual (EN/ES) via a lightweight client-side locale provider.

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
  app/            App Router entry, metadata, sitemap/robots/manifest, actions
  components/
    sections/     Page sections (Hero, Navbar, ProjectsShowcase, Footer, …)
    effects/      Splash, LogoLoop marquee
    ui/           Small shared UI (LanguageSwitcher, MarqueeRow)
    providers/    LocaleProvider (EN/ES)
  data/           Projects and services content
  i18n/           EN/ES message catalogs
  lib/            Small helpers (cn, locale)
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
