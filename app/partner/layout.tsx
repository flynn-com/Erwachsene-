import { PartnerAuthProvider } from "@/lib/auth/partner-auth";
import { PartnerGuard } from "@/components/auth/PartnerGuard";
import { PartnerNavBar } from "@/components/auth/PartnerNavBar";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PartnerAuthProvider>
      <div className="bg-[var(--crafty-bg)]">
        <PartnerNavBar />
        <PartnerGuard>
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
        </PartnerGuard>
      </div>
    </PartnerAuthProvider>
  );
}
