'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import type { Navigation, SiteSettings } from '@/types';

// Default fallback data
const defaultFooterNav = {
  columns: [
    {
      _key: 'resources',
      title: 'Resources',
      items: [
        { _key: '1', label: 'Blog', href: '/blog' },
        { _key: '2', label: 'Templates', href: '/templates' },
        { _key: '3', label: 'SEO Agents', href: '/agents' },
        { _key: '4', label: 'Glossary', href: '/glossary' },
      ],
    },
    {
      _key: 'company',
      title: 'Company',
      items: [
        { _key: '1', label: 'About', href: '/about' },
        { _key: '2', label: 'Case Studies', href: '/case-studies' },
        { _key: '3', label: 'Contact', href: '/contact' },
      ],
    },
    {
      _key: 'legal',
      title: 'Legal',
      items: [
        { _key: '1', label: 'Privacy Policy', href: '/privacy' },
        { _key: '2', label: 'Terms of Service', href: '/terms' },
      ],
    },
  ],
};

const defaultSiteSettings = {
  contactEmail: 'anilvarma2302@gmail.com',
  contactPhone: '+31627910520',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/anil-varma/',
    twitter: 'https://twitter.com/anilvarma',
  },
};

interface FooterProps {
  navigation?: Navigation | null;
  siteSettings?: SiteSettings | null;
}

export function Footer({ navigation, siteSettings }: FooterProps) {
  const footerNav = navigation?.footerNav || defaultFooterNav;
  const settings = siteSettings || defaultSiteSettings;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer */}
      <div className="container-custom section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              Anil Varma
            </Link>
            <p className="mt-4 text-neutral-400 max-w-md leading-relaxed">
              SEO Expert with 15+ years of experience helping businesses grow
              through organic search. Specializing in technical SEO, content
              strategy, and data-driven optimization.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{settings.contactEmail}</span>
              </a>
              {settings.contactPhone && (
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{settings.contactPhone}</span>
                </a>
              )}
              <div className="flex items-center gap-3 text-neutral-400">
                <MapPin className="w-4 h-4" />
                <span>Netherlands</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerNav.columns.map((column) => (
            <div key={column._key}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item._key}>
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} Anil Varma. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
