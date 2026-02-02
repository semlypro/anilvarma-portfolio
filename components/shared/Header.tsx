'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown,
  FileText, Sparkles, BarChart3, BookOpen,
  Wrench, Globe, Lightbulb, Users,
  ArrowRight, Download, Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Menu structure with mega menu support
const menuItems = [
  {
    label: 'Services',
    href: '/services',
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: 'SEO Services',
          items: [
            { label: 'Technical SEO', href: '/services/technical-seo', icon: Wrench, description: 'Site speed, crawlability & Core Web Vitals' },
            { label: 'International SEO', href: '/services/international-seo', icon: Globe, description: 'Multi-language & multi-region optimization' },
            { label: 'Content Strategy', href: '/services/content-strategy', icon: FileText, description: 'Topic clusters & E-E-A-T optimization' },
          ],
        },
        {
          title: 'Consulting',
          items: [
            { label: 'SEO Audit', href: '/services/seo-audit', icon: BarChart3, description: 'Comprehensive site analysis' },
            { label: 'SEO Training', href: '/services/training', icon: Users, description: 'Team workshops & coaching' },
            { label: 'Strategy Sessions', href: '/services/strategy', icon: Lightbulb, description: '1:1 expert consultation' },
          ],
        },
      ],
      featured: {
        title: 'Free SEO Audit',
        description: 'Get a comprehensive analysis of your website\'s SEO health.',
        href: '/contact',
        cta: 'Request Audit',
      },
    },
  },
  {
    label: 'Resources',
    href: '/resources',
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: 'Learn',
          items: [
            { label: 'Blog', href: '/blog', icon: FileText, description: 'SEO insights & strategies' },
            { label: 'Case Studies', href: '/case-studies', icon: BarChart3, description: 'Real results & success stories' },
            { label: 'SEO Glossary', href: '/glossary', icon: BookOpen, description: '200+ terms explained' },
          ],
        },
        {
          title: 'Tools',
          items: [
            { label: 'Free Templates', href: '/templates', icon: Download, description: 'Checklists & spreadsheets' },
            { label: 'AI SEO Agents', href: '/agents', icon: Bot, description: 'Claude-powered tools' },
          ],
        },
      ],
      featured: {
        title: 'AI-Powered SEO',
        description: 'Try our intelligent SEO agents built on Claude.',
        href: '/agents',
        cta: 'Explore Agents',
        accent: true,
      },
    },
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

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
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMegaMenu && handleMenuEnter(item.label)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                  )}
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeMenu === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {item.hasMegaMenu && activeMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      onMouseEnter={() => handleMenuEnter(item.label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200/60 overflow-hidden min-w-[540px]">
                        <div className="flex">
                          {/* Menu Columns */}
                          <div className="flex-1 p-5 grid grid-cols-2 gap-5">
                            {item.megaMenu?.columns.map((column, idx) => (
                              <div key={idx}>
                                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-3">
                                  {column.title}
                                </h4>
                                <div className="space-y-1">
                                  {column.items.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-neutral-100 group-hover:bg-primary-100 flex items-center justify-center shrink-0 transition-colors">
                                        <subItem.icon className="w-4.5 h-4.5 text-neutral-500 group-hover:text-primary-600 transition-colors" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-neutral-800 group-hover:text-primary-600 transition-colors">
                                          {subItem.label}
                                        </p>
                                        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
                                          {subItem.description}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Featured Section */}
                          {item.megaMenu?.featured && (
                            <div className={cn(
                              'w-56 p-5 border-l border-neutral-100',
                              item.megaMenu.featured.accent
                                ? 'bg-gradient-to-br from-primary-50 to-accent-50/30'
                                : 'bg-neutral-50'
                            )}>
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-primary-500" />
                                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                                  Featured
                                </span>
                              </div>
                              <h4 className="font-semibold text-neutral-900 mb-1">
                                {item.megaMenu.featured.title}
                              </h4>
                              <p className="text-sm text-neutral-600 mb-4">
                                {item.megaMenu.featured.description}
                              </p>
                              <Link
                                href={item.megaMenu.featured.href}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                              >
                                {item.megaMenu.featured.cta}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-soft-sm"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

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
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="container-custom py-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <MobileMenuItem key={item.label} item={item} pathname={pathname} />
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100">
                <Link
                  href={ctaHref}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Mobile menu item component with accordion
function MobileMenuItem({ item, pathname }: { item: typeof menuItems[0]; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.hasMegaMenu) {
    return (
      <Link
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
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
      >
        {item.label}
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2">
              {item.megaMenu?.columns.map((column, idx) => (
                <div key={idx} className="mb-3">
                  <p className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {column.title}
                  </p>
                  {column.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                    >
                      <subItem.icon className="w-4 h-4 text-neutral-400" />
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
