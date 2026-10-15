/** Join conditional class names without pulling in a runtime dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Normalise a URL by trimming any trailing slashes. */
export function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Resolve the site origin, in priority order:
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — set this once you attach a custom domain.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — injected by Vercel on every build, so a
 *    deployment on `*.vercel.app` gets correct absolute URLs with no
 *    configuration at all.
 * 3. Localhost, for `next dev`.
 */
function resolveSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured;

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) return `https://${vercelDomain}`;

  return "http://localhost:3000";
}

/**
 * Absolute URL for a route path, used by metadata and the sitemap.
 * `absoluteUrl("/")` returns the bare origin, so callers can safely join paths
 * without producing a double slash.
 */
export function absoluteUrl(path = "/"): string {
  const base = stripTrailingSlash(resolveSiteOrigin());

  if (path === "/" || path === "") return base;

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
