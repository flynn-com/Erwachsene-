"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCustomerAuth } from "@/lib/auth/customer-auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { MockUser } from "@/lib/auth/types";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useCustomerAuth();

  function handleSuccess(user: MockUser) {
    login(user);
    const redirect = searchParams.get("redirect");
    router.push(redirect && redirect.startsWith("/") ? redirect : "/kurse");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <LoginForm
        title="Anmelden bei Atelierhaus"
        description="Melde dich an, um Kurse zu buchen und deine Buchungen zu verwalten."
        defaultUser={{ name: "Lisa", email: "lisa@atelierhaus-demo.de" }}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}
