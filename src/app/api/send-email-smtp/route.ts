/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

import net from 'net';
import tls from 'tls';

import globalInfos from '@/constants/api/global-infos';

const USER_EMAIL = globalInfos.contact_infos.find(
  ({ type }) => type === 'mail',
)?.href;

// SMTP email sending using Node.js built-in modules
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
  return new Promise((resolve, reject) => {
    // SMTP configuration for home.pl
    const smtpHost = process.env.SMTP_HOST || 'smtp.home.pl';
    const smtpPort = parseInt(process.env.SMTP_PORT || '');
    const password = process.env.EMAIL_PASSWORD;

    const username = USER_EMAIL;

    if (!username || !password) {
      reject(new Error('Email credentials not configured'));
      return;
    }

    // Create the email message in MIME format
    const boundary = '----=_Part_' + Math.random().toString(36).substr(2, 9);
    const message = [
      `From: ${from}`,
      `To: ${to}`,
      `Reply-To: ${replyTo}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      html,
      `--${boundary}--`,
    ].join('\r\n');

    let socket: net.Socket | tls.TLSSocket;
    let tlsSocket: tls.TLSSocket;
    let step = 0;

    const sendCommand = (command: string) => {
      return new Promise((resolve, reject) => {
        const currentSocket = tlsSocket || socket;
        currentSocket.write(command + '\r\n');

        currentSocket.once('data', (data: Buffer) => {
          const response = data.toString();
          console.debug('SMTP Response:', response);

          if (response.startsWith('2') || response.startsWith('3')) {
            resolve(response);
          } else {
            reject(new Error(`SMTP Error: ${response}`));
          }
        });
      });
    };

    const connect = () => {
      socket = net.createConnection(smtpPort, smtpHost, () => {
        console.debug(`Connected to ${smtpHost}:${smtpPort}`);
        handleSMTP();
      });

      socket.on('error', (err: Error) => {
        console.error('Socket error:', err);
        reject(err);
      });
    };

    const handleSMTP = async () => {
      try {
        switch (step) {
          case 0:
            await sendCommand('EHLO localhost');
            step++;
            break;
          case 1:
            if (smtpPort === 587) {
              await sendCommand('STARTTLS');
              step++;
            } else {
              step = 3; // Skip TLS for port 25
            }
            break;
          case 2:
            // Upgrade to TLS
            tlsSocket = tls.connect(
              {
                socket: socket,
                rejectUnauthorized: false,
              },
              () => {
                console.log('TLS connection established');
                step++;
                handleSMTP();
              },
            );
            tlsSocket.on('error', (err: Error) => {
              console.error('TLS error:', err);
              reject(err);
            });
            return;
          case 3:
            await sendCommand('EHLO localhost');
            step++;
            break;
          case 4:
            await sendCommand('AUTH LOGIN');
            step++;
            break;
          case 5:
            await sendCommand(Buffer.from(username).toString('base64'));
            step++;
            break;
          case 6:
            await sendCommand(Buffer.from(password).toString('base64'));
            step++;
            break;
          case 7:
            await sendCommand(`MAIL FROM:<${from}>`);
            step++;
            break;
          case 8:
            await sendCommand(`RCPT TO:<${to}>`);
            step++;
            break;
          case 9:
            await sendCommand('DATA');
            step++;
            break;
          case 10:
            await sendCommand(message + '\r\n.');
            step++;
            break;
          case 11:
            await sendCommand('QUIT');
            resolve({ success: true, messageId: 'smtp-' + Date.now() });
            return;
        }

        if (step < 12) {
          setTimeout(handleSMTP, 100);
        }
      } catch (error) {
        console.error('SMTP Error:', error);
        reject(error);
      }
    };

    connect();
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, title, message, email: senderEmail, name } = body;

    // Validate required fields
    if (!topic || !title || !message || !senderEmail || !name) {
      return NextResponse.json(
        { success: false, error: 'formErrorRootMissingRequiredFields' },
        { status: 400 },
      );
    }

    // Check if required environment variables are set
    if (!USER_EMAIL || !process.env.EMAIL_PASSWORD) {
      console.error('formErrorEmailServiceNotConfigured');
      return NextResponse.json(
        { success: false, error: 'formErrorEmailServiceNotConfigured' },
        { status: 500 },
      );
    }

    const companyEmail = USER_EMAIL;

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Nowa wiadomość z formularza kontaktowego
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Dane kontaktowe</h3>
          <p><strong>Od:</strong> ${senderEmail}</p>
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
    await sendSMTPEmail({
      to: companyEmail,
      subject: `${topic}: ${title}`,
      html: htmlContent,
      from: USER_EMAIL,
      replyTo: senderEmail,
    });

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
      },
      { status: 500 },
    );
  }
}
