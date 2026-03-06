"use client";

import { AuthCard } from "@/components/auth-card";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/password-reset/request", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email") })
    });
    const data = await res.json();
    setMessage(data.message ?? data.error);
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <AuthCard>
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your email and we&apos;ll send a 6-digit code.</p>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
          <button className="w-full rounded-xl bg-slate-900 py-3 text-white">Send verification code</button>
        </form>
        {message && <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{message}</p>}
      </AuthCard>
    </main>
  );
}
