'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft, ChevronRight, TrendingUp, Building2, Calendar,
  Target, CheckCircle, AlertTriangle, Lightbulb, BarChart3,
  ArrowUpRight, Quote
} from 'lucide-react';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';
import type { CaseStudy } from '@/types';

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudy[];
}

export function CaseStudyDetailPage({ caseStudy, relatedCaseStudies }: CaseStudyDetailPageProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link href="/case-studies" className="hover:text-primary-600 transition-colors">
              Case Studies
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-700">{caseStudy.industry}</span>
          </motion.nav>

          <div className="max-w-4xl">
            {/* Industry Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6"
            >
              <Building2 className="w-4 h-4" />
              {caseStudy.industry}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-6"
            >
              {caseStudy.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-600 leading-relaxed mb-8"
            >
              {caseStudy.excerpt}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-6 text-sm text-neutral-500"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {caseStudy.client || 'Confidential Client'}
              </span>
              {caseStudy.duration && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {caseStudy.duration}
                </span>
              )}
              {caseStudy.services && caseStudy.services.length > 0 && (
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {caseStudy.services.join(', ')}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {caseStudy.featuredImage?.asset?.url && (
        <section className="container-custom -mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={caseStudy.featuredImage.asset.url}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* Key Metrics */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className="py-12 bg-primary-600">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {caseStudy.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent-300" />
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                  </div>
                  <p className="text-primary-100">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Challenge */}
            {caseStudy.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">The Challenge</h2>
                </div>
                <div className="prose prose-lg prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed">{caseStudy.challenge}</p>
                </div>
              </motion.div>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">The Solution</h2>
                </div>
                <div className="prose prose-lg prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed">{caseStudy.solution}</p>
                </div>

                {/* Strategy Points */}
                {caseStudy.strategies && caseStudy.strategies.length > 0 && (
                  <div className="mt-8 grid md:grid-cols-2 gap-4">
                    {caseStudy.strategies.map((strategy, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl"
                      >
                        <CheckCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{strategy}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Results */}
            {caseStudy.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">The Results</h2>
                </div>
                <div className="prose prose-lg prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed">{caseStudy.results}</p>
                </div>
              </motion.div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative p-8 bg-gradient-to-br from-primary-50 to-white rounded-3xl border border-primary-100"
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-primary-200" />
                <div className="relative z-10 pl-8">
                  <blockquote className="text-xl text-neutral-700 italic mb-6 leading-relaxed">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    {caseStudy.testimonial.image?.asset?.url && (
                      <Image
                        src={caseStudy.testimonial.image.asset.url}
                        alt={caseStudy.testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-neutral-800">
                        {caseStudy.testimonial.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {caseStudy.testimonial.role}
                        {caseStudy.testimonial.company && `, ${caseStudy.testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-primary-100 mb-8">
              Let's discuss how I can help transform your organic search performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg"
              >
                <Target className="w-5 h-5" />
                Get Started
              </a>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-400 transition-colors"
              >
                View More Case Studies
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Related Case Studies
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedCaseStudies.map((relatedCaseStudy, index) => (
                <motion.div
                  key={relatedCaseStudy.slug?.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CaseStudyCard caseStudy={relatedCaseStudy} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Case Studies */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all case studies
          </Link>
        </div>
      </section>
    </main>
  );
}
