import {NextRequest, NextResponse} from 'next/server';
import {client} from '@/lib/sanity/client';
import {subscribeRequestSchema} from '@/lib/utils/validation';
import {sendEmail} from '@/lib/email/resend';
import {WelcomeEmail} from '@/lib/email/templates/welcome';
import {groq} from 'next-sanity';

/**
 * Newsletter Subscribe API Route
 * POST /api/subscribe
 *
 * Handles newsletter subscriptions
 * - Validates email
 * - Checks for existing subscriber
 * - Creates contact in Sanity
 * - Sends welcome email
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = subscribeRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: validation.error.issues.map(err => err.message)
        },
        {status: 400}
      );
    }

    const {email, source = 'newsletter', tags = []} = validation.data;

    // Check if email already exists in contacts
    const existingContact = await client.fetch(
      groq`*[_type == "contact" && email == $email][0]{
        _id,
        email,
        source,
        tags
      }`,
      {email}
    );

    if (existingContact) {
      // Check if already subscribed to newsletter
      const isNewsletterSubscriber =
        existingContact.source === 'newsletter' ||
        existingContact.tags?.includes('newsletter');

      if (isNewsletterSubscriber) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to the newsletter',
          alreadySubscribed: true
        });
      }

      // Update existing contact to add newsletter tag
      await client
        .patch(existingContact._id)
        .set({
          tags: [...(existingContact.tags || []), 'newsletter', ...tags]
        })
        .commit();

      // Send welcome email
      await sendEmail({
        to: email,
        subject: 'Welcome to Anil Varma\'s Newsletter!',
        react: WelcomeEmail({})
      });

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        alreadySubscribed: false
      });
    }

    // Create new contact
    await client.create({
      _type: 'contact',
      email,
      source,
      tags: ['newsletter', ...tags],
      createdAt: new Date().toISOString(),
      metadata: {
        subscribedAt: new Date().toISOString(),
        subscriptionSource: source
      }
    });

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Anil Varma\'s Newsletter!',
      react: WelcomeEmail({})
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      alreadySubscribed: false
    });
  } catch (error) {
    console.error('Subscribe API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process subscription',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {status: 500}
    );
  }
}
