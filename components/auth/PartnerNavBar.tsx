"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePartnerAuth } from "@/lib/auth/partner-auth";

const partnerLinks = [
  { href: "/partner", label: "Dashboard" },
  { href: "/partner/marktplatz", label: "Marktplatz" },
  { href: "/partner/trend-radar", label: "Trend-Radar" },
];

export function PartnerNavBar() {
  const pathname = usePathname();
  const { user, logout } = usePartnerAuth();

  if (pathname === "/partner/login") return null;

  return (
    <div className="border-b border-[var(--crafty-border)] bg-[var(--crafty-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          {partnerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--crafty-ink)] hover:bg-[var(--crafty-bg)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[var(--crafty-muted)]">{user.name}</span>
            <button onClick={logout} className="font-medium text-[var(--crafty-accent-dark)] hover:underline">
              Abmelden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
