import { emailSchema, passwordSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const email = emailSchema.safeParse(body.email);
  const password = passwordSchema.safeParse(body.password);
  const code = String(body.code ?? "");

  if (!email.success || !password.success || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const record = await prisma.passwordResetCode.findFirst({
    where: { email: email.data, code },
    orderBy: { createdAt: "desc" }
  });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Code invalid or expired." }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password.data, 12);
  await prisma.user.update({ where: { email: email.data }, data: { password: hashed } });
  await prisma.passwordResetCode.deleteMany({ where: { email: email.data } });

  return NextResponse.json({ message: "Password successfully reset." });
}
