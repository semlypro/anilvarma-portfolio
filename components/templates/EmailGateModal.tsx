'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  X, Download, Mail, CheckCircle, Loader2,
  FileSpreadsheet, FileText, CheckSquare
} from 'lucide-react';
import type { Template } from '@/types';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
}

const formatIcons: Record<string, any> = {
  spreadsheet: FileSpreadsheet,
  document: FileText,
  checklist: CheckSquare,
};

export function EmailGateModal({ isOpen, onClose, template }: EmailGateModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const Icon = formatIcons[template.format] || FileText;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // API call would go here
      // await fetch('/api/download-template', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, templateId: template._id }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);

      // Auto-close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {isSuccess ? (
                  /* Success State */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <Dialog.Title className="text-2xl font-bold text-neutral-800 mb-2">
                      Check Your Email!
                    </Dialog.Title>
                    <p className="text-neutral-600">
                      We've sent the download link for{' '}
                      <span className="font-medium">{template.title}</span> to your inbox.
                    </p>
                  </div>
                ) : (
                  /* Form State */
                  <>
                    {/* Template Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-accent-600" />
                    </div>

                    <Dialog.Title className="text-2xl font-bold text-neutral-800 text-center mb-2">
                      Get Your Free Template
                    </Dialog.Title>

                    <p className="text-neutral-600 text-center mb-6">
                      Enter your email to download{' '}
                      <span className="font-medium text-neutral-800">
                        {template.title}
                      </span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email Input */}
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400"
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            Download Template
                          </>
                        )}
                      </button>
                    </form>

                    {/* Privacy Note */}
                    <p className="text-xs text-neutral-500 text-center mt-4">
                      By downloading, you agree to receive occasional SEO tips.
                      Unsubscribe anytime.
                    </p>

                    {/* What's Included */}
                    <div className="mt-6 pt-6 border-t border-neutral-100">
                      <p className="text-sm font-medium text-neutral-700 mb-3">
                        What's included:
                      </p>
                      <ul className="space-y-2">
                        {template.includes?.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-neutral-600"
                          >
                            <CheckCircle className="w-4 h-4 text-accent-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
