import { Metadata } from 'next';
import { CaseStudiesListingPage } from '@/components/pages/CaseStudiesListingPage';
import { mockCaseStudies } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'SEO Case Studies | Real Results & Success Stories | Anil Varma',
  description: 'Explore detailed SEO case studies showcasing real results. Learn how strategic SEO drives organic growth across various industries.',
  openGraph: {
    title: 'SEO Case Studies | Real Results & Success Stories | Anil Varma',
    description: 'Explore detailed SEO case studies showcasing real results. Learn how strategic SEO drives organic growth across various industries.',
    type: 'website',
  },
};

// Extract unique industries
const industries = Array.from(new Set(mockCaseStudies.map(cs => cs.industry))).filter(Boolean);

export default function CaseStudiesPage() {
  return (
    <CaseStudiesListingPage
      caseStudies={mockCaseStudies}
      industries={industries as string[]}
    />
  );
}
