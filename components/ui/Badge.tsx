import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  color?: string;
  className?: string;
};

export function Badge({ children, color, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      style={color ? { backgroundColor: `${color}1a`, color } : undefined}
    >
      {children}
    </span>
  );
}
