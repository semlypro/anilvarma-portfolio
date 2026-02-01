'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Bot, Zap, Brain, Shield } from 'lucide-react';
import { AgentCard } from '@/components/agents/AgentCard';
import type { SEOAgent } from '@/types';

interface AgentsListingPageProps {
  agents: SEOAgent[];
  categories: string[];
}

export function AgentsListingPage({ agents, categories }: AgentsListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = agent.name.toLowerCase().includes(query);
        const matchesDescription = agent.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesDescription) return false;
      }

      if (selectedCategory && agent.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [agents, searchQuery, selectedCategory]);

  const features = [
    {
      icon: Brain,
      title: 'Powered by Claude',
      description: 'Built on Anthropic\'s Claude Sonnet API for intelligent, nuanced SEO analysis',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get actionable SEO insights in seconds, not hours',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is processed securely and never stored',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-purple-50 via-primary-50 to-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-primary-100 rounded-full text-sm font-medium text-purple-700 mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by Claude Sonnet
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-700 via-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight mb-6">
              AI SEO Agents
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              Harness the power of AI to automate your SEO workflow. Each agent is
              specialized for specific tasks, from keyword research to technical audits.
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-8 text-sm text-neutral-500 mb-10">
              <span className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                {agents.length} Agents Available
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Instant Results
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                No Data Stored
              </span>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-primary-100 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters & Agents */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-gradient-to-r from-purple-600 to-primary-600 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All Agents
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Agents Grid */}
          {filteredAgents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.slug?.current || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <AgentCard agent={agent} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Bot className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 text-lg">
                No agents found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="mt-4 text-purple-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              How AI Agents Work
            </h2>
            <p className="text-neutral-600 mb-12 max-w-2xl mx-auto">
              Our AI agents use Claude's advanced language understanding to provide
              actionable SEO recommendations in real-time.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Select Agent', description: 'Choose the agent that fits your SEO task' },
                { step: 2, title: 'Input Data', description: 'Provide the URL, keyword, or content to analyze' },
                { step: 3, title: 'AI Analysis', description: 'Claude processes your input using specialized prompts' },
                { step: 4, title: 'Get Results', description: 'Receive actionable insights and recommendations' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-neutral-200" />
                  )}

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-primary-600 to-accent-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Supercharge Your SEO?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Try any of our AI agents for free. No signup required for basic usage.
            </p>
            <a
              href="#agents"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
            >
              <Bot className="w-5 h-5" />
              Explore AI Agents
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
