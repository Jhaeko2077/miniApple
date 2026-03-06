"use client";

import { AuthCard } from "@/components/auth-card";
import { FormEvent, useState } from "react";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/password-reset/verify", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        code: form.get("code"),
        password: form.get("password")
      })
    });
    const data = await res.json();
    setMessage(data.message ?? data.error);
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <AuthCard>
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
          <input name="code" maxLength={6} required placeholder="6-digit code" className="w-full rounded-xl border px-4 py-3 tracking-[0.4em]" />
          <input name="password" type="password" required placeholder="New password" className="w-full rounded-xl border px-4 py-3" />
          <button className="w-full rounded-xl bg-slate-900 py-3 text-white">Update password</button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </AuthCard>
    </main>
  );
}
