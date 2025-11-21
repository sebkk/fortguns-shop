/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const SENDER_EMAIL = process.env.NEXT_PUBLIC_SENDER_EMAIL;

// SMTP email sending using nodemailer
async function sendSMTPEmail({
  to,
  subject,
  html,
  from,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  from: string;
  replyTo: string;
}) {
  // SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const password = process.env.EMAIL_PASSWORD;
  const username = SENDER_EMAIL;

  if (!username || !password) {
    throw new Error('Email credentials not configured');
  }

  // Validate password is not a placeholder
  const passwordPlaceholders = [
    '/* secret */',
    'secret',
    'password',
    'your-password',
    'changeme',
  ];
  if (
    passwordPlaceholders.some((placeholder) =>
      password.toLowerCase().includes(placeholder.toLowerCase()),
    )
  ) {
    throw new Error(
      'Email password appears to be a placeholder. Please set a valid EMAIL_PASSWORD in your environment variables.',
    );
  }

  // Check if password is not just whitespace
  if (!password.trim()) {
    throw new Error('Email password cannot be empty or whitespace only');
  }

  if (!smtpHost || !smtpPort) {
    throw new Error('SMTP host and port must be configured');
  }

  // Determine secure connection based on port
  const secure = smtpPort === 465; // Port 465 uses SSL/TLS from the start
  const requireTLS = smtpPort === 587; // Port 587 uses STARTTLS

  console.debug('SMTP Configuration:', {
    host: smtpHost,
    port: smtpPort,
    secure,
    requireTLS,
    username: username,
    hasPassword: !!password,
    passwordLength: password.length,
    // Don't log actual password, but check if it looks suspicious
    passwordLooksValid: password.length > 3 && !password.includes('secret'),
  });

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure, // true for 465, false for other ports
    auth: {
      user: username,
      pass: password,
    },
    requireTLS, // Force TLS for port 587
    tls: {
      // Do not fail on invalid certs (useful for self-signed certificates)
      rejectUnauthorized: false,
    },
    // Enable debug logging in development
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  });

  // Verify connection before sending (this will catch auth errors early)
  try {
    await transporter.verify();
    console.debug('SMTP connection verified successfully');
  } catch (verifyError) {
    const errorMessage =
      verifyError instanceof Error ? verifyError.message : 'Unknown error';
    const errorWithDetails = verifyError as Error & {
      code?: string;
      response?: string;
      responseCode?: number;
    };
    console.error('SMTP verification failed:', {
      error: errorMessage,
      code: errorWithDetails.code,
      response: errorWithDetails.response,
      responseCode: errorWithDetails.responseCode,
    });

    // Provide more helpful error message
    if (
      errorMessage.includes('535') ||
      errorMessage.includes('authentication failed')
    ) {
      throw new Error(
        `SMTP authentication failed. Please verify:
1. NEXT_PUBLIC_SENDER_EMAIL is set correctly (currently: ${username || 'not set'})
2. EMAIL_PASSWORD is set and is the correct password (not a placeholder)
3. SMTP_HOST and SMTP_PORT are correct for your email provider
4. If using Gmail, you may need an App Password instead of your regular password`,
      );
    }
    throw verifyError;
  }

  // Send email
  const info = await transporter.sendMail({
    from: from,
    to: to,
    replyTo: replyTo,
    subject: subject,
    html: html,
  });

  console.debug('Email sent successfully:', {
    messageId: info.messageId,
    response: info.response,
  });

  return {
    success: true,
    messageId: info.messageId,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, title, message, email: replyToEmail, name } = body;

    // Validate required fields
    if (!topic || !title || !message || !replyToEmail || !name) {
      return NextResponse.json(
        { success: false, error: 'formErrorRootMissingRequiredFields' },
        { status: 400 },
      );
    }

    // Check if required environment variables are set
    if (!CONTACT_EMAIL || !SENDER_EMAIL || !process.env.EMAIL_PASSWORD) {
      console.error('Email service not configured:', {
        hasContactEmail: !!CONTACT_EMAIL,
        hasSenderEmail: !!SENDER_EMAIL,
        hasPassword: !!process.env.EMAIL_PASSWORD,
      });
      return NextResponse.json(
        { success: false, error: 'formErrorEmailServiceNotConfigured' },
        { status: 500 },
      );
    }

    console.log('Email details:', {
      from: SENDER_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: replyToEmail,
      subject: `${topic}: ${title}`,
    });

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #627d4c; padding-bottom: 10px;">
          Nowa wiadomość z formularza kontaktowego
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Dane kontaktowe</h3>
          <p><strong>Od:</strong> ${replyToEmail}</p>
          <p><strong>Imię:</strong> ${name}</p>
          <p><strong>Temat:</strong> ${topic}</p>
          <p><strong>Tytuł:</strong> ${title}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #495057; margin-top: 0;">Wiadomość</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
          <p>Ta wiadomość została wysłana z formularza kontaktowego na Twojej stronie.</p>
          <p>Odpowiedz bezpośrednio na ten email, aby skontaktować się z klientem.</p>
        </div>
      </div>
    `;

    // Send email
    const emailResult = await sendSMTPEmail({
      to: CONTACT_EMAIL as string,
      subject: `${topic}: ${title}`,
      html: htmlContent,
      from: SENDER_EMAIL as string,
      replyTo: replyToEmail,
    });

    console.log('Email sent successfully:', emailResult);

    return NextResponse.json({
      success: true,
      message: 'formSuccessMailSending',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'formErrorRoot',
        data: error,
      },
      { status: 500 },
    );
  }
}
