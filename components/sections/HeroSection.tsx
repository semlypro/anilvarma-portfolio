'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-bg gradient-mesh pt-20">
      {/* Background Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 gradient-orb-primary opacity-60 animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 gradient-orb-accent opacity-40 animate-pulse-slow animation-delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-orb-primary opacity-20" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="overline">SEO Expert • 15+ Years Experience</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight text-balance"
          >
            {headline.split(' ').map((word, i) => (
              <span
                key={i}
                className={
                  word.toLowerCase() === 'growth'
                    ? 'text-gradient'
                    : ''
                }
              >
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href={ctaLink} className="btn-primary text-base">
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink} className="btn-secondary text-base">
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-neutral-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Google Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">10M+ Traffic Scaled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">200+ Projects</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Glass Card - Profile Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-sm mx-auto"
        >
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-xl">
              AV
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800">Anil Varma</h3>
              <p className="text-sm text-neutral-500">
                Associate Director, SEO & Analytics
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Currently at HRONE
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-neutral-300 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-neutral-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
