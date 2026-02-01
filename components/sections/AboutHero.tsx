'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Download } from 'lucide-react';
import Link from 'next/link';

interface AboutHeroProps {
  headline: string;
  subheadline: string;
}

export function AboutHero({ headline, subheadline }: AboutHeroProps) {
  return (
    <section className="relative pt-32 pb-20 gradient-bg gradient-mesh overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 gradient-orb-primary opacity-40" />
      <div className="absolute bottom-10 left-10 w-48 h-48 gradient-orb-accent opacity-30" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="overline">About Me</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-neutral-800">
              {headline}
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              {subheadline}
            </p>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              I&apos;m an experienced digital marketing professional with 15+ years of
              managing global and national projects. Specializing in SEO and
              organic growth, I excel at creating data-driven strategies and
              leading teams to achieve results.
            </p>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              Throughout my career, I&apos;ve helped businesses scale their organic
              traffic from thousands to millions of users. My approach combines
              technical expertise with strategic thinking to deliver sustainable
              growth.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/anil-varma/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-primary-100 flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-neutral-600 group-hover:text-primary-600" />
              </a>
              <a
                href="mailto:anilvarma2302@gmail.com"
                className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-primary-100 flex items-center justify-center transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-neutral-600 group-hover:text-primary-600" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/book-call" className="btn-primary">
                Book a Consultation
              </Link>
              <a
                href="/anil-varma-resume.pdf"
                download
                className="btn-secondary"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 max-w-md mx-auto">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-4xl mb-6">
                AV
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-800">
                  Anil Varma
                </h2>
                <p className="text-primary-600 font-medium mt-1">
                  Associate Director (SEO & Analytics)
                </p>
                <p className="text-neutral-500 mt-1">HRONE</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">15+</div>
                  <div className="text-xs text-neutral-500">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">10M+</div>
                  <div className="text-xs text-neutral-500">Traffic</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">200+</div>
                  <div className="text-xs text-neutral-500">Projects</div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-6 text-center text-neutral-500 text-sm">
                📍 Netherlands
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200/50 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-400/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
