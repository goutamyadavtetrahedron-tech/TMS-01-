import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, mobile, linkedin, coverLetter, role } = data;
    
    if (!name || !email || !mobile || !coverLetter) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Email content for admin
    const adminTo = process.env.CAREER_RECEIVER || 'hrd@tetrahedron.in';
    const adminSubject = `New Job Application: ${role}`;
    const adminText = `
Role: ${role}
Name: ${name}
Email: ${email}
Mobile: ${mobile}
LinkedIn: ${linkedin || 'Not provided'}

Cover Letter:
${coverLetter}
    `;
    const adminHtml = `
      <h2>New Job Application for ${role}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : 'Not provided'}</p>
      <h3>Cover Letter:</h3>
      <p>${coverLetter.replace(/\n/g, '<br/>')}</p>
    `;

    // Email content for user confirmation
    const userTo = email;
    const userSubject = `Application Received: ${role}`;
    const userText = `Dear ${name},\n\nThank you for applying for the ${role} position at Tetrahedron.\n\nWe have received your application and will review it shortly.\n\nBest regards,\nTetrahedron Team`;
    const userHtml = `<p>Dear ${name},</p><p>Thank you for applying for the <strong>${role}</strong> position at Tetrahedron.</p><p>We have received your application and will review it shortly.</p><p>Best regards,<br/>Tetrahedron Team</p>`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
      },
    });

    // Send to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: adminTo,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
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
