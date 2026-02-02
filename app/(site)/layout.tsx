import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { FloatingCTA } from '@/components/shared/FloatingCTA';
import { getNavigation, getSiteSettings } from '@/lib/sanity/fetch';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navigation, siteSettings] = await Promise.all([
    getNavigation().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        navigation={navigation?.mainNav}
        ctaLabel={siteSettings?.ctaLabel}
        ctaHref={siteSettings?.ctaHref}
      />
      <main className="flex-1">{children}</main>
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <FloatingCTA />
    </div>
  );
}
