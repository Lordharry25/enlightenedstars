'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // next-intl middleware uses /en/path or /ar/path
    // If pathname is /en/about, replacing /en with /ar gives /ar/about
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    
    // If pathname is just "/" (handled by middleware but visually might not have locale),
    // next-intl usually redirects cleanly, but it's safe to just push the new path.
    router.push(newPathname === pathname ? `/${newLocale}${pathname}` : newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      {locale === 'en' ? (
        <button
          onClick={() => handleLocaleChange('ar')}
          className="px-3 py-1 text-sm font-medium rounded-md transition-colors bg-primary text-white hover:bg-blue-800"
        >
          عربي
        </button>
      ) : (
        <button
          onClick={() => handleLocaleChange('en')}
          className="px-3 py-1 text-sm font-medium rounded-md transition-colors bg-primary text-white hover:bg-blue-800"
        >
          English
        </button>
      )}
    </div>
  );
}
