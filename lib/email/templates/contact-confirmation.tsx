import * as React from 'react';

/**
 * Contact Form Confirmation Email
 *
 * Sent to user after they submit the contact form
 */

interface ContactConfirmationEmailProps {
  name: string;
  message: string;
}

export function ContactConfirmationEmail({
  name,
  message,
}: ContactConfirmationEmailProps) {
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
            padding: 40px 32px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
          }
          .content {
            padding: 40px 32px;
          }
          .content h2 {
            color: #0f172a;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 16px 0;
          }
          .content p {
            color: #475569;
            font-size: 16px;
            margin: 0 0 16px 0;
          }
          .message-copy {
            background-color: #f1f5f9;
            border-left: 4px solid #3b82f6;
            border-radius: 4px;
            padding: 20px;
            margin: 24px 0;
          }
          .message-copy h3 {
            color: #0f172a;
            font-size: 14px;
            font-weight: 600;
            margin: 0 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .message-copy p {
            color: #334155;
            font-size: 14px;
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .info-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
          }
          .info-box p {
            margin: 0;
            color: #1e40af;
            font-size: 14px;
          }
          .cta-section {
            text-align: center;
            margin: 32px 0;
          }
          .cta-button {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            margin: 8px;
          }
          .footer {
            background-color: #f8fafc;
            padding: 32px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
          }
          .footer a {
            color: #3b82f6;
            text-decoration: none;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Thank You for Reaching Out!</h1>
          </div>

          <div className="content">
            <h2>Hi {name}! 👋</h2>

            <p>
              Thank you for your message. I've received it and will get back to
              you as soon as possible – typically within 24-48 hours.
            </p>

            <div className="info-box">
              <p>
                <strong>✅ Your message has been successfully received</strong>
              </p>
            </div>

            <div className="message-copy">
              <h3>Your Message:</h3>
              <p>{message}</p>
            </div>

            <p>
              In the meantime, feel free to explore my resources:
            </p>

            <div className="cta-section">
              <a href="https://anilvarma.com/blog" className="cta-button">
                Read Latest Posts
              </a>
              <a href="https://anilvarma.com/templates" className="cta-button">
                Download Templates
              </a>
              <a href="https://anilvarma.com/agents" className="cta-button">
                Try SEO Agents
              </a>
            </div>

            <p style={{ marginTop: '32px', fontSize: '14px', color: '#64748b' }}>
              If you need urgent assistance or have additional questions, feel
              free to send another message or connect with me on{' '}
              <a href="https://linkedin.com/in/anilvarma" style={{ color: '#3b82f6' }}>
                LinkedIn
              </a>
              .
            </p>

            <p style={{ marginTop: '24px' }}>
              Best regards,
              <br />
              <strong>Anil Varma</strong>
              <br />
              <span style={{ color: '#64748b', fontSize: '14px' }}>
                International SEO & Technical SEO Expert
              </span>
            </p>
          </div>

          <div className="footer">
            <p>
              <a href="https://anilvarma.com">anilvarma.com</a> |{' '}
              <a href="https://anilvarma.com/blog">Blog</a> |{' '}
              <a href="https://anilvarma.com/case-studies">Case Studies</a>
            </p>
            <p style={{ marginTop: '8px' }}>
              © {new Date().getFullYear()} Anil Varma. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
