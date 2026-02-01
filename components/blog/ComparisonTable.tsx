'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus, Trophy, ArrowRight } from 'lucide-react';
import type { ComparisonPost } from '@/types';

interface ComparisonTableProps {
  post: ComparisonPost;
}

export function ComparisonTable({ post }: ComparisonTableProps) {
  const { items, comparisonCriteria, winner } = post;

  if (!items || items.length === 0) return null;

  const getFeatureIcon = (value: boolean | string | undefined) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      );
    }
    if (value === undefined || value === null || value === '') {
      return <Minus className="w-5 h-5 text-neutral-400" />;
    }
    return <span className="text-neutral-700">{value}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {/* Winner Banner */}
      {winner && (
        <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-700">Our Top Pick</p>
              <p className="text-xl font-bold text-amber-900">{winner.name}</p>
              <p className="text-sm text-amber-700 mt-1">{winner.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border-2 ${
              winner?.name === item.name
                ? 'border-amber-400 bg-amber-50'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-800">{item.name}</h3>
                {item.tagline && (
                  <p className="text-sm text-neutral-500 mt-1">{item.tagline}</p>
                )}
              </div>
              {winner?.name === item.name && (
                <span className="px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                  WINNER
                </span>
              )}
            </div>

            {/* Rating */}
            {item.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= item.rating!
                          ? 'text-amber-400'
                          : 'text-neutral-200'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-neutral-600">
                  {item.rating}/5
                </span>
              </div>
            )}

            {/* Price */}
            {item.pricing && (
              <div className="mb-4">
                <p className="text-2xl font-bold text-primary-600">
                  {item.pricing}
                </p>
              </div>
            )}

            {/* Pros & Cons */}
            <div className="space-y-4">
              {item.pros && item.pros.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">Pros</p>
                  <ul className="space-y-1">
                    {item.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.cons && item.cons.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-700 mb-2">Cons</p>
                  <ul className="space-y-1">
                    {item.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      {comparisonCriteria && comparisonCriteria.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="py-4 px-6 text-left font-semibold text-neutral-700">
                  Feature
                </th>
                {items.map((item, index) => (
                  <th
                    key={index}
                    className="py-4 px-6 text-center font-semibold text-neutral-700"
                  >
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonCriteria.map((criteria, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}
                >
                  <td className="py-4 px-6 font-medium text-neutral-700">
                    {criteria}
                  </td>
                  {items.map((item, itemIndex) => (
                    <td key={itemIndex} className="py-4 px-6 text-center">
                      {getFeatureIcon(
                        item.features?.[criteria.toLowerCase().replace(/\s/g, '_')]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
