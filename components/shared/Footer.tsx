'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import type { Navigation, SiteSettings } from '@/types';

interface FooterProps {
  navigation?: Navigation | null;
  siteSettings?: SiteSettings | null;
}

export function Footer({ navigation, siteSettings }: FooterProps) {
  const footerNav = navigation?.footerNav;
  const settings = siteSettings;

  const currentYear = new Date().getFullYear();

  if (!settings && !footerNav) {
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer */}
      <div className="container-custom section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          {settings && (
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-white">
                {settings.companyName || 'Company'}
              </Link>
              {settings.companyDescription && (
                <p className="mt-4 text-neutral-400 max-w-md leading-relaxed">
                  {settings.companyDescription}
                </p>
              )}

              {/* Social Links */}
              {settings.socialLinks && (settings.socialLinks.linkedin || settings.socialLinks.twitter) && (
                <div className="flex gap-4 mt-6">
                  {settings.socialLinks.linkedin && (
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
                  {settings.socialLinks.twitter && (
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
              )}

              {/* Contact Info */}
              {(settings.contactEmail || settings.contactPhone || settings.location) && (
                <div className="mt-6 space-y-3">
                  {settings.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{settings.contactEmail}</span>
                    </a>
                  )}
                  {settings.contactPhone && (
                    <a
                      href={`tel:${settings.contactPhone}`}
                      className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{settings.contactPhone}</span>
                    </a>
                  )}
                  {settings.location && (
                    <div className="flex items-center gap-3 text-neutral-400">
                      <MapPin className="w-4 h-4" />
                      <span>{settings.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Columns */}
          {footerNav?.columns?.map((column) => (
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
      {settings?.companyName && (
        <div className="border-t border-neutral-800">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-neutral-500 text-sm">
                &copy; {currentYear} {settings.companyName}. All rights reserved.
              </p>
              {footerNav?.columns && (
                <div className="flex items-center gap-6 text-sm">
                  {footerNav.columns.find(col => col.title === 'Legal')?.items.map((item) => (
                    <Link
                      key={item._key}
                      href={item.href}
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
