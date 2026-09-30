"use client";

import { useState } from "react";
import { MockUser } from "@/lib/auth/types";
import { Button } from "@/components/ui/Button";

type LoginFormProps = {
  title: string;
  description: string;
  defaultUser: { name: string; email: string };
  onSuccess: (user: MockUser) => void;
};

export function LoginForm({ title, description, defaultUser, onSuccess }: LoginFormProps) {
  const [name, setName] = useState(defaultUser.name);
  const [email, setEmail] = useState(defaultUser.email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSuccess({
      name: name.trim() || defaultUser.name,
      email: email.trim() || defaultUser.email,
      provider: "email",
    });
  }

  function handleGoogleLogin() {
    onSuccess({ name: defaultUser.name, email: defaultUser.email, provider: "google" });
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-[var(--crafty-border)] bg-[var(--crafty-surface)] p-8">
      <h1 className="text-xl font-bold text-[var(--crafty-ink)]">{title}</h1>
      <p className="mt-1 text-sm text-[var(--crafty-muted)]">{description}</p>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--crafty-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--crafty-ink)] transition-colors hover:bg-[var(--crafty-bg)]"
      >
        <GoogleIcon />
        Mit Google anmelden
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-[var(--crafty-muted)]">
        <span className="h-px flex-1 bg-[var(--crafty-border)]" />
        oder
        <span className="h-px flex-1 bg-[var(--crafty-border)]" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-[var(--crafty-ink)]">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-[var(--crafty-border)] bg-[var(--crafty-surface)] px-3 py-2 text-sm"
            placeholder={defaultUser.name}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-[var(--crafty-ink)]">
          E-Mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-[var(--crafty-border)] bg-[var(--crafty-surface)] px-3 py-2 text-sm"
            placeholder={defaultUser.email}
          />
        </label>

        <Button type="submit" className="mt-2 w-full">
          Anmelden
        </Button>
      </form>

      <p className="mt-5 text-center text-xs text-[var(--crafty-muted)]">
        Dies ist ein Prototyp — das Login ist simuliert. Einfach auf „Anmelden&quot; klicken, die Felder
        sind bereits vorausgefüllt.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6 29.5 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-1.8 14.1-5.1l-6.5-5.5C29.5 35.4 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.5 5.5C41.1 35.9 44 30.4 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}
