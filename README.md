# Portfolio

A single-page developer portfolio with a résumé page, dark mode, and a contact
form. Built with Next.js and Tailwind CSS, deployed on Vercel.

## Stack

| Concern      | Choice                                                   |
| ------------ | -------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack, Cache Components)      |
| Language     | TypeScript (strict)                                       |
| Styling      | Tailwind CSS v4 with OKLCH design tokens                  |
| Theming      | `next-themes` (class strategy, system / light / dark)      |
| Animation    | `motion` (Framer Motion), disabled under reduced motion    |
| Contact form | Server Action + Resend, with a `mailto:` fallback          |
| Fonts        | Geist and Geist Mono via `next/font`                      |

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Scripts:

```bash
npm run dev        # development server
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Making it yours

Everything you need to change lives in one file.

### `content/profile.ts`

Your name, role, tagline, biography, skills, education and email. The hero,
about, contact and résumé pages all read from here.

There is deliberately no phone number in the published content, and currently
no projects or work-experience section — add those back when you have real ones
to show.

### Résumé PDF

Replace `public/resume.pdf` (currently a placeholder) with your own export.
Nothing else needs to change.

### Branding

- **Colours and fonts:** the token block at the top of `app/globals.css`. The
  light and dark ramps are defined in OKLCH; changing `--accent` in both blocks
  re-themes the entire site.
- **Site URL, name, role, description:** `lib/site.ts`. Also set
  `NEXT_PUBLIC_SITE_URL` in your hosting environment.

## Contact form

Copy `.env.example` to `.env.local` and fill in the values:

| Variable            | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `RESEND_API_KEY`    | API key from <https://resend.com/api-keys>          |
| `CONTACT_TO_EMAIL`  | Where enquiries are delivered                       |
| `CONTACT_FROM_EMAIL`| Verified sender, e.g. `Portfolio <hi@yourdomain.com>` |

Without the Resend variables the form still renders and validates, but reports
that it is not configured yet and points visitors at your email address. There
is a honeypot field and a best-effort in-memory rate limit; see
`app/actions/contact.ts` for the caveats.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it at <https://vercel.com/new>.
3. Add the environment variables from `.env.example`, with
   `NEXT_PUBLIC_SITE_URL` set to your production domain.
4. Deploy.

Or from the command line:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

Every page is prerendered at build time. Changing content requires a
redeployment (or a webhook), which is expected for a portfolio.

## Project structure

```
app/
  layout.tsx                 root layout, fonts, theme provider, header/footer
  page.tsx                   single-page home
  resume/page.tsx            résumé page
  actions/contact.ts         contact Server Action
  sitemap.ts robots.ts       generated SEO metadata
  opengraph-image.tsx        generated 1200x630 social card
components/                  UI primitives and shared components
sections/                    home page sections
content/                     your data — start here
lib/                         site config, helpers, shared types
```

## Accessibility

- Keyboard-operable throughout, with a visible focus ring and a skip link.
- Semantic landmarks, one `h1` per page, labelled sections and form fields.
- `aria-live` status messaging on the contact form.
- All motion respects `prefers-reduced-motion`.
- Colour tokens were chosen to clear WCAG AA for body text in both themes.

## Notes on Next.js 16

This project runs with Cache Components (`cacheComponents: true`) and
Turbopack, both enabled by default in this Next.js version.

- Content is authored as typed data imported at module scope, so it prerenders
  statically without runtime file reads.
- Request-time values are isolated in cached scopes — see
  `components/copyright-year.tsx` for the pattern.
