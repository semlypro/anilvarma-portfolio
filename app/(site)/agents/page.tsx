import { Metadata } from 'next';
import { AgentsListingPage } from '@/components/pages/AgentsListingPage';
import { getAllAgents } from '@/lib/sanity/fetch';
import { mockEnrichedAgents } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'AI SEO Agents | Powered by Claude | Anil Varma',
  description: 'Explore AI-powered SEO agents that automate keyword research, content optimization, technical audits, and more. Built on Claude Sonnet API.',
  openGraph: {
    title: 'AI SEO Agents | Powered by Claude | Anil Varma',
    description: 'Explore AI-powered SEO agents that automate keyword research, content optimization, technical audits, and more. Built on Claude Sonnet API.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function AgentsPage() {
  // Fetch from Sanity
  const agents = await getAllAgents().catch(() => []);

  // Use Sanity data if available, otherwise fall back to mock data
  const useAgents = agents.length > 0 ? agents : mockEnrichedAgents;

  // Extract unique categories
  const categories = Array.from(new Set(useAgents.map(a => {
    if (typeof a.category === 'object' && a.category?.title) {
      return a.category.title;
    }
    return a.category as string;
  }))).filter(Boolean);

  return (
    <AgentsListingPage
      agents={useAgents}
      categories={categories as string[]}
    />
  );
}
