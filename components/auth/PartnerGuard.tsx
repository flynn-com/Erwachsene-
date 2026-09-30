"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePartnerAuth } from "@/lib/auth/partner-auth";

export function PartnerGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = usePartnerAuth();
  const isLoginPage = pathname === "/partner/login";

  useEffect(() => {
    if (isLoaded && !user && !isLoginPage) {
      router.replace(`/partner/login`);
    }
  }, [isLoaded, user, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (!isLoaded || !user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-sm text-[var(--crafty-muted)]">
        Prüfe Anmeldung …
      </div>
    );
  }

  return <>{children}</>;
}
