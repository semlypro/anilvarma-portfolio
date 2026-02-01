import { Metadata } from 'next';
import { TemplatesListingPage } from '@/components/pages/TemplatesListingPage';
import { getAllTemplates } from '@/lib/sanity/fetch';
import { mockEnrichedTemplates } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'Free SEO Templates | Download & Optimize | Anil Varma',
  description: 'Download free SEO templates, checklists, and spreadsheets. Professionally crafted tools to streamline your SEO workflow.',
  openGraph: {
    title: 'Free SEO Templates | Download & Optimize | Anil Varma',
    description: 'Download free SEO templates, checklists, and spreadsheets. Professionally crafted tools to streamline your SEO workflow.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function TemplatesPage() {
  // Fetch from Sanity
  const templates = await getAllTemplates().catch(() => []);

  // Use Sanity data if available, otherwise fall back to mock data
  const useTemplates = templates.length > 0 ? templates : mockEnrichedTemplates;

  // Extract unique categories
  const categories = Array.from(new Set(useTemplates.map(t => {
    if (typeof t.category === 'object' && t.category?.title) {
      return t.category.title;
    }
    return t.category as string;
  }))).filter(Boolean);

  // Extract unique formats
  const formats = Array.from(new Set(useTemplates.map(t => t.format))).filter(Boolean);

  return (
    <TemplatesListingPage
      templates={useTemplates}
      categories={categories as string[]}
      formats={formats as string[]}
    />
  );
}
