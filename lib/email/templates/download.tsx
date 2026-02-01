import * as React from 'react';

/**
 * Download Email Template
 *
 * Sent when user downloads a template
 */

interface DownloadEmailProps {
  firstName?: string;
  templateName: string;
  downloadUrl: string;
  relatedTemplates?: {
    name: string;
    slug: string;
  }[];
}

export function DownloadEmail({
  firstName,
  templateName,
  downloadUrl,
  relatedTemplates = [],
}: DownloadEmailProps) {
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
          .download-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            margin: 32px 0;
          }
          .download-box h3 {
            color: #1d4ed8;
            font-size: 18px;
            margin: 0 0 16px 0;
          }
          .cta-button {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
          }
          .related-templates {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 24px;
            margin: 32px 0;
          }
          .related-templates h3 {
            color: #0f172a;
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 16px 0;
          }
          .template-link {
            display: block;
            color: #3b82f6;
            text-decoration: none;
            padding: 8px 0;
            font-weight: 500;
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
          .expiry-notice {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 12px 16px;
            margin: 16px 0;
            font-size: 14px;
            color: #92400e;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Your Template is Ready!</h1>
          </div>

          <div className="content">
            <h2>Hi {firstName || 'there'}! 👋</h2>

            <p>
              Thank you for downloading <strong>{templateName}</strong>. Your
              template is ready and waiting for you!
            </p>

            <div className="download-box">
              <h3>📥 Download Your Template</h3>
              <a href={downloadUrl} className="cta-button">
                Download Now
              </a>
            </div>

            <div className="expiry-notice">
              <strong>⏰ Note:</strong> This download link expires in 24 hours
              for security purposes.
            </div>

            <p>
              This template is designed to help you streamline your SEO workflow
              and achieve better results. If you have any questions about using
              it, feel free to reply to this email.
            </p>

            {relatedTemplates.length > 0 && (
              <div className="related-templates">
                <h3>You might also like:</h3>
                {relatedTemplates.map((template, index) => (
                  <a
                    key={index}
                    href={`https://anilvarma.com/templates/${template.slug}`}
                    className="template-link"
                  >
                    → {template.name}
                  </a>
                ))}
              </div>
            )}

            <p style={{ marginTop: '32px' }}>
              Want more SEO resources? Check out my latest blog posts, try the
              AI-powered SEO agents, or explore my case studies.
            </p>

            <p style={{ marginTop: '24px' }}>
              Happy optimizing!
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
              <a href="https://anilvarma.com/templates">More Templates</a> |{' '}
              <a href="https://anilvarma.com/blog">Blog</a>
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
