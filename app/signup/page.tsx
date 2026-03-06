"use client";

import { AuthCard } from "@/components/auth-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("password") !== form.get("confirmPassword")) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });
    setLoading(false);

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setMessage(data.error ?? "Unable to create account.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center p-6 bg-hero-gradient">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <AuthCard>
          <h1 className="text-center text-3xl font-semibold">Create your account</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input name="email" type="email" placeholder="Email" required className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-500" />
            <input name="password" type="password" placeholder="Password" required className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-500" />
            <input name="confirmPassword" type="password" placeholder="Confirm password" required className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-500" />
            {message && <p className="text-sm text-red-500">{message}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white">{loading ? "Creating..." : "Create Account"}</button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">Already have an account? <Link href="/login" className="underline">Sign in</Link></p>
        </AuthCard>
      </motion.div>
    </main>
  );
}
