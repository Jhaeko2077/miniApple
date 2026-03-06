import { checkRateLimit } from "@/lib/rate-limit";
import { emailSchema, passwordSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendVerificationCode } from "@/lib/mailer";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const email = emailSchema.safeParse(body.email);
  const currentPassword = passwordSchema.safeParse(body.currentPassword);
  const newPassword = passwordSchema.safeParse(body.newPassword);
  if (!email.success || !currentPassword.success || !newPassword.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: email.data } });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const validCurrent = await bcrypt.compare(currentPassword.data, user.password);
  if (!validCurrent) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });

  const limit = checkRateLimit(`settings:${email.data}`);
  if (!limit.allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.passwordResetCode.create({
    data: {
      email: email.data,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    }
  });

  await sendVerificationCode(email.data, code);
  const hashedNew = await bcrypt.hash(newPassword.data, 12);
  await prisma.passwordResetCode.create({
    data: { email: `${email.data}:pending`, code: hashedNew, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }
  });

  return NextResponse.json({ message: "Verification code sent." });
}
