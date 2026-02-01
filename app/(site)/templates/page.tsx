import { Metadata } from 'next';
import { TemplatesListingPage } from '@/components/pages/TemplatesListingPage';
import { mockTemplates } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'Free SEO Templates | Download & Optimize | Anil Varma',
  description: 'Download free SEO templates, checklists, and spreadsheets. Professionally crafted tools to streamline your SEO workflow.',
  openGraph: {
    title: 'Free SEO Templates | Download & Optimize | Anil Varma',
    description: 'Download free SEO templates, checklists, and spreadsheets. Professionally crafted tools to streamline your SEO workflow.',
    type: 'website',
  },
};

// Extract unique categories
const categories = Array.from(new Set(mockTemplates.map(t => t.category))).filter(Boolean);

// Extract unique formats
const formats = Array.from(new Set(mockTemplates.map(t => t.format))).filter(Boolean);

export default function TemplatesPage() {
  return (
    <TemplatesListingPage
      templates={mockTemplates}
      categories={categories as string[]}
      formats={formats as string[]}
    />
  );
}
