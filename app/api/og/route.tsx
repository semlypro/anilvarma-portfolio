import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

/**
 * Dynamic OG Image Generator
 * GET /api/og?title=Title&description=Description
 *
 * Generates Open Graph images with Anil's branding
 */

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get('title') || 'Anil Varma - SEO Expert';
    const description =
      searchParams.get('description') ||
      'International SEO & Technical SEO Consulting';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '80px',
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#0f172a',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '1000px',
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: '32px',
                  color: '#64748b',
                  margin: 0,
                  maxWidth: '900px',
                }}
              >
                {description}
              </p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: '#3b82f6',
              fontSize: '28px',
              fontWeight: '600',
            }}
          >
            <span>Anil Varma</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#64748b', fontWeight: '400' }}>anilvarma.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image API Error:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
