import { Metadata } from 'next';
import { CaseStudiesListingPage } from '@/components/pages/CaseStudiesListingPage';
import { getAllCaseStudies } from '@/lib/sanity/fetch';
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

export const revalidate = 60;

export default async function CaseStudiesPage() {
  // Fetch from Sanity
  const caseStudies = await getAllCaseStudies().catch(() => []);

  // Use Sanity data if available, otherwise fall back to mock data
  const useCaseStudies = caseStudies.length > 0 ? caseStudies : mockCaseStudies;

  // Extract unique industries
  const industries = Array.from(new Set(useCaseStudies.map(cs => cs.industry))).filter(Boolean);

  return (
    <CaseStudiesListingPage
      caseStudies={useCaseStudies}
      industries={industries as string[]}
    />
  );
}
