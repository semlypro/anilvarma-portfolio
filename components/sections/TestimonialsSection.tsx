'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="section gradient-bg overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="overline">Testimonials</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-neutral-800">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <Quote className="w-10 h-10 text-primary-200" />
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-8 md:pt-6"
              >
                <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 text-center">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>

                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-xl mb-4">
                    {currentTestimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  {/* Name & Role */}
                  <div className="text-center">
                    <h4 className="font-semibold text-neutral-800">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-neutral-500">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                    {currentTestimonial.resultAchieved && (
                      <span className="badge-accent mt-2 text-xs">
                        {currentTestimonial.resultAchieved}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-600" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-6 bg-primary-500'
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
