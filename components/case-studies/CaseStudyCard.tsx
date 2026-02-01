'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Building2, Calendar } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import type { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  // Get key metrics to display
  const keyMetrics = caseStudy.metrics?.slice(0, 3) || [];

  return (
    <Link
      href={`/case-studies/${caseStudy.slug?.current}`}
      className="group block h-full"
    >
      <article className="h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {caseStudy.featuredImage?.asset?.url ? (
            <Image
              src={caseStudy.featuredImage.asset.url}
              alt={caseStudy.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-primary-400" />
            </div>
          )}

          {/* Industry Badge */}
          {caseStudy.industry && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-neutral-700">
              {caseStudy.industry}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Client Info */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
            <Building2 className="w-4 h-4" />
            <span>{caseStudy.clientName || 'Confidential Client'}</span>
            {caseStudy.timeline && (
              <>
                <span className="text-neutral-300">•</span>
                <Calendar className="w-4 h-4" />
                <span>{caseStudy.timeline}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors mb-3 line-clamp-2">
            {caseStudy.title}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-600 text-sm mb-6 line-clamp-2 flex-1">
            {caseStudy.excerpt || caseStudy.seo?.metaDescription || `${caseStudy.clientName} case study`}
          </p>

          {/* Key Metrics */}
          {keyMetrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-100">
              {keyMetrics.map((metric, index) => (
                <div key={metric._key || index} className="text-center">
                  <p className={`text-lg font-bold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.changePercent}
                  </p>
                  <p className="text-xs text-neutral-500">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
              Read Case Study
            </span>
            <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
