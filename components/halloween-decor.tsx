import type { SVGProps } from "react";

/**
 * Halloween scenery: fog, corner cobwebs, a hanging spider and a few bats.
 * It paints in both light and dark themes. Everything is decorative,
 * non-interactive and hidden from assistive technology.
 */
export function HalloweenDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="spooky-fog absolute inset-0" />
      <div className="spooky-vignette absolute inset-0" />

      <Cobweb className="absolute -top-6 -left-6 h-44 w-44 text-accent/25 sm:h-60 sm:w-60" />
      <Cobweb className="absolute -top-6 -right-6 h-44 w-44 -scale-x-100 text-accent/20 sm:h-60 sm:w-60" />

      <div className="spooky-spider absolute top-16 right-[8%] hidden text-accent-alt/60 md:block">
        <Spider className="h-28 w-11" />
      </div>

      <div className="spooky-bat spooky-bat-1 absolute left-0 w-12 text-accent-alt/70 sm:w-16">
        <Bat className="h-auto w-full" />
      </div>
      <div className="spooky-bat spooky-bat-2 absolute left-0 w-9 text-accent/60 sm:w-12">
        <Bat className="h-auto w-full" />
      </div>
      <div className="spooky-bat spooky-bat-3 absolute left-0 w-7 text-accent-alt/50 sm:w-10">
        <Bat className="h-auto w-full" />
      </div>
    </div>
  );
}

function Cobweb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
      {...props}
    >
      <path d="M0 0h160M0 0l160 40M0 0l128 80M0 0l80 128M0 0l40 160M0 0v160" />
      <path d="M36 0C36 20 20 36 0 36M72 0C72 40 40 72 0 72M108 0C108 60 60 108 0 108M144 0C144 80 80 144 0 144" />
    </svg>
  );
}

function Bat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M.75 8S5 7 8 9c0 0 .5 3.75 2.5 3.75V11s.5 1 1.5 1s1.5-1 1.5-1v1.75C15.5 12.75 16 9 16 9c3-2 7.25-1 7.25-1c-2 1-2.25 4.5-2.25 4.5c-4 0-4 3.25-4 3.25c-5-1-5 2.75-5 2.75s0-3.75-5-2.75c0 0 0-3.25-4-3.25C3 12.5 2.75 9 .75 8" />
    </svg>
  );
}

function Spider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 120" fill="none" aria-hidden="true" {...props}>
      <path
        d="M24 0v52"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="2 3"
      />
      <ellipse cx="24" cy="66" rx="7" ry="9" fill="currentColor" />
      <circle cx="24" cy="57" r="3.5" fill="currentColor" />
      <path
        d="M18 63 7 57M18 67 5 67M18 71 7 79M30 63l11-6M30 67l13 0M30 71l11 8"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
