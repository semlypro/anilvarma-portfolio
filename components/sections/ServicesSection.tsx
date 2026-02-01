'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Code,
  FileText,
  BarChart3,
  Link as LinkIcon,
  ArrowRight,
  Wrench,
  Globe,
  TrendingUp,
  Search,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/types';

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  'file-text': FileText,
  'bar-chart': BarChart3,
  link: LinkIcon,
  wrench: Wrench,
  globe: Globe,
  'trending-up': TrendingUp,
  search: Search,
};

// Gradient backgrounds for cards
const gradientBgs = [
  'from-primary-50 to-primary-100/50',
  'from-accent-50 to-accent-100/50',
  'from-violet-50 to-purple-100/50',
  'from-rose-50 to-pink-100/50',
];

export function ServicesSection({ services }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            <Wrench className="w-3.5 h-3.5" />
            Services
          </span>
          <h2 className="text-heading-xl md:text-display font-bold text-neutral-900">
            SEO Services That <span className="text-gradient">Drive Results</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-lg leading-relaxed">
            Comprehensive SEO strategies tailored to your business goals, from
            technical optimization to content creation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            const gradientBg = gradientBgs[index % gradientBgs.length];

            return (
              <motion.div
                key={service._key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative bg-white rounded-2xl border border-neutral-200/80 p-8 hover:shadow-soft-lg hover:border-neutral-300/80 transition-all duration-300 h-full">
                  {/* Subtle gradient background on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {service.title}
                    </h3>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {service.href && (
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 text-neutral-900 font-medium text-sm group-hover:text-primary-600 transition-colors"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-full font-medium hover:bg-neutral-200 transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
