'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bot, ArrowLeft, ChevronRight, Sparkles, Play, CheckCircle,
  Search, FileText, Settings, BarChart3, Link2, Globe,
  Loader2, ArrowRight, Zap, Shield, Clock
} from 'lucide-react';
import { AgentCard } from '@/components/agents/AgentCard';
import type { SEOAgent } from '@/types';

interface AgentDetailPageProps {
  agent: SEOAgent;
  relatedAgents: SEOAgent[];
}

const categoryIcons: Record<string, any> = {
  'Keyword Research': Search,
  'Content': FileText,
  'Technical': Settings,
  'Analytics': BarChart3,
  'Link Building': Link2,
  'Local SEO': Globe,
};

export function AgentDetailPage({ agent, relatedAgents }: AgentDetailPageProps) {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const Icon = categoryIcons[agent.category || ''] || Bot;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || agent.status === 'coming_soon') return;

    setIsProcessing(true);
    setResult(null);

    try {
      // Simulate API call - would be replaced with actual Claude API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response
      setResult(`
## Analysis Results for "${inputValue}"

Based on Claude's analysis, here are the key findings:

1. **Primary Insights**: Your input has been analyzed using advanced NLP techniques.

2. **Recommendations**:
   - Consider optimizing for related long-tail variations
   - Focus on user intent alignment
   - Implement structured data for better visibility

3. **Next Steps**: Review the detailed report and implement the suggested optimizations.

*This is a demo response. In production, this would be powered by the Claude Sonnet API.*
      `);
    } catch (error) {
      setResult('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-purple-50 via-primary-50 to-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link href="/agents" className="hover:text-purple-600 transition-colors">
              AI Agents
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-700">{agent.category}</span>
          </motion.nav>

          <div className="max-w-4xl">
            {/* Icon & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center shadow-lg">
                <Icon className="w-10 h-10 text-white" />
              </div>

              <div className="flex flex-wrap gap-2">
                {agent.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Active
                  </span>
                ) : agent.status === 'beta' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                    <Zap className="w-4 h-4" />
                    Beta
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600">
                    Coming Soon
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  <Sparkles className="w-4 h-4" />
                  Powered by Claude
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-6"
            >
              {agent.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-600 leading-relaxed mb-8"
            >
              {agent.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-6"
            >
              {agent.usageCount && (
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-neutral-800">
                    {agent.usageCount.toLocaleString()}
                  </span>
                  <span className="text-neutral-500">uses</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-neutral-400" />
                <span className="text-neutral-500">~5 seconds response time</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-neutral-500">Data not stored</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agent Interface */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl border border-neutral-200 p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center gap-3">
                <Play className="w-5 h-5 text-purple-600" />
                Try {agent.name}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="input" className="block text-sm font-medium text-neutral-700 mb-2">
                    {agent.inputPlaceholder || 'Enter your input'}
                  </label>
                  <textarea
                    id="input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={agent.inputPlaceholder || 'Enter a keyword, URL, or content to analyze...'}
                    rows={4}
                    disabled={agent.status === 'coming_soon'}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400 disabled:bg-neutral-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !inputValue.trim() || agent.status === 'coming_soon'}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-primary-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-primary-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing with Claude...
                    </>
                  ) : agent.status === 'coming_soon' ? (
                    'Coming Soon'
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Run Analysis
                    </>
                  )}
                </button>
              </form>

              {/* Results */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-white rounded-2xl border border-neutral-200"
                >
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Analysis Complete
                  </h3>
                  <div className="prose prose-neutral max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-neutral-600 font-sans">
                      {result}
                    </pre>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {agent.features && agent.features.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 text-center mb-12">
                What This Agent Can Do
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {agent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-neutral-700">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {agent.useCases && agent.useCases.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 text-center mb-4">
                Use Cases
              </h2>
              <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
                See how professionals use this agent to improve their SEO workflow.
              </p>

              <div className="space-y-6">
                {agent.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-neutral-700">{useCase}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Agents */}
      {relatedAgents.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Related Agents
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedAgents.map((relatedAgent, index) => (
                <motion.div
                  key={relatedAgent.slug?.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AgentCard agent={relatedAgent} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Agents */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center">
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all agents
          </Link>
        </div>
      </section>
    </main>
  );
}
