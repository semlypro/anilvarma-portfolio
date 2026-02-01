import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Text */}
          <div className="text-[150px] md:text-[200px] font-bold text-primary-100 leading-none select-none">
            404
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 -mt-8 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-700 rounded-xl font-semibold border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Blog
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 mb-4">Popular destinations:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'About', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Templates', href: '/templates' },
                { label: 'AI Agents', href: '/agents' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
