import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Centred, width-constrained page gutter shared by every section. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
