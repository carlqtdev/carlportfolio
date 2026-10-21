"use client";

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

const ORDER = ["system", "light", "dark"] as const;
const LABELS = { system: "system", light: "light", dark: "dark" } as const;

/**
 * Single control that cycles system → light → dark. next-themes owns the
 * persistence and the pre-hydration script; this only renders the state and
 * the next action.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current = (ORDER as readonly string[]).includes(theme ?? "")
    ? (theme as (typeof ORDER)[number])
    : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  // The stored theme is unknown on the server, so keep the pre-hydration label
  // generic. This also keeps the button's attributes identical through hydration.
  const label = mounted
    ? `Theme: ${LABELS[current]}. Switch to ${LABELS[next]}.`
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:bg-elevated hover:text-ink",
        className,
      )}
    >
      {/* Render the glyph only after mount: the active theme is unknown on the server. */}
      {mounted ? <Glyph theme={current} /> : <span aria-hidden className="h-[18px] w-[18px]" />}
    </button>
  );
}

function Glyph({ theme }: { theme: (typeof ORDER)[number] }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (theme === "light") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }

  if (theme === "dark") {
    return (
      <svg {...common}>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </svg>
  );
}
