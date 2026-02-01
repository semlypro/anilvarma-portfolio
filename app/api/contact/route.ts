import {NextRequest, NextResponse} from 'next/server';
import {client} from '@/lib/sanity/client';
import {contactFormSchema} from '@/lib/utils/validation';
import {sendEmail} from '@/lib/email/resend';
import {ContactNotificationEmail} from '@/lib/email/templates/contact-notification';
import {ContactConfirmationEmail} from '@/lib/email/templates/contact-confirmation';
import {groq} from 'next-sanity';

/**
 * Contact Form API Route
 * POST /api/contact
 *
 * Handles contact form submissions
 * - Validates form data
 * - Creates contact in Sanity
 * - Sends notification email to Anil
 * - Sends confirmation email to user
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: validation.error.errors.map(err => err.message)
        },
        {status: 400}
      );
    }

    const {name, email, subject, message} = validation.data;

    // Check if email exists in contacts
    const existingContact = await client.fetch(
      groq`*[_type == "contact" && email == $email][0]{
        _id,
        tags
      }`,
      {email}
    );

    if (existingContact) {
      // Update existing contact
      await client
        .patch(existingContact._id)
        .set({
          name,
          tags: [...(existingContact.tags || []), 'contact-form'],
          metadata: {
            lastContactedAt: new Date().toISOString(),
            lastMessage: message,
            lastSubject: subject
          }
        })
        .commit();
    } else {
      // Create new contact
      await client.create({
        _type: 'contact',
        email,
        name,
        source: 'contact_form',
        tags: ['contact-form'],
        createdAt: new Date().toISOString(),
        metadata: {
          firstMessage: message,
          firstSubject: subject
        }
      });
    }

    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Send notification email to Anil
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.EMAIL_FROM || 'anil@anilvarma.com';

    await sendEmail({
      to: notificationEmail,
      subject: `New Contact Form: ${subject || 'No Subject'} - From ${name}`,
      react: ContactNotificationEmail({
        name,
        email,
        subject,
        message,
        timestamp
      })
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Thank you for reaching out!',
      react: ContactConfirmationEmail({
        name,
        message
      })
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {status: 500}
    );
  }
}
