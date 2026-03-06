import { checkRateLimit } from "@/lib/rate-limit";
import { emailSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendVerificationCode } from "@/lib/mailer";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = emailSchema.safeParse(body.email);
  if (!parsed.success) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

  const limit = checkRateLimit(`reset:${parsed.data}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: `Too many requests. Retry in ${limit.retryAfter}s.` }, { status: 429 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.passwordResetCode.create({ data: { email: parsed.data, code, expiresAt } });
  await sendVerificationCode(parsed.data, code);

  return NextResponse.json({ message: "Verification code sent to your email." });
}
