'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Skill } from '@/types';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels: Record<string, string> = {
    technical: 'Technical SEO',
    analytics: 'Analytics & Data',
    content: 'Content Strategy',
    tools: 'Tools & Platforms',
  };

  const categoryColors: Record<string, string> = {
    technical: 'from-blue-500 to-blue-600',
    analytics: 'from-purple-500 to-purple-600',
    content: 'from-teal-500 to-teal-600',
    tools: 'from-orange-500 to-orange-600',
  };

  return (
    <section ref={ref} className="section bg-neutral-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="overline">Expertise</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-neutral-800">
            Skills & Competencies
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            A comprehensive skill set developed over 15+ years of hands-on SEO experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[category] || 'from-primary-500 to-primary-600'} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {categoryLabels[category]?.charAt(0) || category.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {categoryLabels[category] || category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <div key={skill._key || index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-neutral-700 font-medium">{skill.name}</span>
                      <span className="text-sm text-neutral-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${categoryColors[category] || 'from-primary-500 to-primary-600'} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
            Also Proficient In
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Python', 'SQL', 'Google Tag Manager', 'Data Studio',
              'Screaming Frog', 'Ahrefs', 'SEMrush', 'Moz',
              'Schema Markup', 'Core Web Vitals', 'Mobile SEO', 'Local SEO'
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white rounded-full text-sm text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
