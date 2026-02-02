import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AgentDetailPage } from '@/components/pages/AgentDetailPage';
import { mockSEOAgents } from '@/lib/mocks/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const params = await paramsPromise;
  const agent = mockSEOAgents.find(a => a.slug?.current === params.slug);

  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }

  return {
    title: `${agent.name} | AI SEO Agent | Anil Varma`,
    description: agent.shortDescription,
    openGraph: {
      title: agent.name,
      description: agent.shortDescription,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return mockSEOAgents.map((agent) => ({
    slug: agent.slug?.current,
  }));
}

export default async function AgentDetailsPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  const agent = mockSEOAgents.find(a => a.slug?.current === params.slug);

  if (!agent) {
    notFound();
  }

  // Get related agents (same category, excluding current)
  const agentCategoryId = typeof agent.category === 'object' ? agent.category._id : agent.category;
  const relatedAgents = mockSEOAgents
    .filter(a => {
      const aCategoryId = typeof a.category === 'object' ? a.category._id : a.category;
      return aCategoryId === agentCategoryId && a.slug?.current !== agent.slug?.current;
    })
    .slice(0, 3);

  return <AgentDetailPage agent={agent} relatedAgents={relatedAgents} />;
}
