'use client';

import { motion } from 'framer-motion';
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

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-neutral-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      {/* Gradient Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-100/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent-100/30 via-transparent to-transparent" />

      <div className="container-custom relative z-10 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center">
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
              className="mt-6 text-lg text-neutral-600 mx-auto max-w-2xl leading-relaxed"
            >
              {subheadline}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
