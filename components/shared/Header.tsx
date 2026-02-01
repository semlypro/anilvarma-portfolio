'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Default navigation items (fallback if not passed via props)
const defaultNavItems = [
  { _key: '1', label: 'About', href: '/about' },
  { _key: '2', label: 'Blog', href: '/blog' },
  { _key: '3', label: 'Templates', href: '/templates' },
  { _key: '4', label: 'Agents', href: '/agents' },
  { _key: '5', label: 'Case Studies', href: '/case-studies' },
  { _key: '6', label: 'Glossary', href: '/glossary' },
];

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
  navigation,
  ctaLabel = 'Book a Call',
  ctaHref = '/contact'
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = navigation || defaultNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container-custom py-4">
        <nav
          className={cn(
            'mx-auto max-w-4xl transition-all duration-300',
            isScrolled
              ? 'glass-nav px-6 py-3 shadow-glass'
              : 'px-4 py-2'
          )}
        >
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-neutral-800 transition-colors hover:text-primary-600"
            >
              <span className="text-xl">Anil Varma</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item._key}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link href={ctaHref} className="btn-primary text-sm">
                {ctaLabel}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-neutral-600" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-600" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 px-4 py-2"
          >
            <div className="glass-card p-4 shadow-glass-lg">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item._key}
                    href={item.href}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-neutral-200 my-2" />
                <Link
                  href={ctaHref}
                  className="btn-primary text-sm justify-center"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
