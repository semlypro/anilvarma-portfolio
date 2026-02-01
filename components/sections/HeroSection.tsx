'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe, Sparkles, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function HeroSection({
  headline,
  subheadline,
}: HeroSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-neutral-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      {/* Gradient Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-100/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent-100/30 via-transparent to-transparent" />

      <div className="container-custom relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                {headline.split(' ').map((word, i) => {
                  const highlightWords = ['Growth', 'SEO', 'Traffic', 'Rankings'];
                  const isHighlight = highlightWords.some(
                    hw => word.toLowerCase().includes(hw.toLowerCase())
                  );
                  return (
                    <span
                      key={i}
                      className={cn(
                        isHighlight && 'bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent'
                      )}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg text-neutral-600 max-w-lg leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* Expertise Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { icon: TrendingUp, label: 'Technical SEO' },
                { icon: Globe, label: 'International SEO' },
                { icon: Sparkles, label: 'AI & SEO' },
                { icon: Users, label: 'Enterprise' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200/60 text-sm text-neutral-600 shadow-soft-sm"
                >
                  <item.icon className="w-4 h-4 text-primary-500" />
                  {item.label}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-6"
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-neutral-900">15<span className="text-primary-500">+</span></div>
                <div className="text-sm text-neutral-500">Years Exp.</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-neutral-900">10M<span className="text-primary-500">+</span></div>
                <div className="text-sm text-neutral-500">Traffic Scaled</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-neutral-900">200<span className="text-primary-500">+</span></div>
                <div className="text-sm text-neutral-500">Projects</div>
              </div>
            </motion.div>

            {/* Trusted By */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <p className="text-xs uppercase tracking-wider text-neutral-400 mb-4">
                Trusted by
              </p>
              <div className="flex flex-wrap items-center gap-6 opacity-50">
                {['HRONE', 'Booking.com', 'TomTom', 'bol.com'].map((company, i) => (
                  <span key={i} className="text-sm font-semibold text-neutral-400">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200/60 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Get in Touch</h2>
              <p className="text-neutral-500 mb-6">Let's discuss how I can help grow your organic traffic.</p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Message Sent!</h3>
                  <p className="text-neutral-500">I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
