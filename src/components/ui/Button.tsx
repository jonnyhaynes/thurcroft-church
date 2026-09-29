import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverseOutline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium no-underline transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-deep",
  secondary: "border border-ink/25 text-ink hover:bg-paper-deep",
  ghost: "text-accent underline decoration-1 underline-offset-4 hover:decoration-2",
  // For ink grounds, where ink-on-paper reads as nothing. Callers on a dark
  // surface also need `focus-visible:outline-paper`, since the global ring is
  // accent-deep.
  inverse: "bg-paper text-ink hover:bg-paper-deep",
  inverseOutline: "border border-paper/70 text-paper hover:bg-paper/15",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  external,
}: Common & { href: string; external?: boolean }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external || /^https?:|^tel:|^mailto:/.test(href)) {
    return (
      <a href={href} className={classes} rel={external ? "noopener noreferrer" : undefined} target={external ? "_blank" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
