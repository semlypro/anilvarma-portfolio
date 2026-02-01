import { Metadata } from 'next';
import { AgentsListingPage } from '@/components/pages/AgentsListingPage';
import { mockSEOAgents } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'AI SEO Agents | Powered by Claude | Anil Varma',
  description: 'Explore AI-powered SEO agents that automate keyword research, content optimization, technical audits, and more. Built on Claude Sonnet API.',
  openGraph: {
    title: 'AI SEO Agents | Powered by Claude | Anil Varma',
    description: 'Explore AI-powered SEO agents that automate keyword research, content optimization, technical audits, and more. Built on Claude Sonnet API.',
    type: 'website',
  },
};

// Extract unique categories
const categories = Array.from(new Set(mockSEOAgents.map(a => a.category))).filter(Boolean);

export default function AgentsPage() {
  return (
    <AgentsListingPage
      agents={mockSEOAgents}
      categories={categories as string[]}
    />
  );
}
