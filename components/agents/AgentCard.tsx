'use client';

import Link from 'next/link';
import {
  Bot, ArrowRight, Sparkles, Search, FileText,
  BarChart3, Globe, Link2, Settings, Zap
} from 'lucide-react';
import type { SEOAgent } from '@/types';

interface AgentCardProps {
  agent: SEOAgent;
}

const categoryIcons: Record<string, any> = {
  'Keyword Research': Search,
  'Content': FileText,
  'Technical': Settings,
  'Analytics': BarChart3,
  'Link Building': Link2,
  'Local SEO': Globe,
};

const categoryGradients: Record<string, string> = {
  'Keyword Research': 'from-blue-500 to-blue-600',
  'Content': 'from-purple-500 to-purple-600',
  'Technical': 'from-orange-500 to-orange-600',
  'Analytics': 'from-teal-500 to-teal-600',
  'Link Building': 'from-pink-500 to-pink-600',
  'Local SEO': 'from-green-500 to-green-600',
};

export function AgentCard({ agent }: AgentCardProps) {
  // Get category title string from object or string
  const categoryTitle = typeof agent.category === 'object' ? agent.category.title : (agent.category || '');
  const Icon = categoryIcons[categoryTitle] || Bot;
  const gradient = categoryGradients[categoryTitle] || 'from-primary-500 to-primary-600';

  return (
    <Link
      href={`/agents/${agent.slug?.current}`}
      className="group block h-full"
    >
      <article className="h-full flex flex-col p-6 bg-white rounded-2xl border border-neutral-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Status Badge */}
          {agent.status === 'active' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Active
            </span>
          ) : agent.status === 'beta' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              <Zap className="w-3 h-3" />
              Beta
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
              Coming Soon
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Category */}
          <span className="text-sm font-medium text-purple-600 mb-2 block">
            {categoryTitle}
          </span>

          {/* Title */}
          <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-purple-600 transition-colors mb-3">
            {agent.name}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {agent.shortDescription}
          </p>

          {/* Features */}
          {agent.features && agent.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {agent.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-600"
                >
                  {feature}
                </span>
              ))}
              {agent.features.length > 3 && (
                <span className="px-2 py-1 text-xs text-neutral-400">
                  +{agent.features.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          {/* Usage Count */}
          {agent.usageCount && (
            <span className="text-sm text-neutral-500">
              {agent.usageCount.toLocaleString()} uses
            </span>
          )}

          {/* CTA */}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 group-hover:gap-2.5 transition-all">
            {agent.status === 'coming_soon' ? 'Learn More' : 'Try Agent'}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
