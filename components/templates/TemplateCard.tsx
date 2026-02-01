'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Download, Star, FileSpreadsheet, FileText, Eye,
  CheckSquare, Lock
} from 'lucide-react';
import { EmailGateModal } from '@/components/templates/EmailGateModal';
import type { Template } from '@/types';

interface TemplateCardProps {
  template: Template;
}

const formatIcons: Record<string, any> = {
  spreadsheet: FileSpreadsheet,
  document: FileText,
  checklist: CheckSquare,
};

const formatColors: Record<string, string> = {
  spreadsheet: 'bg-green-100 text-green-700',
  document: 'bg-blue-100 text-blue-700',
  checklist: 'bg-purple-100 text-purple-700',
};

export function TemplateCard({ template }: TemplateCardProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const Icon = formatIcons[template.format] || FileText;
  const formatColor = formatColors[template.format] || 'bg-neutral-100 text-neutral-700';

  return (
    <>
      <article className="group card-hover h-full flex flex-col">
        {/* Preview Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
          {template.previewImage?.asset?.url ? (
            <Image
              src={template.previewImage.asset.url}
              alt={template.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
              <Icon className="w-16 h-16 text-accent-400" />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Link
              href={`/templates/${template.slug?.current}`}
              className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
            <button
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2 bg-accent-500 rounded-lg text-sm font-medium text-white hover:bg-accent-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Format Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${formatColor} flex items-center gap-1.5`}>
            <Icon className="w-3 h-3" />
            {template.format.charAt(0).toUpperCase() + template.format.slice(1)}
          </div>

          {/* Premium Badge */}
          {template.isPremium && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-amber-400 text-amber-900 flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Premium
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Category */}
          {template.category && (
            <span className="text-sm font-medium text-accent-600 mb-2">
              {template.category}
            </span>
          )}

          {/* Title */}
          <Link href={`/templates/${template.slug?.current}`}>
            <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-accent-600 transition-colors mb-2 line-clamp-2">
              {template.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
            {template.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            {/* Rating */}
            {template.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-medium text-neutral-700">
                  {template.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Downloads */}
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <Download className="w-4 h-4" />
              <span>{template.downloadCount?.toLocaleString() || 0}</span>
            </div>

            {/* Download Button */}
            <button
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2 bg-accent-500 text-white rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Get it
            </button>
          </div>
        </div>
      </article>

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        template={template}
      />
    </>
  );
}
