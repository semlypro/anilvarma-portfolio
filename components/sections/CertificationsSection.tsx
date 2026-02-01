'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import type { Certification } from '@/types';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
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
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="overline">Credentials</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-neutral-800">
            Certifications & Awards
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            Recognized expertise validated by industry-leading organizations.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert._key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-hover h-full flex flex-col">
                {/* Badge Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {cert.issuer}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Issued {formatDateShort(cert.dateObtained || cert.date)}
                      {cert.expiryDate && ` • Expires ${formatDateShort(cert.expiryDate)}`}
                    </span>
                  </div>
                </div>

                {/* Credential Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Credential
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-neutral-200"
        >
          <p className="text-center text-sm text-neutral-500 mb-8">
            Certified by leading industry organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {/* Placeholder logos - would be replaced with actual certification logos */}
            {['Google', 'HubSpot', 'SEMrush', 'Moz', 'Yoast'].map((org) => (
              <div
                key={org}
                className="px-6 py-3 bg-neutral-100 rounded-lg text-neutral-600 font-semibold"
              >
                {org}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
