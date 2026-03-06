import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-slate-950/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          miniApple
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Login
          </Link>
          <Link href="/signup" className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white transition hover:scale-105 dark:bg-white dark:text-slate-900">
            Get Started
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
