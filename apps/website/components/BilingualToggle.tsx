'use client';

import React from 'react';
import { Language } from '../lib/translations';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const BilingualToggle: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-clinic-indigo/10 p-1 rounded-lg border border-clinic-indigo/20 text-xs font-semibold">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-2.5 py-1 rounded transition-colors ${
          currentLang === 'en'
            ? 'bg-clinic-indigo text-white shadow-sm'
            : 'text-slate-600 hover:text-clinic-indigo'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('hi')}
        className={`px-2.5 py-1 rounded transition-colors ${
          currentLang === 'hi'
            ? 'bg-clinic-indigo text-white shadow-sm'
            : 'text-slate-600 hover:text-clinic-indigo'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};
