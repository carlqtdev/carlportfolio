import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { type SocialIcon, socials } from "@/content/profile";
import { cn } from "@/lib/utils";

const iconFor: Record<SocialIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
};

/**
 * Links to the profiles in `content/profile.ts`. Renders nothing when there is
 * nothing left to show, so the site is safe to ship without any.
 */
export function SocialLinks({
  className,
  exclude = [],
}: {
  className?: string;
  /** Icons to hide, e.g. `["mail"]` where the email is already shown nearby. */
  exclude?: SocialIcon[];
}) {
  const links = socials.filter((social) => !exclude.includes(social.icon));

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((social) => {
        const Icon = iconFor[social.icon];
        const isExternal = social.href.startsWith("http");

        return (
          <li key={social.label}>
            <a
              href={social.href}
              {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:bg-elevated hover:text-ink"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {social.label}
              {isExternal ? (
                <span className="sr-only"> (opens in a new tab)</span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
