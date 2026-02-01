import { Metadata } from 'next';
import { AboutHero } from '@/components/sections/AboutHero';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { CTASection } from '@/components/sections/CTASection';
import { getAbout } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'About Anil Varma | SEO Expert with 15+ Years Experience',
  description:
    'Learn about Anil Varma - SEO expert who has scaled traffic from 0 to 10M+ users. 15+ years of experience in technical SEO and content strategy.',
};

export default async function AboutPage() {
  const about = await getAbout().catch(() => null);

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AboutHero
        headline={about.headline}
        subheadline={about.subheadline}
      />

      <ExperienceTimeline experiences={about.experiences} />

      <SkillsSection skills={about.skills} />

      <CertificationsSection certifications={about.certifications} />

      <CTASection
        title={about.cta.title}
        description={about.cta.description}
        buttonText={about.cta.buttonText}
        buttonLink={about.cta.buttonLink}
      />
    </>
  );
}
