import { cn } from "@/lib/utils";

export function AuthCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("glass w-full max-w-md rounded-3xl p-8", className)}>{children}</div>;
}
