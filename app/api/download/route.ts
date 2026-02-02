import {NextRequest, NextResponse} from 'next/server';
import {client} from '@/lib/sanity/client';
import {downloadRequestSchema} from '@/lib/utils/validation';
import {sendEmail} from '@/lib/email/resend';
import {DownloadEmail} from '@/lib/email/templates/download';
import {groq} from 'next-sanity';
import * as crypto from 'crypto';

/**
 * Download API Route
 * POST /api/download
 *
 * Email gate for template downloads
 * - Validates email and templateId
 * - Creates contact in Sanity if new
 * - Sends download email with signed URL
 * - Increments download count
 */

interface Template {
  _id: string;
  name: string;
  slug: { current: string };
  fileUrl: string;
  category?: {
    _id: string;
    name: string;
  };
}

interface RelatedTemplate {
  name: string;
  slug: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = downloadRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: validation.error.issues.map(err => err.message)
        },
        {status: 400}
      );
    }

    const {templateId, email, name} = validation.data;

    // Fetch template from Sanity
    const template = await client.fetch<Template>(
      groq`*[_type == "template" && slug.current == $templateId][0]{
        _id,
        name,
        slug,
        fileUrl,
        category->
      }`,
      {templateId}
    );

    if (!template) {
      return NextResponse.json(
        {error: 'Template not found'},
        {status: 404}
      );
    }

    // Check if email exists in contacts
    const existingContact = await client.fetch(
      groq`*[_type == "contact" && email == $email][0]`,
      {email}
    );

    // Create contact if new
    if (!existingContact) {
      await client.create({
        _type: 'contact',
        email,
        name,
        source: 'template_download',
        sourceId: template._id,
        tags: ['template-download', template.category?.name?.toLowerCase()],
        createdAt: new Date().toISOString(),
        metadata: {
          firstTemplate: template.name,
          templateSlug: template.slug.current
        }
      });
    }

    // Generate signed download URL (expires in 24 hours)
    const downloadToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const signedUrl = `${template.fileUrl}?token=${downloadToken}&expires=${expiresAt}`;

    // Fetch related templates from same category
    const relatedTemplates = await client.fetch<RelatedTemplate[]>(
      groq`*[_type == "template" && category._ref == $categoryId && _id != $templateId][0...3]{
        name,
        "slug": slug.current
      }`,
      {categoryId: template.category?._id, templateId: template._id}
    );

    // Send download email
    const firstName = name?.split(' ')[0];
    await sendEmail({
      to: email,
      subject: `Your ${template.name} is ready!`,
      react: DownloadEmail({
        firstName,
        templateName: template.name,
        downloadUrl: signedUrl,
        relatedTemplates
      })
    });

    // Increment download count
    await client
      .patch(template._id)
      .inc({downloadCount: 1})
      .commit();

    return NextResponse.json({
      success: true,
      message: 'Check your email for the download link',
      templateName: template.name
    });
  } catch (error) {
    console.error('Download API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process download request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {status: 500}
    );
  }
}
