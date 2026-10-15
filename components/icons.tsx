import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Outline({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Outline>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M20 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Outline>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 3.5v11" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4.5 20h15" />
    </Outline>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Outline>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16.2v.3" />
    </Outline>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <Outline {...props} strokeWidth={2}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </Outline>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Outline {...props} strokeWidth={1.8}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </Outline>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Outline {...props} strokeWidth={1.8}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Outline>
  );
}
