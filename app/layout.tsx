import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { CustomerAuthProvider } from "@/lib/auth/customer-auth";

export const metadata: Metadata = {
  title: "CRAFTY – Kreativkurse unter einem Dach",
  description:
    "CRAFTY ist die Location in München, die Zeichnen, Malen, Töpfern, Sticken, Steinhauen, Rage Room, Yoga, Pilates und Kochkurse unter einem Dach bündelt – mit echten Markenkooperationen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <CustomerAuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[var(--crafty-border)] py-8 text-center text-xs text-[var(--crafty-muted)]">
            CRAFTY Prototyp · München · dies ist eine Demo-Webseite ohne echte Buchungen
          </footer>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}
