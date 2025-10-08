'use client';

import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          >
            <span className="font-medium text-gray-800">{item.title}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openItems.includes(item.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openItems.includes(item.id) && (
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <p className="text-gray-600">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
