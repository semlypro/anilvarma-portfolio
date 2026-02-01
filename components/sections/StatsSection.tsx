'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calendar,
  TrendingUp,
  Briefcase,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import type { Stat } from '@/types';

interface StatsSectionProps {
  stats: Stat[];
}

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  'trending-up': TrendingUp,
  briefcase: Briefcase,
  chart: BarChart3,
};

export function StatsSection({ stats }: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-neutral-50 border-y border-neutral-200/60">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon || 'chart'] || BarChart3;

            return (
              <motion.div
                key={stat._key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <AnimatedNumber
                    value={stat.value}
                    isInView={isInView}
                    delay={index * 0.1}
                  />
                  {stat.suffix && (
                    <span className="text-2xl md:text-3xl font-bold text-primary-500">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-neutral-500 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface AnimatedNumberProps {
  value: string;
  isInView: boolean;
  delay: number;
}

function AnimatedNumber({ value, isInView, delay }: AnimatedNumberProps) {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-4xl md:text-5xl font-bold text-neutral-900"
    >
      {isInView ? (
        <CountUp end={numericValue} duration={2} delay={delay} />
      ) : (
        '0'
      )}
    </motion.span>
  );
}

interface CountUpProps {
  end: number;
  duration: number;
  delay: number;
}

function CountUp({ end, duration, delay }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now() + delay * 1000;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [end, duration, delay]);

  return <>{count}</>;
}
