# Carl Peñaranda — Portfolio

A single-page developer portfolio with a résumé page, dark mode and a contact
form. Built with Next.js, Tailwind CSS and TypeScript, and deployed on Vercel.

- **Home** — hero, about (biography and skills), and a contact section.
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
