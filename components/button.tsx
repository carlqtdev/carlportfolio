import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-strong",
  secondary:
    "border border-line-strong bg-surface text-ink hover:bg-elevated hover:border-line-strong",
  ghost: "text-muted hover:text-ink hover:bg-elevated",
};

const sizes: Record<Size, string> = {
  sm: "h-8 rounded-md px-3 text-[0.8125rem]",
  md: "h-10 rounded-md px-4 text-sm",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

/** Anchor used for external destinations where Link's router is unnecessary. */
export function ButtonAnchor({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size }) {
  return (
    <a className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </a>
  );
}

export function IconButton({
  label,
  className,
  children,
  ...props
}: ComponentProps<"button"> & { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:bg-elevated hover:text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
