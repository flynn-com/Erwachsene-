"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCustomerAuth } from "@/lib/auth/customer-auth";

const customerLinks = [
  { href: "/", label: "Start" },
  { href: "/kurse", label: "Kurse" },
  { href: "/standort", label: "Standort" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isPartner = pathname?.startsWith("/partner");
  const { user, logout } = useCustomerAuth();
  const isLoginPage = pathname === "/login";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--crafty-border)] bg-[var(--crafty-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-[var(--crafty-ink)]">
          Atelierhaus
        </Link>

        {!isPartner && (
          <nav className="hidden items-center gap-6 sm:flex">
            {customerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--crafty-accent-dark)] ${
                  pathname === link.href ? "text-[var(--crafty-accent-dark)]" : "text-[var(--crafty-ink)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!isPartner && !isLoginPage && (
            <>
              {user ? (
                <div className="hidden items-center gap-2 text-sm sm:flex">
                  <span className="text-[var(--crafty-muted)]">Hallo, {user.name.split(" ")[0]}</span>
                  <button onClick={logout} className="font-medium text-[var(--crafty-accent-dark)] hover:underline">
                    Abmelden
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden text-sm font-semibold text-[var(--crafty-ink)] hover:underline sm:block">
                  Anmelden
                </Link>
              )}
            </>
          )}

          <div className="flex items-center gap-2 rounded-full border border-[var(--crafty-border)] bg-[var(--crafty-surface)] p-1 text-xs font-semibold">
            <Link
              href="/"
              className={`rounded-full px-3 py-1.5 transition-colors ${
                !isPartner ? "bg-[var(--crafty-ink)] text-white" : "text-[var(--crafty-muted)]"
              }`}
            >
              Kunde
            </Link>
            <Link
              href="/partner"
              className={`rounded-full px-3 py-1.5 transition-colors ${
                isPartner ? "bg-[var(--crafty-ink)] text-white" : "text-[var(--crafty-muted)]"
              }`}
            >
              Partner
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
