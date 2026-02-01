'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Calendar, CheckCircle } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import type { Experience } from '@/types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
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
          <span className="overline">Experience</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-neutral-800">
            Professional Journey
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            15+ years of driving organic growth across diverse industries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-200 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp._key}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-0 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 top-0 w-5 h-5 rounded-full bg-primary-500 border-4 border-white shadow hidden md:block" />

              {/* Card */}
              <div className="card-hover">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary-600 mt-1">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-neutral-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDateShort(exp.startDate)} -{' '}
                      {exp.endDate ? formatDateShort(exp.endDate) : 'Present'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600 mb-4">{exp.description}</p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-neutral-600"
                      >
                        <CheckCircle className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
