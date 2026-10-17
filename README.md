# Carl Peñaranda — Portfolio

A single-page developer portfolio with a résumé page, dark mode and a contact
form. Built with Next.js, Tailwind CSS and TypeScript, and deployed on Vercel.

- **Home** — hero, about (biography and skills), projects, and a contact section.
- **`/resume`** — education and skills, plus a downloadable PDF.

## Stack

| Concern      | Choice                                                      |
| ------------ | ----------------------------------------------------------- |
| Framework    | Next.js 16 — App Router, Turbopack, Cache Components         |
| Language     | TypeScript, strict                                           |
| Styling      | Tailwind CSS v4 with OKLCH design tokens                     |
| Theming      | `next-themes` — class strategy, system / light / dark        |
| Animation    | `motion`, all of it disabled under `prefers-reduced-motion`  |
| Contact form | Server Action + Resend, with a `mailto:` fallback            |
| Fonts        | Geist and Geist Mono via `next/font`                         |
| SEO          | Generated metadata, sitemap, robots.txt and an OG image      |

## Getting started

Requires Node 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script              | Does                            |
| ------------------- | ------------------------------- |
| `npm run dev`       | Development server              |
| `npm run build`     | Production build                |
| `npm start`         | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | `tsc --noEmit`                  |

## Editing the content

Everything personal lives in **`content/profile.ts`** — name, role, location,
tagline, biography, skills, projects, education and email. The hero, about,
projects, contact and résumé pages all read from it, so nothing else needs
touching.

Add more entries to the `projects` array as you build them. The projects
section hides itself automatically if the array is empty, and there is still no
employment history.

Also replace **`public/resume.pdf`**, which is still a placeholder.

### Branding and metadata

- **Colours and fonts** — the token block at the top of `app/globals.css`. The
  light and dark ramps are defined in OKLCH, so changing `--accent` in both
  blocks re-themes the entire site.
- **Name, role, description, locale** — `lib/site.ts`.
- **Canonical URL** — resolved automatically. On Vercel the build falls back to
  `VERCEL_PROJECT_PRODUCTION_URL`, so a `*.vercel.app` deployment is correct
  with no configuration. Set `NEXT_PUBLIC_SITE_URL` only when you attach a
  custom domain — the value is inlined at build time, so changing it requires a
  redeploy.

## Contact form

Copy `.env.example` to `.env.local` and fill in the values:

| Variable             | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `RESEND_API_KEY`     | API key from <https://resend.com/api-keys>            |
| `CONTACT_TO_EMAIL`   | Where enquiries are delivered                         |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `Portfolio <hi@yourdomain.com>` |

Without the Resend variables the form still renders and validates, but reports
that it is not configured yet and points visitors at your email address instead.
There is a honeypot field and a best-effort in-memory rate limit — see
`app/actions/contact.ts` for the caveats.

## Deploying

1. Push to GitHub and import the repository at <https://vercel.com/new>.
2. Deploy. Nothing needs configuring, because canonical URLs, the sitemap and
   the OG image resolve themselves from `VERCEL_PROJECT_PRODUCTION_URL`.
3. Add the Resend variables whenever you want the form to send mail.
4. Set `NEXT_PUBLIC_SITE_URL` once you attach a custom domain, then redeploy.

Or deploy straight from the command line:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Every page is prerendered at build time, so changing content needs a
redeployment. That is the right trade-off here — it keeps the site fully static.

## Project structure

```
app/
  layout.tsx              root layout: fonts, theme provider, header and footer
  page.tsx                single-page home
  resume/page.tsx         résumé
  actions/contact.ts      contact Server Action
  sitemap.ts robots.ts    generated SEO endpoints
  opengraph-image.tsx     generated 1200x630 social card
  globals.css             design tokens and base styles
components/               UI primitives and shared components
sections/                 the four home page sections
content/profile.ts        your data — start here
lib/                      site config, helpers and shared types
```

Environment files, `.vercel/` and local working notes (`info.md`, `skills/`) are
gitignored and never leave this machine.

## Accessibility

- Keyboard-operable throughout, with a visible focus ring and a skip link.
- Semantic landmarks, one `h1` per page, and labelled sections and form fields.
- `aria-live` status messaging on the contact form.
- All motion respects `prefers-reduced-motion`.
- Colour tokens were chosen to clear WCAG AA for body text in both themes.

## Notes on Next.js 16

This project runs with Cache Components (`cacheComponents: true`) and Turbopack,
both enabled by default in this version.

- Content is authored as typed data imported at module scope, so pages prerender
  statically without any runtime file reads.
- Request-time values have to be isolated in a cached scope — see
  `components/copyright-year.tsx` for the pattern.
