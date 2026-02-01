'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';
import type { CaseStudy } from '@/types';

interface CaseStudiesListingPageProps {
  caseStudies: CaseStudy[];
  industries: string[];
}

export function CaseStudiesListingPage({
  caseStudies,
  industries,
}: CaseStudiesListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((caseStudy) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = caseStudy.title.toLowerCase().includes(query);
        const matchesClient = caseStudy.clientName?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesClient) return false;
      }

      if (selectedIndustry && caseStudy.industry !== selectedIndustry) {
        return false;
      }

      return true;
    });
  }, [caseStudies, searchQuery, selectedIndustry]);

  // Calculate aggregate stats
  const avgTrafficIncrease = caseStudies.reduce((sum, cs) => {
    const metric = cs.metrics?.find(m => m.label?.toLowerCase().includes('traffic'));
    return sum + (parseInt(metric?.changePercent || '0') || 0);
  }, 0) / caseStudies.length;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="overline">Case Studies</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-neutral-800">
              Real Results, Real Growth
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              Explore detailed case studies showcasing how strategic SEO drives
              measurable organic growth across various industries.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Award, value: `${caseStudies.length}+`, label: 'Case Studies' },
              { icon: TrendingUp, value: '150%', label: 'Avg Traffic Increase' },
              { icon: Target, value: '95%', label: 'Client Retention' },
              { icon: BarChart3, value: '10+', label: 'Industries Served' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-neutral-100"
              >
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Filters & Case Studies */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          {/* Industry Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <button
              onClick={() => setSelectedIndustry(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedIndustry
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All Industries
            </button>
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedIndustry === industry
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {industry}
              </button>
            ))}
          </motion.div>

          {/* Case Studies Grid */}
          {filteredCaseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.slug?.current || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <CaseStudyCard caseStudy={caseStudy} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">
                No case studies found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustry(null);
                }}
                className="mt-4 text-primary-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want Results Like These?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Let's discuss how I can help you achieve similar SEO success for your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Target className="w-5 h-5" />
              Schedule a Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
