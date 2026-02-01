import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AgentDetailPage } from '@/components/pages/AgentDetailPage';
import { mockSEOAgents } from '@/lib/mocks/data';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agent = mockSEOAgents.find(a => a.slug?.current === params.slug);

  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }

  return {
    title: `${agent.name} | AI SEO Agent | Anil Varma`,
    description: agent.description,
    openGraph: {
      title: agent.name,
      description: agent.description,
      type: 'website',
      images: agent.icon?.asset?.url ? [agent.icon.asset.url] : [],
    },
  };
}

export async function generateStaticParams() {
  return mockSEOAgents.map((agent) => ({
    slug: agent.slug?.current,
  }));
}

export default function AgentDetailsPage({ params }: Props) {
  const agent = mockSEOAgents.find(a => a.slug?.current === params.slug);

  if (!agent) {
    notFound();
  }

  // Get related agents (same category, excluding current)
  const relatedAgents = mockSEOAgents
    .filter(a => a.category === agent.category && a.slug?.current !== agent.slug?.current)
    .slice(0, 3);

  return <AgentDetailPage agent={agent} relatedAgents={relatedAgents} />;
}
