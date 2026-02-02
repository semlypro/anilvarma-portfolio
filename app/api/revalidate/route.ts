import {revalidatePath, revalidateTag} from 'next/cache';
import {NextRequest, NextResponse} from 'next/server';
import {createHmac} from 'crypto';

/**
 * Sanity Webhook Handler for On-Demand Revalidation
 *
 * When content is updated in Sanity CMS, this endpoint receives a webhook
 * and revalidates the affected Next.js pages.
 *
 * Security: Validates webhook signature using SANITY_WEBHOOK_SECRET
 */

interface SanityWebhookPayload {
  _id: string;
  _type: string;
  slug?: {
    current: string;
  };
}

/**
 * Verify Sanity webhook signature
 */
function verifySignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) {
    return false;
  }

  const hash = createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return `sha256=${hash}` === signature;
}

/**
 * Determine which paths to revalidate based on document type
 */
function getRevalidationPaths(document: SanityWebhookPayload): string[] {
  const {_type, slug} = document;
  const paths: string[] = [];

  switch (_type) {
    case 'blogPost':
      paths.push('/blog');
      if (slug?.current) {
        paths.push(`/blog/${slug.current}`);
      }
      paths.push('/'); // Homepage may show featured posts
      break;

    case 'comparisonPost':
      paths.push('/blog');
      if (slug?.current) {
        paths.push(`/blog/${slug.current}`);
      }
      break;

    case 'listiclePost':
      paths.push('/blog');
      if (slug?.current) {
        paths.push(`/blog/${slug.current}`);
      }
      break;

    case 'template':
      paths.push('/templates');
      if (slug?.current) {
        paths.push(`/templates/${slug.current}`);
      }
      paths.push('/'); // Homepage may show featured templates
      break;

    case 'seoAgent':
      paths.push('/seo-agents');
      if (slug?.current) {
        paths.push(`/seo-agents/${slug.current}`);
      }
      break;

    case 'caseStudy':
      paths.push('/case-studies');
      if (slug?.current) {
        paths.push(`/case-studies/${slug.current}`);
      }
      break;

    case 'glossaryTerm':
      paths.push('/glossary');
      if (slug?.current) {
        paths.push(`/glossary/${slug.current}`);
      }
      break;

    case 'homepage':
      paths.push('/');
      break;

    case 'about':
      paths.push('/about');
      break;

    case 'siteSettings':
      // Site settings affect all pages
      paths.push('/');
      break;

    case 'navigation':
      // Navigation affects all pages
      paths.push('/');
      break;

    case 'testimonial':
      // Testimonials may appear on homepage and case studies
      paths.push('/');
      paths.push('/case-studies');
      break;

    case 'blogCategory':
      paths.push('/blog');
      if (slug?.current) {
        paths.push(`/blog/category/${slug.current}`);
      }
      break;

    case 'templateCategory':
      paths.push('/templates');
      break;

    case 'agentCategory':
      paths.push('/seo-agents');
      break;

    case 'newsletterIssue':
      paths.push('/newsletter');
      break;

    case 'speakingEvent':
      paths.push('/speaking');
      break;

    default:
      // For unknown types, revalidate homepage as fallback
      paths.push('/');
  }

  return paths;
}

export async function POST(request: NextRequest) {
  try {
    // Check if webhook secret is configured
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('SANITY_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        {error: 'Webhook not configured'},
        {status: 500}
      );
    }

    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('sanity-webhook-signature');

    // Verify webhook signature
    if (!verifySignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        {error: 'Invalid signature'},
        {status: 401}
      );
    }

    // Parse the webhook payload
    const payload: SanityWebhookPayload = JSON.parse(body);

    // Get paths to revalidate
    const paths = getRevalidationPaths(payload);

    // Revalidate all affected paths
    for (const path of paths) {
      revalidatePath(path);
      console.log(`Revalidated: ${path}`);
    }

    // Also revalidate by tag if document has an ID
    if (payload._id) {
      revalidateTag(payload._id, {});
    }

    return NextResponse.json({
      success: true,
      revalidated: paths,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {status: 500}
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    {error: 'Method not allowed. Use POST.'},
    {status: 405}
  );
}
