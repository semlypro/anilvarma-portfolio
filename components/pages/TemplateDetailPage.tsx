'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download, Star, ChevronRight, CheckCircle, ArrowLeft,
  FileSpreadsheet, FileText, CheckSquare, Eye, Clock,
  Users, Layers, Lock
} from 'lucide-react';
import { EmailGateModal } from '@/components/templates/EmailGateModal';
import { TemplateCard } from '@/components/templates/TemplateCard';
import type { Template } from '@/types';

interface TemplateDetailPageProps {
  template: Template;
  relatedTemplates: Template[];
}

const formatIcons: Record<string, any> = {
  spreadsheet: FileSpreadsheet,
  document: FileText,
  checklist: CheckSquare,
};

export function TemplateDetailPage({ template, relatedTemplates }: TemplateDetailPageProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const formatValue = template.format || 'document';
  const Icon = formatIcons[formatValue] || FileText;
  const categoryTitle = typeof template.category === 'object' ? template.category.title : (template.category || '');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-accent-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link href="/templates" className="hover:text-accent-600 transition-colors">
              Templates
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-700">{categoryTitle}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-700">
                  <Icon className="w-4 h-4" />
                  {formatValue.charAt(0).toUpperCase() + formatValue.slice(1)}
                </span>
                {template.isPremium && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                    <Lock className="w-4 h-4" />
                    Premium
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-6"
              >
                {template.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-neutral-600 leading-relaxed mb-8"
              >
                {template.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-6 mb-8"
              >
                {template.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-semibold text-neutral-800">{template.rating.toFixed(1)}</span>
                    <span className="text-neutral-500">rating</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-accent-500" />
                  <span className="font-semibold text-neutral-800">
                    {template.downloadCount?.toLocaleString() || 0}
                  </span>
                  <span className="text-neutral-500">downloads</span>
                </div>
                {template.updatedAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-500">Updated recently</span>
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25"
                >
                  <Download className="w-5 h-5" />
                  Download Free Template
                </button>
                {template.previewUrl && (
                  <a
                    href={template.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-colors border border-neutral-200"
                  >
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </a>
                )}
              </motion.div>
            </div>

            {/* Preview Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                {template.previewImage?.asset?.url ? (
                  <Image
                    src={template.previewImage.asset.url}
                    alt={template.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                    <Icon className="w-24 h-24 text-accent-400" />
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-200 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-100 rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 text-center mb-12">
              What's Included
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {template.includes?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 text-center mb-4">
              How to Use This Template
            </h2>
            <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
              Get started with this template in just a few minutes. Follow these simple steps
              to customize it for your needs.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Download the Template',
                  description: 'Enter your email to receive the template download link. Open it in Google Sheets or Excel.',
                },
                {
                  step: 2,
                  title: 'Customize for Your Needs',
                  description: 'Replace the placeholder content with your own data. Adjust formulas and formatting as needed.',
                },
                {
                  step: 3,
                  title: 'Start Using It',
                  description: 'Integrate the template into your workflow. Share with team members if needed.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-accent-600 to-accent-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Boost Your SEO Workflow?
            </h2>
            <p className="text-accent-100 mb-8 max-w-xl mx-auto">
              Download this free template and start optimizing your SEO process today.
            </p>
            <button
              onClick={() => setShowEmailModal(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent-600 rounded-xl font-semibold hover:bg-accent-50 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Now — It's Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Related Templates
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTemplates.map((relatedTemplate, index) => (
                <motion.div
                  key={relatedTemplate.slug?.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TemplateCard template={relatedTemplate} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Templates */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all templates
          </Link>
        </div>
      </section>

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        template={template}
      />
    </main>
  );
}
