'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, ChevronRight, Book, ExternalLink, Share2,
  Twitter, Linkedin, Link2, ArrowRight
} from 'lucide-react';
import type { GlossaryTerm } from '@/types';

interface GlossaryDetailPageProps {
  term: GlossaryTerm;
  relatedTerms: GlossaryTerm[];
}

export function GlossaryDetailPage({ term, relatedTerms }: GlossaryDetailPageProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link href="/glossary" className="hover:text-primary-600 transition-colors">
              Glossary
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-700">{term.term.charAt(0).toUpperCase()}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-700">{term.term}</span>
          </motion.nav>

          <div className="max-w-3xl">
            {/* Category Badge */}
            {term.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6"
              >
                <Book className="w-4 h-4" />
                {term.category}
              </motion.div>
            )}

            {/* Term */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-6"
            >
              {term.term}
            </motion.h1>

            {/* Short Definition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-600 leading-relaxed"
            >
              {term.definition}
            </motion.p>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-4 mt-8"
            >
              <span className="text-sm text-neutral-500">Share:</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Extended Definition */}
            {term.fullExplanation && term.fullExplanation.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                  In-Depth Explanation
                </h2>
                <div className="prose prose-lg prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                    Content will be rendered here with Portable Text.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Examples */}
            {term.examples && term.examples.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                  Examples
                </h2>
                <div className="space-y-4">
                  {term.examples.map((example, index) => (
                    <div
                      key={index}
                      className="p-5 bg-primary-50 rounded-2xl border border-primary-100"
                    >
                      <p className="text-neutral-700">{example}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Why It Matters */}
            {term.whyItMatters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                  Why It Matters for SEO
                </h2>
                <div className="prose prose-lg prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed">
                    {term.whyItMatters}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Best Practices */}
            {term.bestPractices && term.bestPractices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                  Best Practices
                </h2>
                <div className="space-y-3">
                  {term.bestPractices.map((practice, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-neutral-700 pt-1">{practice}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Resources */}
            {term.resources && term.resources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                  Learn More
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {term.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all group"
                    >
                      <ExternalLink className="w-5 h-5 text-primary-600 shrink-0" />
                      <span className="text-neutral-700 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Related Terms
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTerms.map((relatedTerm, index) => (
                <motion.div
                  key={relatedTerm.slug?.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/glossary/${relatedTerm.slug?.current}`}
                    className="group block p-5 bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors mb-2">
                      {relatedTerm.term}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {relatedTerm.definition}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm text-primary-600 font-medium">
                      Learn more
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Glossary */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to glossary
          </Link>
        </div>
      </section>
    </main>
  );
}
