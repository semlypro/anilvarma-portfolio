'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { GlossaryTerm } from '@/types';

interface GlossaryListingPageProps {
  terms: GlossaryTerm[];
  termsByLetter: Record<string, GlossaryTerm[]>;
  categories: string[];
}

export function GlossaryListingPage({
  terms,
  termsByLetter,
  categories,
}: GlossaryListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = useMemo(() => {
    let filtered = terms;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    if (selectedLetter) {
      filtered = filtered.filter(term =>
        term.term.charAt(0).toUpperCase() === selectedLetter
      );
    }

    return filtered;
  }, [terms, searchQuery, selectedCategory, selectedLetter]);

  // Group filtered terms by letter
  const filteredByLetter = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const letter = term.term.charAt(0).toUpperCase();
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(term);
      return acc;
    }, {} as Record<string, GlossaryTerm[]>);
  }, [filteredTerms]);

  const sortedLetters = Object.keys(filteredByLetter).sort();

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
            <span className="overline">SEO Glossary</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-neutral-800">
              SEO Terms Explained
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              A comprehensive glossary of {terms.length}+ SEO terms, from algorithms to
              zero-click searches. Learn the language of search engine optimization.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for a term..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400"
              />
            </div>
          </motion.div>

          {/* Alphabet Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap justify-center gap-1"
          >
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                !selectedLetter
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => {
              const hasTerms = termsByLetter[letter]?.length > 0;
              return (
                <button
                  key={letter}
                  onClick={() => hasTerms && setSelectedLetter(letter)}
                  disabled={!hasTerms}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                    selectedLetter === letter
                      ? 'bg-primary-600 text-white'
                      : hasTerms
                        ? 'bg-white text-neutral-600 hover:bg-neutral-100'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-white border-b border-neutral-100 sticky top-[72px] z-20">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Terms List */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          {filteredTerms.length > 0 ? (
            <div className="space-y-12">
              {sortedLetters.map((letter) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  id={`letter-${letter}`}
                >
                  {/* Letter Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-xl font-bold">
                      {letter}
                    </span>
                    <div className="flex-1 h-px bg-neutral-200" />
                    <span className="text-sm text-neutral-500">
                      {filteredByLetter[letter].length} terms
                    </span>
                  </div>

                  {/* Terms Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredByLetter[letter].map((term, index) => (
                      <Link
                        key={term.slug?.current || index}
                        href={`/glossary/${term.slug?.current}`}
                        className="group p-5 bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors mb-2">
                              {term.term}
                            </h3>
                            <p className="text-sm text-neutral-600 line-clamp-2">
                              {term.definition}
                            </p>
                            {term.category && (
                              <span className="inline-block mt-3 px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-500">
                                {term.category}
                              </span>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Book className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 text-lg">
                No terms found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedLetter(null);
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
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-neutral-600 mb-8">
              Have a term you'd like explained? Let me know and I'll add it to the glossary.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex"
            >
              Suggest a Term
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
