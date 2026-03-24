'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  const t = useTranslations('Error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-gray-500 mb-8">{t('description')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={reset} 
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" /> {t('retry')}
          </button>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all"
          >
            <Home className="w-4 h-4" /> {t('goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
