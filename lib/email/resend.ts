import { Resend } from 'resend';

/**
 * Resend Email Client
 *
 * Configuration for sending transactional emails via Resend API
 */

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using Resend
 *
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param react - React component for email body
 * @returns Resend response with email ID
 */
export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Anil Varma <noreply@anilvarma.com>',
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send email to multiple recipients
 *
 * @param to - Array of recipient email addresses
 * @param subject - Email subject
 * @param react - React component for email body
 * @returns Resend response
 */
export async function sendBulkEmail({
  to,
  subject,
  react,
}: {
  to: string[];
  subject: string;
  react: React.ReactElement;
}) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Anil Varma <noreply@anilvarma.com>',
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Bulk email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export { resend };
