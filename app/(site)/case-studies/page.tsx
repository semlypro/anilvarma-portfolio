import { Metadata } from 'next';
import { CaseStudiesListingPage } from '@/components/pages/CaseStudiesListingPage';
import { getAllCaseStudies } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'SEO Case Studies | Real Results & Success Stories | Anil Varma',
  description: 'Explore detailed SEO case studies showcasing real results. Learn how strategic SEO drives organic growth across various industries.',
  openGraph: {
    title: 'SEO Case Studies | Real Results & Success Stories | Anil Varma',
    description: 'Explore detailed SEO case studies showcasing real results. Learn how strategic SEO drives organic growth across various industries.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function CaseStudiesPage() {
  // Fetch from Sanity
  const caseStudies = await getAllCaseStudies().catch(() => []);

  // Extract unique industries
  const industries = Array.from(new Set(caseStudies.map(cs => cs.industry))).filter(Boolean);

  return (
    <CaseStudiesListingPage
      caseStudies={caseStudies}
      industries={industries as string[]}
    />
  );
}
