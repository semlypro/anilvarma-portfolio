import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { FloatingCTA } from '@/components/shared/FloatingCTA';
import { getNavigation, getSiteSettings } from '@/lib/sanity/fetch';

// Default navigation for fallback
const defaultNavigation = [
  { _key: '1', label: 'About', href: '/about' },
  { _key: '2', label: 'Blog', href: '/blog' },
  { _key: '3', label: 'Templates', href: '/templates' },
  { _key: '4', label: 'Agents', href: '/agents' },
  { _key: '5', label: 'Case Studies', href: '/case-studies' },
  { _key: '6', label: 'Glossary', href: '/glossary' },
];

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch navigation and settings from Sanity
  const [navigation, siteSettings] = await Promise.all([
    getNavigation().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  // Use Sanity data if available, otherwise fallback to defaults
  const navItems = navigation?.mainNav || defaultNavigation;
  const ctaLabel = 'Book a Call';
  const ctaHref = '/contact';

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        navigation={navItems}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
      <main className="flex-1">{children}</main>
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <FloatingCTA showOnMobileOnly={true} />
    </div>
  );
}
