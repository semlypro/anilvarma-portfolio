'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus, Trophy, ArrowRight } from 'lucide-react';
import type { ComparisonPost } from '@/types';

interface ComparisonTableProps {
  post: ComparisonPost;
}

export function ComparisonTable({ post }: ComparisonTableProps) {
  const { itemA, itemB, comparisonTable, verdict } = post;

  if (!itemA || !itemB) return null;

  const items = [itemA, itemB];

  const getWinnerIcon = (winner: 'A' | 'B' | 'Tie') => {
    if (winner === 'Tie') {
      return <Minus className="w-5 h-5 text-neutral-400" />;
    }
    return <Trophy className="w-4 h-4 text-amber-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {/* Winner Banner */}
      {verdict && (
        <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-700">Our Verdict</p>
              <p className="text-xl font-bold text-amber-900">{verdict.winner}</p>
              <p className="text-sm text-amber-700 mt-1">{verdict.summary}</p>
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
              verdict?.winner === item.name
                ? 'border-amber-400 bg-amber-50'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-800">{item.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
              </div>
              {verdict?.winner === item.name && (
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
                        star <= item.rating
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
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Visit Website
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            {/* Best For */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-sm text-neutral-600">
                <span className="font-medium">Best for: </span>
                {index === 0 ? verdict?.itemABestFor : verdict?.itemBBestFor}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      {comparisonTable && comparisonTable.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="py-4 px-6 text-left font-semibold text-neutral-700">
                  Feature
                </th>
                <th className="py-4 px-6 text-center font-semibold text-neutral-700">
                  {itemA.name}
                </th>
                <th className="py-4 px-6 text-center font-semibold text-neutral-700">
                  {itemB.name}
                </th>
                <th className="py-4 px-6 text-center font-semibold text-neutral-700">
                  Winner
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, index) => (
                <tr
                  key={row._key || index}
                  className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}
                >
                  <td className="py-4 px-6 font-medium text-neutral-700">
                    {row.feature}
                  </td>
                  <td className={`py-4 px-6 text-center ${row.winner === 'A' ? 'text-green-600 font-medium' : 'text-neutral-600'}`}>
                    {row.itemAValue}
                  </td>
                  <td className={`py-4 px-6 text-center ${row.winner === 'B' ? 'text-green-600 font-medium' : 'text-neutral-600'}`}>
                    {row.itemBValue}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.winner === 'A' ? itemA.name : row.winner === 'B' ? itemB.name : 'Tie'}
                    {getWinnerIcon(row.winner)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
