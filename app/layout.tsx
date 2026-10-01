import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { CustomerAuthProvider } from "@/lib/auth/customer-auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Atelierhaus – Kreativkurse unter einem Dach",
  description:
    "Atelierhaus ist die Location in München, die Zeichnen, Malen, Töpfern, Sticken, Steinhauen, Rage Room, Yoga, Kochen, Floristik und Weintastings unter einem Dach bündelt – mit echten Markenkooperationen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`h-full antialiased ${inter.variable}`}>
      <body className="flex min-h-full flex-col">
        <CustomerAuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[var(--crafty-border)] py-8 text-center text-xs text-[var(--crafty-muted)]">
            Atelierhaus Prototyp · München · dies ist eine Demo-Webseite ohne echte Buchungen
          </footer>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}
