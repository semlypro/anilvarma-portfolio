'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, FileSpreadsheet, FileText, Download, Star } from 'lucide-react';
import { TemplateCard } from '@/components/templates/TemplateCard';
import type { Template } from '@/types';

interface TemplatesListingPageProps {
  templates: Template[];
  categories: string[];
  formats: string[];
}

export function TemplatesListingPage({
  templates,
  categories,
  formats,
}: TemplatesListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = template.title.toLowerCase().includes(query);
        const matchesDescription = template.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      if (selectedCategory && template.category !== selectedCategory) {
        return false;
      }

      if (selectedFormat && template.format !== selectedFormat) {
        return false;
      }

      return true;
    });
  }, [templates, searchQuery, selectedCategory, selectedFormat]);

  const formatIcons: Record<string, any> = {
    spreadsheet: FileSpreadsheet,
    document: FileText,
    checklist: FileText,
  };

  // Stats
  const totalDownloads = templates.reduce((sum, t) => sum + (t.downloadCount || 0), 0);
  const avgRating = templates.reduce((sum, t) => sum + (t.rating || 0), 0) / templates.length;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-accent-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="overline text-accent-600">Free Resources</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-neutral-800">
              SEO Templates & Tools
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              Download professionally crafted templates, checklists, and spreadsheets
              to streamline your SEO workflow and boost productivity.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex justify-center gap-12"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-800">{templates.length}</p>
              <p className="text-sm text-neutral-500">Templates</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-800">{totalDownloads.toLocaleString()}+</p>
              <p className="text-sm text-neutral-500">Downloads</p>
            </div>
            <div className="text-center flex items-center gap-1">
              <Star className="w-6 h-6 text-amber-400 fill-current" />
              <p className="text-3xl font-bold text-neutral-800">{avgRating.toFixed(1)}</p>
              <p className="text-sm text-neutral-500 ml-1">Avg Rating</p>
            </div>
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
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Templates */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 mb-10"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-accent-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
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
                      ? 'bg-accent-600 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Format Filter */}
            <div className="flex gap-2 md:ml-auto">
              <button
                onClick={() => setSelectedFormat(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedFormat
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All Formats
              </button>
              {formats.map((format) => {
                const Icon = formatIcons[format] || FileText;
                return (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      selectedFormat === format
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {format.charAt(0).toUpperCase() + format.slice(1)}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Templates Grid */}
          {filteredTemplates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.slug?.current || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <TemplateCard template={template} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">
                No templates found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedFormat(null);
                }}
                className="mt-4 text-accent-600 font-medium hover:underline"
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
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              Need a Custom Template?
            </h2>
            <p className="text-neutral-600 mb-8">
              Can't find what you're looking for? I create custom SEO templates
              tailored to your specific needs and workflow.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex"
            >
              Request Custom Template
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
