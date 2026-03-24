import { getTranslations } from 'next-intl/server';
import prisma from '../../../lib/prisma';
import ProductFilters from '../../../components/ProductFilters';
import ProductGalleryClient from '../../../components/ProductGalleryClient';
import StarsBackground from '../../../components/StarsBackground';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const PRODUCTS_PER_PAGE = 12;

export default async function ProductsPage({ 
  params: { locale },
  searchParams
}: { 
  params: { locale: string },
  searchParams: { q?: string, category?: string, page?: string }
}) {
  const t = await getTranslations('Products');
  const q = searchParams.q || '';
  const category = searchParams.category || '';
  const currentPage = Math.max(1, parseInt(searchParams.page || '1'));

  // Get unique categories for filter
  const uniqueCategories = await prisma.product.findMany({
    where: { isVisible: true },
    select: { category: true },
    distinct: ['category']
  });
  const categoriesList = uniqueCategories.map(c => c.category);

  // Filter conditions
  const whereCondition: any = { isVisible: true };
  if (category) {
    whereCondition.category = category;
  }
  if (q) {
    whereCondition.OR = [
      { name_en: { contains: q } },
      { name_ar: { contains: q } },
      { description_en: { contains: q } },
      { description_ar: { contains: q } } 
    ];
  }

  // Get total count for pagination
  const totalProducts = await prisma.product.count({ where: whereCondition });
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const products = await prisma.product.findMany({
    where: whereCondition,
    orderBy: { createdAt: 'desc' },
    skip: (safePage - 1) * PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,
  });

  // Build pagination URL helper
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (q) params.set('q', q);
    params.set('page', String(page));
    return `/${locale}/products?${params.toString()}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen relative overflow-hidden">
      <StarsBackground />

      {/* Animated Hero Header */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-start">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold animate-pulse">
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                {locale === 'ar' ? 'B2B حصرياً' : 'B2B Exclusive'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {t('subtitle')}
            </p>
            {/* Animated gradient line */}
            <div className="mt-6 h-1 w-32 md:mx-0 mx-auto rounded-full bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] animate-gradient" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <ProductFilters categories={categoriesList} />

        {products.length === 0 ? (
          <div className="text-center py-32 bg-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-700 shadow-lg relative z-10 animate-fadeInUp">
            <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t('noProducts')}</h3>
            <p className="text-gray-400 mb-8">{t('noProductsHint')}</p>
            <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 bg-primary hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
               {t('clearFilters')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        ) : (
          <>
            <ProductGalleryClient products={products} locale={locale} noPricesText={t('noPrices')} />
            
            {/* Animated Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-2 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                {safePage > 1 && (
                  <Link 
                    href={buildPageUrl(safePage - 1)} 
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-800 text-gray-300 hover:bg-primary hover:text-white border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                  >
                    {t('prev')}
                  </Link>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Link
                    key={page}
                    href={buildPageUrl(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      page === safePage 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700 hover:scale-110'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
                
                {safePage < totalPages && (
                  <Link 
                    href={buildPageUrl(safePage + 1)} 
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-800 text-gray-300 hover:bg-primary hover:text-white border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                  >
                    {t('next')}
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
