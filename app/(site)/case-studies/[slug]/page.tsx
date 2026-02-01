import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyDetailPage } from '@/components/pages/CaseStudyDetailPage';
import { mockCaseStudies } from '@/lib/mocks/data';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = mockCaseStudies.find(cs => cs.slug?.current === params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} | SEO Case Study | Anil Varma`,
    description: caseStudy.excerpt,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      type: 'article',
      images: caseStudy.featuredImage?.asset?.url ? [caseStudy.featuredImage.asset.url] : [],
    },
  };
}

export async function generateStaticParams() {
  return mockCaseStudies.map((caseStudy) => ({
    slug: caseStudy.slug?.current,
  }));
}

export default function CaseStudyDetailsPage({ params }: Props) {
  const caseStudy = mockCaseStudies.find(cs => cs.slug?.current === params.slug);

  if (!caseStudy) {
    notFound();
  }

  // Get related case studies (same industry, excluding current)
  const relatedCaseStudies = mockCaseStudies
    .filter(cs => cs.industry === caseStudy.industry && cs.slug?.current !== caseStudy.slug?.current)
    .slice(0, 2);

  return <CaseStudyDetailPage caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
}
