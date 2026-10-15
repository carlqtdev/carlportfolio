/** Join conditional class names without pulling in a runtime dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Normalise a URL by trimming any trailing slashes. */
export function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Absolute URL for a route path, used by metadata and the sitemap.
 * `absoluteUrl("/")` returns the bare origin, so callers can safely join paths
 * without producing a double slash.
 */
export function absoluteUrl(path = "/"): string {
  const base = stripTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  );

  if (path === "/" || path === "") return base;

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
