import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://anilvarma.com'),
  title: {
    default: 'Anil Varma - SEO Expert | Technical SEO & Organic Growth',
    template: '%s | Anil Varma',
  },
  description:
    'SEO Expert with 15+ years of experience. Specializing in technical SEO, content strategy, and organic growth. Scaled traffic from 0 to 10M+ users.',
  keywords: [
    'SEO Expert',
    'Technical SEO',
    'Content Strategy',
    'Organic Growth',
    'SEO Consultant',
    'Digital Marketing',
  ],
  authors: [{ name: 'Anil Varma', url: 'https://anilvarma.com' }],
  creator: 'Anil Varma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anilvarma.com',
    siteName: 'Anil Varma - SEO Expert',
    title: 'Anil Varma - SEO Expert | Technical SEO & Organic Growth',
    description:
      'SEO Expert with 15+ years of experience. Specializing in technical SEO, content strategy, and organic growth.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anil Varma - SEO Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anil Varma - SEO Expert',
    description: 'SEO Expert with 15+ years of experience.',
    creator: '@anilvarma',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, jetbrainsMono.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-neutral-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
