import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GlossaryDetailPage } from '@/components/pages/GlossaryDetailPage';
import { mockGlossaryTerms } from '@/lib/mocks/data';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = mockGlossaryTerms.find(t => t.slug?.current === params.slug);

  if (!term) {
    return {
      title: 'Term Not Found',
    };
  }

  return {
    title: `${term.term} - SEO Definition | Anil Varma`,
    description: term.definition,
    openGraph: {
      title: `${term.term} - SEO Glossary`,
      description: term.definition,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return mockGlossaryTerms.map((term) => ({
    slug: term.slug?.current,
  }));
}

export default function GlossaryTermPage({ params }: Props) {
  const term = mockGlossaryTerms.find(t => t.slug?.current === params.slug);

  if (!term) {
    notFound();
  }

  // Get related terms (same category, excluding current)
  const relatedTerms = mockGlossaryTerms
    .filter(t => t.category === term.category && t.slug?.current !== term.slug?.current)
    .slice(0, 6);

  return <GlossaryDetailPage term={term} relatedTerms={relatedTerms} />;
}
