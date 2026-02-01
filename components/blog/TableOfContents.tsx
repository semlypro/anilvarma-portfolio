'use client';

import { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

// Placeholder TOC - would be generated from article content
const mockTocItems = [
  { id: 'introduction', title: 'Introduction', level: 1 },
  { id: 'key-concepts', title: 'Key Concepts', level: 1 },
  { id: 'implementation', title: 'Implementation', level: 1 },
  { id: 'best-practices', title: 'Best Practices', level: 2 },
  { id: 'common-mistakes', title: 'Common Mistakes', level: 2 },
  { id: 'conclusion', title: 'Conclusion', level: 1 },
];

export function TableOfContents() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <nav className="bg-neutral-50 rounded-2xl p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
          <List className="w-4 h-4" />
          Table of Contents
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        )}
      </button>

      {isExpanded && (
        <ul className="mt-4 space-y-2">
          {mockTocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`block text-sm transition-colors ${
                  item.level === 2 ? 'pl-4' : ''
                } ${
                  activeId === item.id
                    ? 'text-primary-600 font-medium'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
