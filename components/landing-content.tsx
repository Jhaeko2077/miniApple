"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

export function LandingContent() {
  return (
    <main className="bg-hero-gradient">
      <section className="section pt-28 text-center">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Build your premium SaaS with Apple-level elegance.
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }} className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          A production-ready Next.js stack with secure auth, polished interactions, and modern dashboard foundations.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }} className="mt-10 flex justify-center gap-4">
          <Link href="/signup"><Button size="lg">Start free</Button></Link>
          <Link href="#features"><Button variant="outline" size="lg">Explore features</Button></Link>
        </motion.div>
      </section>

      <section id="features" className="section grid gap-6 md:grid-cols-3">
        <FeatureCard title="Modern Auth" description="NextAuth credentials, bcrypt hashing, JWT sessions, and secure reset flows." />
        <FeatureCard title="Apple Aesthetics" description="Large typography, glass surfaces, soft shadows, and fluid motion with Framer." />
        <FeatureCard title="PostgreSQL + Prisma" description="Railway-hosted Postgres with a clean schema and production-safe API routes." />
      </section>

      <section className="section">
        <div className="glass rounded-[2.5rem] p-10 text-center md:p-16">
          <h2 className="text-3xl font-semibold md:text-5xl">Designed for clarity. Engineered for scale.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-300">A polished product surface inspired by Apple product showcases and iCloud authentication patterns.</p>
        </div>
      </section>

      <section className="section grid gap-6 md:grid-cols-3">
        {["Teams ship faster.", "Security feels invisible.", "Users stay delighted."].map((quote) => (
          <div key={quote} className="glass rounded-2xl p-6">
            <p className="text-lg">“{quote}”</p>
          </div>
        ))}
      </section>
    </main>
  );
}
