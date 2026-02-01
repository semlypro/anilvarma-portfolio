'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { mockNavigation, mockSiteSettings } from '@/lib/mocks/data';

export function Footer() {
  const footerNav = mockNavigation.footerNav;
  const siteSettings = mockSiteSettings;

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
              {siteSettings.socialLinks.linkedin && (
                <a
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {siteSettings.socialLinks.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
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
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{siteSettings.contactEmail}</span>
              </a>
              {siteSettings.contactPhone && (
                <a
                  href={`tel:${siteSettings.contactPhone}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{siteSettings.contactPhone}</span>
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
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
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
