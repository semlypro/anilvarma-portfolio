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
  // Fetch from Sanity, fallback to mock data
  let glossaryTerms = await getAllGlossaryTerms().catch(() => []);

  // Filter out any terms with invalid definition (should be string, not portable text)
  glossaryTerms = glossaryTerms.filter(term => typeof term.definition === 'string');

  // Use mock data if Sanity is empty
  if (glossaryTerms.length === 0) {
    glossaryTerms = mockGlossaryTerms;
  }

  // Group terms by first letter
  const termsByLetter = glossaryTerms.reduce((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, Array<(typeof glossaryTerms)[0]>>);

  // Get unique categories
  const categories = Array.from(new Set(glossaryTerms.map(t => t.letter))).filter(Boolean);

  return (
    <GlossaryListingPage
      terms={glossaryTerms}
      termsByLetter={termsByLetter}
      categories={categories as string[]}
    />
  );
}
