"use client";

import { motion } from "framer-motion";

export function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="glass rounded-3xl p-8"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}
