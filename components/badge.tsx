import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-wide",
        tone === "accent"
          ? "border-transparent bg-accent-soft text-accent"
          : "border-line text-faint",
        className,
      )}
    >
      {children}
    </span>
  );
}
