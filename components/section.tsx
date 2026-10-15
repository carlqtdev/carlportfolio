import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/**
 * A page section. When `title` is provided the section is labelled by its
 * heading so the header nav can link to it and screen readers can announce it.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-24 border-t border-line py-16 sm:py-24", className)}
    >
      <Container>
        {title ? (
          <header className="mb-10 sm:mb-14">
            {eyebrow ? (
              <p className="mb-3 font-mono text-xs tracking-[0.14em] text-accent uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={headingId}
              className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-3 max-w-2xl text-[0.9375rem] leading-7 text-muted">
                {description}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
