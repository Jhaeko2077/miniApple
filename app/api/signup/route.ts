import { emailSchema, passwordSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = emailSchema.safeParse(body.email);
  const pwParsed = passwordSchema.safeParse(body.password);

  if (!parsed.success || !pwParsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email: parsed.data } });
  if (exists) return NextResponse.json({ error: "Email already exists." }, { status: 409 });

  const hashed = await bcrypt.hash(pwParsed.data, 12);
  await prisma.user.create({ data: { email: parsed.data, password: hashed } });

  return NextResponse.json({ message: "Account created." });
}
