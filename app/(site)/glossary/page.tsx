import { Metadata } from 'next';
import { GlossaryListingPage } from '@/components/pages/GlossaryListingPage';
import { getAllGlossaryTerms } from '@/lib/sanity/fetch';
import { mockGlossaryTerms } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'SEO Glossary | 200+ Terms Explained | Anil Varma',
  description: 'Comprehensive SEO glossary with 200+ terms explained. From algorithms to zero-click searches, learn essential SEO terminology.',
  openGraph: {
    title: 'SEO Glossary | 200+ Terms Explained | Anil Varma',
    description: 'Comprehensive SEO glossary with 200+ terms explained. From algorithms to zero-click searches, learn essential SEO terminology.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function GlossaryPage() {
  // Fetch from Sanity
  const glossaryTerms = await getAllGlossaryTerms().catch(() => []);

  // Use Sanity data if available, otherwise fall back to mock data
  const useTerms = glossaryTerms.length > 0 ? glossaryTerms : mockGlossaryTerms;

  // Group terms by first letter
  const termsByLetter = useTerms.reduce((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof useTerms>);

  // Get unique categories
  const categories = Array.from(new Set(useTerms.map(t => t.category))).filter(Boolean);

  return (
    <GlossaryListingPage
      terms={useTerms}
      termsByLetter={termsByLetter}
      categories={categories as string[]}
    />
  );
}
