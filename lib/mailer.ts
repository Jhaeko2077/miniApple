import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationCode(email: string, code: string) {
  await transporter.sendMail({
    from: `"miniApple Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your miniApple verification code",
    html: `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.5; color: #0f172a;">
        <h2>Password Verification Code</h2>
        <p>Use the verification code below to continue your secure action:</p>
        <p style="font-size: 28px; letter-spacing: 8px; font-weight: 700;">${code}</p>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `
  });
}
