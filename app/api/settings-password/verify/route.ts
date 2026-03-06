import { emailSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const email = emailSchema.safeParse(body.email);
  const code = String(body.code ?? "");
  if (!email.success || !/^\d{6}$/.test(code)) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const verifyRecord = await prisma.passwordResetCode.findFirst({
    where: { email: email.data, code },
    orderBy: { createdAt: "desc" }
  });
  if (!verifyRecord || verifyRecord.expiresAt < new Date()) return NextResponse.json({ error: "Code invalid or expired." }, { status: 400 });

  const pending = await prisma.passwordResetCode.findFirst({
    where: { email: `${email.data}:pending` },
    orderBy: { createdAt: "desc" }
  });
  if (!pending || pending.expiresAt < new Date()) return NextResponse.json({ error: "Password update request expired." }, { status: 400 });

  await prisma.user.update({ where: { email: email.data }, data: { password: pending.code } });
  await prisma.passwordResetCode.deleteMany({ where: { email: { in: [email.data, `${email.data}:pending`] } } });

  return NextResponse.json({ message: "Password changed successfully." });
}
