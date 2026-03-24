import { getTranslations } from 'next-intl/server';
import { Search, Home } from 'lucide-react';
import Link from 'next/link';

export default async function NotFoundPage() {
  let t;
  try {
    t = await getTranslations('NotFound');
  } catch {
    // Fallback if translations not available
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist or has been moved.',
        goHome: 'Go to Homepage',
      };
      return fallbacks[key] || key;
    };
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-primary" />
        </div>
        <div className="text-8xl font-black text-primary/20 mb-4">404</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-gray-500 mb-8">{t('description')}</p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
        >
          <Home className="w-4 h-4" /> {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
