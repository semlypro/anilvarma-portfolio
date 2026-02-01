import { NextRequest, NextResponse } from 'next/server';

/**
 * Dynamic OG Image Generator
 * GET /api/og?title=Title&description=Description
 *
 * Generates Open Graph images with Anil's branding
 *
 * TODO: Install @vercel/og package to enable image generation
 * Run: npm install @vercel/og
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get('title') || 'Anil Varma - SEO Expert';
    const description =
      searchParams.get('description') ||
      'International SEO & Technical SEO Consulting';

    // TODO: Implement OG image generation once @vercel/og is installed
    // For now, return a placeholder response

    return NextResponse.json(
      {
        error: 'OG image generation not yet implemented',
        message:
          'Install @vercel/og package and implement ImageResponse generation',
        requestedTitle: title,
        requestedDescription: description,
        todo: [
          'npm install @vercel/og',
          'Import ImageResponse from @vercel/og',
          'Create JSX template with brand colors',
          'Return ImageResponse with PNG format',
        ],
      },
      { status: 501 }
    );

    /*
    // Implementation template for after @vercel/og is installed:

    import { ImageResponse } from '@vercel/og';

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
            backgroundColor: '#f8fafc', // neutral-50
            backgroundImage: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#0f172a', // neutral-900
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: '32px',
                  color: '#64748b', // neutral-500
                  margin: 0,
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
              color: '#3b82f6', // primary-500
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
    */
  } catch (error) {
    console.error('OG Image API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate OG image',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
