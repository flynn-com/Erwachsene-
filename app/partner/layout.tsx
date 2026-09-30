import Link from "next/link";

const partnerLinks = [
  { href: "/partner", label: "Dashboard" },
  { href: "/partner/marktplatz", label: "Marktplatz" },
  { href: "/partner/trend-radar", label: "Trend-Radar" },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--crafty-bg)]">
      <div className="border-b border-[var(--crafty-border)] bg-[var(--crafty-surface)]">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
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
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
