import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDynamicEmailSubject, getDynamicSenderName, formatAdminEmailHtml, formatAdminEmailText } from '@/lib/emailHelper';

export async function POST(req) {
  try {
    const data = await req.json();
    // Accept both 'requirements' and 'message' as the message field
    const { name, company, email, mobile } = data;
    const requirements = data.requirements || data.message;
    if (!name || !company || !email || !mobile || !requirements) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const payload = { ...data, requirements };

    // Email content for admin
    const adminTo = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;
    const adminSubject = getDynamicEmailSubject(payload);
    const adminText = formatAdminEmailText(payload);
    const adminHtml = formatAdminEmailHtml(payload);

    // Email content for user confirmation
    const userTo = email;
    const userSubject = 'Thank you for contacting us!';
    const userText = `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you soon.\n\nYour message:\n${requirements}\n\nBest regards,\nTetrahedron Team`;
    const userHtml = `<p>Dear ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p><p><strong>Your message:</strong><br/>${requirements}</p><p>Best regards,<br/>Tetrahedron Team</p>`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
      },
    });

    const senderName = getDynamicSenderName(payload);
    const rawFrom = process.env.SMTP_FROM || process.env.SMTP_USER;
    const fromHeader = rawFrom && !rawFrom.includes('<') ? `"${senderName}" <${rawFrom}>` : rawFrom;

    // Send to admin
    await transporter.sendMail({
      from: fromHeader,
      to: adminTo,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: fromHeader,
      to: userTo,
      subject: userSubject,
      text: userText,
      html: userHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 