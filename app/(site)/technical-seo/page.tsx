import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, Search, Gauge, Server, Shield, Code,
  CheckCircle2, ArrowRight, Clock, Users, TrendingUp,
  FileText, BarChart3, Target
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical SEO Services | Site Speed & Core Web Vitals Optimization | Anil Varma',
  description: 'Expert technical SEO services to boost your site speed, improve crawlability, and optimize Core Web Vitals. 15+ years of experience delivering measurable results.',
  openGraph: {
    title: 'Technical SEO Services | Site Speed & Core Web Vitals',
    description: 'Transform your website\'s technical foundation for better rankings and user experience.',
    type: 'website',
  },
};

const benefits = [
  {
    icon: Gauge,
    title: 'Faster Site Speed',
    description: 'Optimize loading times to improve user experience and search rankings'
  },
  {
    icon: TrendingUp,
    title: 'Higher Rankings',
    description: 'Fix technical issues that are holding your site back in search results'
  },
  {
    icon: Users,
    title: 'Better UX',
    description: 'Create a smooth, fast experience that keeps visitors engaged'
  },
  {
    icon: Shield,
    title: 'Improved Security',
    description: 'Implement HTTPS, security headers, and best practices'
  },
];

const services = [
  {
    icon: Server,
    title: 'Site Architecture',
    items: [
      'URL structure optimization',
      'Internal linking strategy',
      'Site hierarchy & navigation',
      'Canonical tag implementation'
    ]
  },
  {
    icon: Gauge,
    title: 'Core Web Vitals',
    items: [
      'Largest Contentful Paint (LCP)',
      'First Input Delay (FID)',
      'Cumulative Layout Shift (CLS)',
      'Performance optimization'
    ]
  },
  {
    icon: Search,
    title: 'Crawlability & Indexing',
    items: [
      'Robots.txt optimization',
      'XML sitemap creation',
      'Meta robots & directives',
      'Crawl budget management'
    ]
  },
  {
    icon: Code,
    title: 'Technical Implementation',
    items: [
      'Structured data (Schema.org)',
      'Mobile responsiveness',
      'JavaScript SEO',
      'Progressive Web App (PWA)'
    ]
  },
];

const process = [
  {
    step: 1,
    title: 'Technical Audit',
    description: 'Comprehensive analysis of your site\'s technical health',
    duration: '3-5 days'
  },
  {
    step: 2,
    title: 'Priority Roadmap',
    description: 'Prioritized list of issues by impact and effort',
    duration: '1-2 days'
  },
  {
    step: 3,
    title: 'Implementation',
    description: 'Fix critical issues and optimize performance',
    duration: '2-4 weeks'
  },
  {
    step: 4,
    title: 'Monitor & Iterate',
    description: 'Track improvements and make ongoing optimizations',
    duration: 'Ongoing'
  },
];

const results = [
  {
    metric: '58%',
    label: 'Faster Page Load',
    subtext: 'Average improvement in LCP'
  },
  {
    metric: '3.2x',
    label: 'More Crawled Pages',
    subtext: 'Improved crawl efficiency'
  },
  {
    metric: '41%',
    label: 'Higher Rankings',
    subtext: 'Avg. position improvement'
  },
];

export default function TechnicalSEOPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Technical SEO
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Fix Technical Issues <br />
              <span className="text-primary-600">Boost Rankings</span>
            </h1>

            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl">
              Expert technical SEO services to optimize your site speed, improve crawlability,
              and fix critical issues preventing you from ranking higher in search results.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">{benefit.title}</h3>
                    <p className="text-xs text-neutral-600 mt-0.5">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Get Free Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl font-semibold hover:border-neutral-300 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-white border-y border-neutral-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Average improvements from technical SEO optimization projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {result.metric}
                </div>
                <div className="text-lg font-semibold text-neutral-900 mb-1">
                  {result.label}
                </div>
                <div className="text-sm text-neutral-600">
                  {result.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              What's Included
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive technical SEO services to optimize every aspect of your site
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl p-6 border border-neutral-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mt-2">{service.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A proven 4-step process to transform your site's technical foundation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item, idx) => (
              <div key={item.step} className="relative">
                {idx < process.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-primary-200" />
                )}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-xl font-bold flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Fix Your Technical SEO?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Get a free technical SEO audit and discover what's holding your site back
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors text-lg"
              >
                <FileText className="w-5 h-5" />
                Request Free Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors text-lg border-2 border-primary-500"
              >
                <Target className="w-5 h-5" />
                See Results
              </Link>
            </div>

            <p className="text-sm text-primary-200 mt-6">
              No credit card required • Free 30-min consultation included
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
