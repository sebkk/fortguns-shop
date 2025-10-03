/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

import net from 'net';
import tls from 'tls';

import globalInfos from '@/constants/api/global-infos';

const USER_EMAIL_RAW = globalInfos.contact_infos.find(
  ({ type }) => type === 'mail',
)?.href;

// Remove mailto: prefix if present
const USER_EMAIL = USER_EMAIL_RAW?.replace(/^mailto:/, '');

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
    // SMTP configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '');
    const password = process.env.EMAIL_PASSWORD;

    const username = USER_EMAIL;

    if (!username || !password) {
      reject(new Error('Email credentials not configured'));
      return;
    }

    if (!smtpHost || !smtpPort) {
      reject(new Error('SMTP host and port must be configured'));
      return;
    }

    console.debug('SMTP Configuration:', {
      host: smtpHost,
      port: smtpPort,
      username: username,
      hasPassword: !!password,
    });

    // Debug: Check if username is properly formatted
    console.debug('Username details:', {
      raw: USER_EMAIL_RAW,
      processed: username,
      length: username?.length,
    });

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
    let authMethod = 'PLAIN'; // Start with PLAIN, fallback to LOGIN if needed

    const sendCommand = (command: string) => {
      return new Promise((resolve, reject) => {
        const currentSocket = tlsSocket || socket;
        console.debug('SMTP Command:', command);
        currentSocket.write(command + '\r\n');

        let responseData = '';
        let timeout: NodeJS.Timeout = null as unknown as NodeJS.Timeout;

        const onData = (data: Buffer) => {
          responseData += data.toString();

          // Check if response is complete (ends with \r\n)
          if (responseData.endsWith('\r\n')) {
            clearTimeout(timeout);
            currentSocket.removeListener('data', onData);
            const response = responseData.trim();
            console.debug('SMTP Response:', response);

            // Check if response indicates success (2xx or 3xx codes)
            const lines = response.split('\r\n');
            const lastLine = lines[lines.length - 1];
            const statusCode = lastLine.substring(0, 3);

            if (statusCode.startsWith('2') || statusCode.startsWith('3')) {
              resolve(response);
            } else {
              // Check if it's an authentication error and we can retry with LOGIN
              if (
                (statusCode === '535' || statusCode === '530') &&
                authMethod === 'PLAIN' &&
                step === 4
              ) {
                console.debug('AUTH PLAIN failed, trying AUTH LOGIN');
                authMethod = 'LOGIN';
                step = 4; // Retry authentication with LOGIN method
                resolve(response); // Don't reject, retry instead
              } else {
                reject(new Error(`SMTP Error (${statusCode}): ${response}`));
              }
            }
          }
        };

        // Set timeout for command response
        timeout = setTimeout(() => {
          currentSocket.removeListener('data', onData);
          reject(new Error(`SMTP command timeout: ${command}`));
        }, 30000); // 30 second timeout

        currentSocket.on('data', onData);
      });
    };

    const connect = () => {
      if (smtpPort === 465) {
        // Port 465 uses SSL/TLS from the start (SMTPS)
        tlsSocket = tls.connect(
          smtpPort,
          smtpHost,
          {
            rejectUnauthorized: false,
          },
          () => {
            console.debug(`Connected to ${smtpHost}:${smtpPort} with SSL/TLS`);
            handleSMTP();
          },
        );

        tlsSocket.on('error', (err: Error) => {
          console.error('TLS socket error:', err);
          reject(err);
        });
      } else {
        // Port 587 or 25 - regular connection
        socket = net.createConnection(smtpPort, smtpHost, () => {
          console.debug(`Connected to ${smtpHost}:${smtpPort}`);
          handleSMTP();
        });

        socket.on('error', (err: Error) => {
          console.error('Socket error:', err);
          reject(err);
        });
      }
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
            } else if (smtpPort === 465) {
              // Port 465 already uses SSL/TLS, skip STARTTLS and go directly to auth
              step = 4;
            } else {
              step = 3; // Skip TLS for port 25
            }
            break;
          case 2:
            // Upgrade to TLS (only for port 587)
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
            console.debug('Starting authentication with username:', username);
            if (authMethod === 'PLAIN') {
              // Try AUTH PLAIN first (more compatible)
              const authString = `\0${username}\0${password}`;
              await sendCommand(
                `AUTH PLAIN ${Buffer.from(authString).toString('base64')}`,
              );
              step = 7; // Skip to MAIL FROM after successful auth
            } else {
              // Fallback to AUTH LOGIN
              await sendCommand('AUTH LOGIN');
              step++;
            }
            break;
          case 5:
            // AUTH LOGIN - send username
            console.debug('Sending username in base64');
            await sendCommand(Buffer.from(username).toString('base64'));
            step++;
            break;
          case 6:
            // AUTH LOGIN - send password
            console.debug('Sending password in base64');
            await sendCommand(Buffer.from(password).toString('base64'));
            step = 7; // Skip to MAIL FROM after successful auth
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
        data: error,
      },
      { status: 500 },
    );
  }
}
