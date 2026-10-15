import { absoluteUrl } from "@/lib/utils";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in the hosting environment
 * (Vercel) to your production domain.
 */
export const siteUrl = absoluteUrl("/");

export const siteConfig = {
  name: "Carl Peñaranda",
  role: "Web Developer",
  title: "Carl Peñaranda — Web Developer",
  description:
    "Web developer and designer based in Glan, Sarangani Province. I build responsive, accessible websites.",
  url: siteUrl,
  locale: "en_PH",
} as const;

/** Shared defaults so every route inherits consistent metadata. */
export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website" as const,
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};
