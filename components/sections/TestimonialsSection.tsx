'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
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
    <section ref={ref} className="section bg-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            <Star className="w-3.5 h-3.5" />
            Testimonials
          </span>
          <h2 className="text-heading-xl md:text-display font-bold text-neutral-900">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-neutral-50 rounded-3xl p-8 md:p-12 relative border border-neutral-200/60">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8">
              <Quote className="w-12 h-12 text-primary-200" />
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="pt-10 md:pt-8"
              >
                <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-10 text-center font-medium">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>

                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold text-xl mb-4">
                    {currentTestimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  {/* Name & Role */}
                  <div className="text-center">
                    <h4 className="font-semibold text-neutral-900 text-lg">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-neutral-500">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                    {currentTestimonial.resultAchieved && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mt-3">
                        <TrendingUpIcon className="w-3.5 h-3.5" />
                        {currentTestimonial.resultAchieved}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center transition-colors"
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
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-8 bg-neutral-900'
                          : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center transition-colors"
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

// Small trending up icon for results
function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
