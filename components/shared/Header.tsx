'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  _key: string;
  label: string;
  href: string;
}

interface HeaderProps {
  navigation?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function Header({
  navigation = [],
  ctaLabel,
  ctaHref
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background bar - always visible with glass effect */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-nav border-b border-neutral-200/50'
            : 'bg-white/60 backdrop-blur-md'
        )}
      />

      <div className="container-custom relative">
        <nav className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center gap-2.5 font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AV</span>
            </div>
            <span className="text-lg tracking-tight">Anil Varma</span>
          </Link>

          {/* Desktop Navigation */}
          {navigation && navigation.length > 0 && (
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item._key}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* CTA Button */}
          {ctaLabel && ctaHref && (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-soft-sm"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-neutral-700" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-700" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && navigation && navigation.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative z-10 lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="container-custom py-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item._key}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {ctaLabel && ctaHref && (
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <Link
                    href={ctaHref}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
