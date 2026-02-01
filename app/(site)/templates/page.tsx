import { Metadata } from 'next';
import { TemplatesListingPage } from '@/components/pages/TemplatesListingPage';
import { getAllTemplates } from '@/lib/sanity/fetch';

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

  // Extract unique categories
  const categories = Array.from(new Set(templates.map(t => {
    if (typeof t.category === 'object' && t.category?.title) {
      return t.category.title;
    }
    return t.category as string;
  }))).filter(Boolean);

  // Extract unique formats
  const formats = Array.from(new Set(templates.map(t => t.fileFormat))).filter(Boolean);

  return (
    <TemplatesListingPage
      templates={templates}
      categories={categories as string[]}
      formats={formats as string[]}
    />
  );
}
