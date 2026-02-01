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
};

export function ServicesSection({ services }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section gradient-bg">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="overline">What I Do</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-neutral-800">
            SEO Services That Drive Results
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            Comprehensive SEO strategies tailored to your business goals, from
            technical optimization to content creation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;

            return (
              <motion.div
                key={service._key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card-glass-hover h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-primary-500 font-medium text-sm hover:gap-3 transition-all"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
