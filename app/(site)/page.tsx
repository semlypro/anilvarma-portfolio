import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FeaturedBlogSection } from '@/components/sections/FeaturedBlogSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import {
  mockHomepage,
  mockBlogPosts,
  mockTestimonials,
} from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'Anil Varma - SEO Expert | Technical SEO & Organic Growth',
  description:
    'SEO Expert with 15+ years scaling traffic from 0 to 10M+. Get data-driven SEO strategies that deliver measurable results.',
};

export default function HomePage() {
  const homepage = mockHomepage;
  const blogPosts = mockBlogPosts.slice(0, 3);
  const testimonials = mockTestimonials;

  return (
    <>
      <HeroSection
        headline={homepage.hero.headline}
        subheadline={homepage.hero.subheadline}
        ctaText={homepage.hero.ctaText}
        ctaLink={homepage.hero.ctaLink}
        secondaryCtaText={homepage.hero.secondaryCtaText}
        secondaryCtaLink={homepage.hero.secondaryCtaLink}
      />

      <StatsSection stats={homepage.stats} />

      <ServicesSection services={homepage.services} />

      <FeaturedBlogSection posts={blogPosts} />

      <TestimonialsSection testimonials={testimonials} />

      <CTASection
        title="Ready to Scale Your Organic Traffic?"
        description="Book a free 30-minute consultation to discuss your SEO challenges and discover growth opportunities."
        buttonText="Book a Free Consultation"
        buttonLink="/book-call"
      />
    </>
  );
}
