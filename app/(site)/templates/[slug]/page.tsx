import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TemplateDetailPage } from '@/components/pages/TemplateDetailPage';
import { mockTemplates } from '@/lib/mocks/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const params = await paramsPromise;
  const template = mockTemplates.find(t => t.slug?.current === params.slug);

  if (!template) {
    return {
      title: 'Template Not Found',
    };
  }

  return {
    title: `${template.title} | Free SEO Template | Anil Varma`,
    description: template.description,
    openGraph: {
      title: template.title,
      description: template.description,
      type: 'website',
      images: template.previewImage?.asset?.url ? [template.previewImage.asset.url] : [],
    },
  };
}

export async function generateStaticParams() {
  return mockTemplates.map((template) => ({
    slug: template.slug?.current,
  }));
}

export default async function TemplateDetailsPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  const template = mockTemplates.find(t => t.slug?.current === params.slug);

  if (!template) {
    notFound();
  }

  // Get related templates (same category, excluding current)
  const relatedTemplates = mockTemplates
    .filter(t => t.category === template.category && t.slug?.current !== template.slug?.current)
    .slice(0, 3);

  return <TemplateDetailPage template={template} relatedTemplates={relatedTemplates} />;
}
