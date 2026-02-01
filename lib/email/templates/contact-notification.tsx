import * as React from 'react';

/**
 * Contact Form Notification Email
 *
 * Sent to Anil when someone submits the contact form
 */

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
  timestamp,
}: ContactNotificationEmailProps) {
  return (
    <html>
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            margin: 0;
          }
          .content {
            padding: 32px;
          }
          .info-box {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .info-row {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #475569;
            width: 120px;
            flex-shrink: 0;
          }
          .info-value {
            color: #0f172a;
          }
          .message-box {
            background-color: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .cta-button {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            margin: 16px 0;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>🔔 New Contact Form Submission</h1>
          </div>

          <div className="content">
            <p style={{ fontSize: '16px', color: '#475569', marginBottom: '24px' }}>
              You have received a new message from your website contact form.
            </p>

            <div className="info-box">
              <div className="info-row">
                <div className="info-label">Name:</div>
                <div className="info-value">{name}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Email:</div>
                <div className="info-value">
                  <a href={`mailto:${email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    {email}
                  </a>
                </div>
              </div>
              {subject && (
                <div className="info-row">
                  <div className="info-label">Subject:</div>
                  <div className="info-value">{subject}</div>
                </div>
              )}
              <div className="info-row">
                <div className="info-label">Time:</div>
                <div className="info-value">{timestamp}</div>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
              Message:
            </h3>
            <div className="message-box">{message}</div>

            <center>
              <a href={`mailto:${email}?subject=Re: ${subject || 'Your message'}`} className="cta-button">
                Reply to {name}
              </a>
            </center>

            <p style={{ marginTop: '32px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>
              This is an automated notification from your website contact form.
            </p>
          </div>

          <div className="footer">
            <p>anilvarma.com Contact Form Notification</p>
            <p style={{ marginTop: '8px' }}>
              © {new Date().getFullYear()} Anil Varma
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
