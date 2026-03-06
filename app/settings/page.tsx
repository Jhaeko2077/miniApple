"use client";

import { AuthCard } from "@/components/auth-card";
import { FormEvent, useState } from "react";

export default function SettingsPage() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function requestCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      email: form.get("email"),
      currentPassword: form.get("currentPassword"),
      newPassword: form.get("newPassword")
    };
    const res = await fetch("/api/settings-password/request", { method: "POST", body: JSON.stringify(payload) });
    const data = await res.json();
    setMessage(data.message ?? data.error);
    if (res.ok) {
      setEmail(String(form.get("email")));
      setStep("verify");
    }
  }

  async function verifyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/settings-password/verify", {
      method: "POST",
      body: JSON.stringify({ email, code: form.get("code") })
    });
    const data = await res.json();
    setMessage(data.message ?? data.error);
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <AuthCard>
        <h1 className="text-2xl font-semibold">Security settings</h1>
        {step === "request" ? (
          <form onSubmit={requestCode} className="mt-5 space-y-4">
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
            <input name="currentPassword" type="password" required placeholder="Current password" className="w-full rounded-xl border px-4 py-3" />
            <input name="newPassword" type="password" required placeholder="New password" className="w-full rounded-xl border px-4 py-3" />
            <button className="w-full rounded-xl bg-slate-900 py-3 text-white">Send verification code</button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="mt-5 space-y-4">
            <input name="code" maxLength={6} required placeholder="Verification code" className="w-full rounded-xl border px-4 py-3" />
            <button className="w-full rounded-xl bg-slate-900 py-3 text-white">Confirm password change</button>
          </form>
        )}
        {message && <p className="mt-4 text-sm">{message}</p>}
      </AuthCard>
    </main>
  );
}
