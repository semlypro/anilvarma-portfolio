'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-sm">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 md:p-16"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/grid-white.svg')] opacity-5" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-primary-100 text-lg mb-8 leading-relaxed">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="mt-6 text-primary-200 text-sm">
              Free 30-minute consultation • No obligation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
