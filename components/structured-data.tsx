import { education, profile, skills, socials } from "@/content/profile";
import { siteConfig } from "@/lib/site";

/**
 * `Person` structured data, so search engines can build a richer profile card
 * and connect the site to the profiles listed in `socials` via `sameAs`.
 *
 * Rendered as a native `<script>`, per the Next.js JSON-LD guide:
 * `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`.
 */
export function StructuredData() {
  // "Glan, Sarangani Province" → locality + region, derived so it stays in sync.
  const [addressLocality, addressRegion] = profile.location
    .split(",")
    .map((part) => part.trim());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      ...(addressLocality ? { addressLocality } : {}),
      ...(addressRegion ? { addressRegion } : {}),
      addressCountry: "PH",
    },
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    knowsAbout: skills,
    sameAs: socials
      .map((social) => social.href)
      .filter((href) => href.startsWith("http")),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify does not escape `<`, which could close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
