import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "ghost-invert";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

const variantClasses: Record<string, string> = {
  primary: "bg-[var(--crafty-ink)] text-white hover:bg-black",
  secondary: "bg-[var(--crafty-accent)] text-[var(--crafty-ink)] hover:brightness-95",
  ghost: "bg-transparent text-[var(--crafty-ink)] border border-[var(--crafty-ink)] hover:bg-[var(--crafty-ink)] hover:text-white",
  "ghost-invert": "bg-transparent text-white border border-white/70 hover:bg-white hover:text-[var(--crafty-accent-dark)]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
