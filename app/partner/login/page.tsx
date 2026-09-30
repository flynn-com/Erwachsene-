"use client";

import { useRouter } from "next/navigation";
import { usePartnerAuth } from "@/lib/auth/partner-auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { MockUser } from "@/lib/auth/types";

export default function PartnerLoginPage() {
  const router = useRouter();
  const { login } = usePartnerAuth();

  function handleSuccess(user: MockUser) {
    login(user);
    router.push("/partner");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <LoginForm
        title="Partner-Login"
        description="Melde dich als Franchisenehmer an, um dein Dashboard, den Marktplatz und den Trend-Radar zu sehen."
        defaultUser={{ name: "Lisa", email: "lisa@atelierhaus-partner-demo.de" }}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
