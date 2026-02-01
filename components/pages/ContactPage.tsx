'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Calendar, Send, Loader2,
  CheckCircle, Clock, MessageSquare, ArrowRight
} from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
  };

  const services = [
    'SEO Audit',
    'SEO Strategy',
    'Technical SEO',
    'Content Strategy',
    'Link Building',
    'Local SEO',
    'E-commerce SEO',
    'Other',
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="overline">Contact</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-neutral-800">
              Let's Work Together
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              Ready to improve your organic search performance? Get in touch for a free
              consultation and let's discuss how I can help grow your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-neutral-800 mb-8">
                Get in Touch
              </h2>

              {/* Contact Methods */}
              <div className="space-y-6 mb-12">
                <a
                  href="mailto:anil@example.com"
                  className="flex items-start gap-4 p-5 bg-neutral-50 rounded-2xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Email</p>
                    <p className="text-neutral-600">anil@example.com</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      I'll respond within 24 hours
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+1234567890"
                  className="flex items-start gap-4 p-5 bg-neutral-50 rounded-2xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Phone</p>
                    <p className="text-neutral-600">+1 (234) 567-890</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Available Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Location</p>
                    <p className="text-neutral-600">San Francisco, CA</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Available for remote & on-site work
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule Call CTA */}
              <div className="p-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-primary-200" />
                  <h3 className="text-xl font-semibold">Schedule a Call</h3>
                </div>
                <p className="text-primary-100 mb-6">
                  Book a free 30-minute consultation to discuss your SEO needs
                  and how I can help.
                </p>
                <a
                  href="https://calendly.com/anil-varma" // Placeholder
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Response Time */}
              <div className="mt-8 flex items-center gap-3 text-neutral-500">
                <Clock className="w-5 h-5" />
                <span>Average response time: 4 hours</span>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-neutral-50 rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                  Send a Message
                </h2>
                <p className="text-neutral-600 mb-8">
                  Fill out the form below and I'll get back to you shortly.
                </p>

                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-600">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 text-primary-600 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="john@company.com"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white resize-none"
                        placeholder="Tell me about your project and SEO goals..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-neutral-800 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'What is your typical engagement process?',
                  a: 'I start with a free 30-minute consultation to understand your goals. Then, I conduct a comprehensive audit and present a customized strategy. Once approved, we begin implementation with regular progress updates.',
                },
                {
                  q: 'How long does it take to see SEO results?',
                  a: 'SEO is a long-term investment. While some improvements can be seen within 1-3 months, significant organic traffic growth typically takes 4-6 months. The timeline depends on your industry competition and current site status.',
                },
                {
                  q: 'Do you work with businesses of all sizes?',
                  a: 'Yes! I work with startups, SMBs, and enterprise companies. My approach is tailored to your specific needs, budget, and growth goals.',
                },
                {
                  q: 'What industries do you specialize in?',
                  a: 'I have experience across various industries including SaaS, e-commerce, finance, healthcare, and professional services. My SEO principles are adaptable to any industry.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl border border-neutral-200"
                >
                  <h3 className="font-semibold text-neutral-800 mb-3">{faq.q}</h3>
                  <p className="text-neutral-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
