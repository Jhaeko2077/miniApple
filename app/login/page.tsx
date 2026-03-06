"use client";

import { AuthCard } from "@/components/auth-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });
    setLoading(false);

    if (res?.ok) router.push("/dashboard");
    else setError("Invalid email or password.");
  }

  return (
    <main className="grid min-h-screen place-items-center p-6 bg-hero-gradient">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <AuthCard>
          <h1 className="text-center text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">Sign in to your miniApple workspace.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input name="email" type="email" placeholder="Email" required className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-500" />
            <input name="password" type="password" placeholder="Password" required className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-500" />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:opacity-90">{loading ? "Signing in..." : "Sign In"}</button>
          </form>
          <div className="mt-5 flex justify-between text-sm">
            <Link href="/signup" className="text-slate-600 hover:text-slate-900 dark:text-slate-300">Create account</Link>
            <Link href="/forgot-password" className="text-slate-600 hover:text-slate-900 dark:text-slate-300">Forgot password</Link>
          </div>
        </AuthCard>
      </motion.div>
    </main>
  );
}
