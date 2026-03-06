import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect("/login");

  return (
    <main className="section flex gap-6 py-10">
      <DashboardSidebar />
      <div className="flex-1 space-y-6">
        <div className="glass rounded-2xl p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Joined {user.createdAt.toDateString()}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["MRR", "Active Users", "Retention"].map((item) => (
            <div key={item} className="glass rounded-2xl p-6">
              <p className="text-sm text-slate-500">{item}</p>
              <p className="mt-3 text-2xl font-semibold">+24%</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
