# miniApple SaaS

Production-ready modern SaaS starter inspired by Apple design language.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + Framer Motion + shadcn-style component patterns
- NextAuth credentials + JWT sessions
- Prisma ORM + PostgreSQL (Railway)
- Nodemailer via Gmail SMTP

## Folder structure

```txt
app/
  api/
    auth/[...nextauth]/route.ts
    signup/route.ts
    password-reset/request/route.ts
    password-reset/verify/route.ts
    settings-password/request/route.ts
    settings-password/verify/route.ts
  login/page.tsx
  signup/page.tsx
  forgot-password/page.tsx
  reset-password/page.tsx
  dashboard/page.tsx
  settings/page.tsx
components/
lib/
prisma/schema.prisma
```

## Install

```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma db push
npm run dev
```

## Railway PostgreSQL setup
1. Create a Railway project.
2. Click **New Service → Database → PostgreSQL**.
3. Open the PostgreSQL service and copy the `DATABASE_URL` from **Variables**.
4. Add this value to `.env.local` as `DATABASE_URL`.
5. Run:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Gmail SMTP setup
1. Enable 2FA on your Gmail account.
2. Create an App Password.
3. Use your Gmail in `EMAIL_USER` and App Password in `EMAIL_PASS`.

## Deploy

### Vercel frontend
1. Push repo to GitHub.
2. Import the project in Vercel.
3. Add environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `NEXTAUTH_URL`).
4. Deploy.

### Railway database
- Keep PostgreSQL running on Railway and allow Vercel access through `DATABASE_URL`.
- After deploy, run Prisma migration/push from CI or locally against production DB.
