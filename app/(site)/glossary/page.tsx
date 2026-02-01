import { Metadata } from 'next';
import { GlossaryListingPage } from '@/components/pages/GlossaryListingPage';
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

// Group terms by first letter
const termsByLetter = mockGlossaryTerms.reduce((acc, term) => {
  const letter = term.term.charAt(0).toUpperCase();
  if (!acc[letter]) {
    acc[letter] = [];
  }
  acc[letter].push(term);
  return acc;
}, {} as Record<string, typeof mockGlossaryTerms>);

// Get unique categories
const categories = Array.from(new Set(mockGlossaryTerms.map(t => t.category))).filter(Boolean);

export default function GlossaryPage() {
  return (
    <GlossaryListingPage
      terms={mockGlossaryTerms}
      termsByLetter={termsByLetter}
      categories={categories as string[]}
    />
  );
}
