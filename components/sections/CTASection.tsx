'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';

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

  const benefits = [
    'Free 30-minute consultation',
    'Custom SEO strategy',
    'No obligation to continue',
  ];

  return (
    <section ref={ref} className="section-sm bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-neutral-900 p-10 md:p-16"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />

          {/* Dot Pattern */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5" />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {title}
              </h2>
              <p className="text-neutral-400 text-lg mb-6 leading-relaxed">
                {description}
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <CheckCircle className="w-4 h-4 text-primary-400" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href={buttonLink}
                className="group inline-flex items-center gap-3 bg-white text-neutral-900 px-8 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-all shadow-soft-lg"
              >
                <Calendar className="w-5 h-5" />
                {buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
