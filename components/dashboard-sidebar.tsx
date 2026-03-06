import Link from "next/link";

export function DashboardSidebar() {
  return (
    <aside className="glass hidden w-64 rounded-2xl p-5 md:block">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">Workspace</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/dashboard" className="block rounded-lg px-3 py-2 hover:bg-white/60 dark:hover:bg-slate-800">Overview</Link></li>
        <li><Link href="/settings" className="block rounded-lg px-3 py-2 hover:bg-white/60 dark:hover:bg-slate-800">Settings</Link></li>
      </ul>
    </aside>
  );
}
