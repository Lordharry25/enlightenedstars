'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProductFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('Products');
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const updateFilters = (newCategory: string, newQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory !== 'All') {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between bg-gray-800/50 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-700 relative z-10">
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
        <button 
          onClick={() => updateFilters('All', query)}
          className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${currentCategory === 'All' ? 'bg-primary text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600'}`}
        >
          {t('allCategories')}
        </button>
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => updateFilters(c, query)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${currentCategory === c ? 'bg-primary text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600'}`}
          >
            {c}
          </button>
        ))}
      </div>
      
      <div className="relative w-full md:w-96 shrink-0 group">
        <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') updateFilters(currentCategory, query);
          }}
          className="block w-full ps-11 pe-24 py-3 border border-gray-600 rounded-full leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-all shadow-inner focus:bg-gray-600"
          placeholder={t('searchPlaceholder')}
        />
        <button 
          onClick={() => updateFilters(currentCategory, query)}
          className="absolute inset-y-1 end-1 px-5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-blue-800 transition-all shadow-sm"
        >
          {isPending ? '...' : t('search')}
        </button>
      </div>
    </div>
  );
}
