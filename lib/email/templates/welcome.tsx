import * as React from 'react';

/**
 * Welcome Email Template
 *
 * Sent to new newsletter subscribers
 */

interface WelcomeEmailProps {
  firstName?: string;
}

export function WelcomeEmail({firstName}: WelcomeEmailProps) {
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
          .cta-button {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            margin: 24px 0;
          }
          .benefits {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
          }
          .benefits ul {
            margin: 0;
            padding-left: 20px;
          }
          .benefits li {
            color: #334155;
            margin-bottom: 8px;
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
            <h1>Welcome to Anil Varma's Newsletter!</h1>
          </div>

          <div className="content">
            <h2>Hi {firstName || 'there'}! 👋</h2>

            <p>
              Thank you for subscribing to my newsletter! I'm excited to share
              my latest insights on SEO, technical optimization, and digital
              strategy with you.
            </p>

            <div className="benefits">
              <p style={{fontWeight: 600, color: '#0f172a', marginBottom: '12px'}}>
                Here's what you can expect:
              </p>
              <ul>
                <li>Weekly SEO tips and strategies</li>
                <li>Case studies and real-world examples</li>
                <li>Exclusive templates and tools</li>
                <li>Industry insights and trends</li>
                <li>Early access to new content and resources</li>
              </ul>
            </div>

            <p>
              In the meantime, explore my latest blog posts, download free SEO
              templates, and try out the AI-powered SEO agents.
            </p>

            <center>
              <a href="https://anilvarma.com/blog" className="cta-button">
                Explore Latest Posts
              </a>
            </center>

            <p style={{marginTop: '32px', fontSize: '14px', color: '#64748b'}}>
              Have questions or topics you'd like me to cover? Just reply to
              this email – I read every response!
            </p>

            <p style={{marginTop: '24px'}}>
              Cheers,
              <br />
              <strong>Anil Varma</strong>
              <br />
              <span style={{color: '#64748b', fontSize: '14px'}}>
                International SEO & Technical SEO Expert
              </span>
            </p>
          </div>

          <div className="footer">
            <p>
              <a href="https://anilvarma.com">anilvarma.com</a> |{' '}
              <a href="https://anilvarma.com/unsubscribe">Unsubscribe</a>
            </p>
            <p style={{marginTop: '8px'}}>
              © {new Date().getFullYear()} Anil Varma. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
