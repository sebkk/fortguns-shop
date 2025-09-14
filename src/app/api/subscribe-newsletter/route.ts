import { NextRequest, NextResponse } from 'next/server';

const MAILER_LITE_SECRET_TOKEN = process.env.MAILER_LITE_SECRET_TOKEN;
const MAILER_LITE_EMAIL_SERVICE_ID = process.env.MAILER_LITE_EMAIL_SERVICE_ID;

interface NewsletterSubscriptionRequest {
  email: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API token
    if (!MAILER_LITE_SECRET_TOKEN) {
      return NextResponse.json(
        { error: 'MailerLite API token not configured' },
        { status: 500 },
      );
    }

    // Parse request body
    const body: NewsletterSubscriptionRequest = await request.json();
    const { email, name, fields } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Prepare subscriber data for MailerLite
    const subscriberData = {
      email: email,
      ...(name && { name: name }),
      ...(fields && { fields: fields }),
      // ...(MAILER_LITE_GROUP_ID && { groups: [MAILER_LITE_GROUP_ID] }), // TODO: optionally add group ID
    };

    // Make request to MailerLite API
    const response = await fetch(
      `${MAILER_LITE_EMAIL_SERVICE_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${MAILER_LITE_SECRET_TOKEN}`,
        },
        body: JSON.stringify(subscriberData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle MailerLite API errors
      if (response.status === 422) {
        return NextResponse.json(
          {
            error: 'Validation error',
            details: data.errors || data.message,
          },
          { status: 422 },
        );
      }

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API token' },
          { status: 401 },
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { error: data.message || 'Failed to subscribe to newsletter' },
        { status: response.status },
      );
    }

    // Success response
    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter',
        subscriber: {
          id: data.data?.id,
          email: data.data?.email,
          status: data.data?.status,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
