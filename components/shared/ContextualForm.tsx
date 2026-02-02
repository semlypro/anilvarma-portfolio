'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

export type PageType =
  | 'homepage'
  | 'service'
  | 'blog-post'
  | 'blog-index'
  | 'case-study'
  | 'case-studies-index'
  | 'agent'
  | 'agents-index'
  | 'template'
  | 'templates-index'
  | 'glossary'
  | 'glossary-index'
  | 'about'
  | 'contact';

interface ContextualFormProps {
  pageType: PageType;
  pageTitle?: string;
  compact?: boolean;
  className?: string;
}

interface FormConfig {
  heading: string;
  subheading: string;
  ctaText: string;
  placeholder: string;
  successMessage: string;
}

const formConfigs: Record<PageType, FormConfig> = {
  homepage: {
    heading: 'Ready to Scale Your Traffic?',
    subheading: 'Get a free SEO audit and personalized growth strategy for your business.',
    ctaText: 'Get Free Audit',
    placeholder: 'Tell me about your SEO challenges...',
    successMessage: "Thanks! I'll review your site and send you a detailed audit within 24 hours.",
  },
  service: {
    heading: 'Start Growing Today',
    subheading: 'Book a free consultation to discuss how this service can transform your organic traffic.',
    ctaText: 'Book Free Consultation',
    placeholder: 'What are your main goals for this service?',
    successMessage: "Perfect! I'll reach out within 24 hours to schedule your consultation.",
  },
  'blog-post': {
    heading: 'Put This Into Action',
    subheading: 'Get personalized guidance on implementing these strategies for your business.',
    ctaText: 'Get Expert Help',
    placeholder: 'Which strategies are you most interested in?',
    successMessage: "Great! I'll send you a personalized implementation plan within 24 hours.",
  },
  'blog-index': {
    heading: 'Want Personalized SEO Advice?',
    subheading: 'Get expert insights tailored to your unique challenges and goals.',
    ctaText: 'Get Custom Strategy',
    placeholder: 'What SEO challenges are you facing?',
    successMessage: "Thanks! I'll analyze your situation and send custom recommendations.",
  },
  'case-study': {
    heading: 'Get Similar Results',
    subheading: 'Learn how I can replicate this success for your business with proven strategies.',
    ctaText: 'Discuss Your Project',
    placeholder: 'Tell me about your current traffic and goals...',
    successMessage: "Excellent! I'll prepare a custom strategy based on your goals.",
  },
  'case-studies-index': {
    heading: 'Ready for Similar Growth?',
    subheading: 'See how these proven strategies can work for your business.',
    ctaText: 'Start Your Success Story',
    placeholder: 'What results are you looking for?',
    successMessage: "Perfect! I'll show you how to achieve similar results for your site.",
  },
  agent: {
    heading: 'Need More Than Automation?',
    subheading: 'Get expert SEO strategy combined with AI-powered tools for maximum impact.',
    ctaText: 'Upgrade to Expert Help',
    placeholder: 'How can I help with your SEO content?',
    successMessage: "Thanks! I'll show you how expert guidance amplifies these tools.",
  },
  'agents-index': {
    heading: 'Combine AI + Expert Strategy',
    subheading: 'These tools are powerful, but expert guidance makes them transformational.',
    ctaText: 'Get Expert Guidance',
    placeholder: 'Which tools interest you most?',
    successMessage: "Great! I'll help you maximize these AI tools with expert strategy.",
  },
  template: {
    heading: 'Get Custom Templates',
    subheading: 'I can create personalized templates and strategies for your specific needs.',
    ctaText: 'Request Custom Template',
    placeholder: 'What custom templates would help your workflow?',
    successMessage: "Perfect! I'll create custom templates tailored to your needs.",
  },
  'templates-index': {
    heading: 'Need Custom Solutions?',
    subheading: 'Get templates and strategies built specifically for your business.',
    ctaText: 'Get Custom Templates',
    placeholder: 'What SEO workflows need templates?',
    successMessage: "Excellent! I'll create custom templates for your workflows.",
  },
  glossary: {
    heading: 'Questions About This Concept?',
    subheading: 'Get expert answers and learn how to apply this to your SEO strategy.',
    ctaText: 'Ask an Expert',
    placeholder: 'What would you like to understand better?',
    successMessage: "Thanks! I'll send you a detailed explanation with examples.",
  },
  'glossary-index': {
    heading: 'Need SEO Clarity?',
    subheading: 'Get expert explanations for any SEO concept or strategy question.',
    ctaText: 'Ask Your Question',
    placeholder: 'What SEO concepts confuse you?',
    successMessage: "Great! I'll clarify these concepts with practical examples.",
  },
  about: {
    heading: "Let's Work Together",
    subheading: 'Discuss how my 15+ years of SEO experience can help grow your business.',
    ctaText: 'Start Conversation',
    placeholder: 'Tell me about your business and goals...',
    successMessage: "Looking forward to it! I'll reach out within 24 hours.",
  },
  contact: {
    heading: 'Send Me a Message',
    subheading: "I typically respond within 24 hours. Let's discuss your SEO goals.",
    ctaText: 'Send Message',
    placeholder: 'How can I help you?',
    successMessage: 'Message sent! I will respond within 24 hours.',
  },
};

export function ContextualForm({
  pageType,
  pageTitle,
  compact = false,
  className = ''
}: ContextualFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const config = formConfigs[pageType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: `${config.heading}${pageTitle ? ` - ${pageTitle}` : ''}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${compact ? 'p-6' : 'p-8 md:p-12'} bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl ${className}`}
      >
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">Message Sent!</h3>
          <p className="text-neutral-600 leading-relaxed">{config.successMessage}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`${compact ? 'p-6' : 'p-8 md:p-12'} bg-gradient-to-br from-neutral-50 to-primary-50/30 rounded-2xl border border-neutral-200/50 ${className}`}>
      <div className={`${compact ? 'max-w-xl' : 'max-w-2xl'} mx-auto`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className={`${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-bold text-neutral-900 mb-3`}>
            {config.heading}
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            {config.subheading}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={compact ? 4 : 5}
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none bg-white"
              placeholder={config.placeholder}
            />
          </div>

          {submitStatus === 'error' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-800">
                Something went wrong. Please try again or email me directly at anilvarma2302@gmail.com
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                {config.ctaText}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-neutral-500">
            I'll respond within 24 hours • Your information is secure
          </p>
        </form>
      </div>
    </div>
  );
}
