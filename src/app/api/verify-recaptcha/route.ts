import { NextRequest, NextResponse } from 'next/server';

// Verify reCaptcha token
async function verifyRecaptcha(
  token: string,
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY is not set');
    return { success: true }; // Skip verification in development
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    return {
      success: data.success === true,
      score: data.score,
      error: data['error-codes']?.join(', '),
    };
  } catch (error) {
    console.error('reCaptcha verification error:', error);
    return {
      success: false,
      error: 'Network error during verification',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token is required',
          verified: false,
        },
        { status: 400 },
      );
    }

    const verification = await verifyRecaptcha(token);

    return NextResponse.json({
      success: true,
      verified: verification.success,
      score: verification.score,
      error: verification.error,
    });
  } catch (error) {
    console.error('Error verifying reCaptcha:', error);
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
