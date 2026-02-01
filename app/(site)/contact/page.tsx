import { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | Schedule a Consultation | Anil Varma',
  description: 'Get in touch for SEO consulting, strategy sessions, or collaboration opportunities. Schedule a free 30-minute consultation.',
  openGraph: {
    title: 'Contact | Schedule a Consultation | Anil Varma',
    description: 'Get in touch for SEO consulting, strategy sessions, or collaboration opportunities. Schedule a free 30-minute consultation.',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactPage />;
}
