import { getTranslations } from 'next-intl/server';
import prisma from '../../../lib/prisma';
import ProductFilters from '../../../components/ProductFilters';
import ProductGalleryClient from '../../../components/ProductGalleryClient';
import StarsBackground from '../../../components/StarsBackground';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function ProductsPage({ 
  params: { locale },
  searchParams
}: { 
  params: { locale: string },
  searchParams: { q?: string, category?: string }
}) {
  const t = await getTranslations('Products');
  const q = searchParams.q || '';
  const category = searchParams.category || '';

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

  const products = await prisma.product.findMany({
    where: whereCondition,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-gray-900 min-h-screen py-16 relative overflow-hidden">
      <StarsBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center md:text-start">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto md:mx-0">
            {locale === 'ar' ? "تصفح الكتالوج الشامل للعلامات التجارية العالمية. تواصل معنا للحصول على أسعار الجملة." : "Browse our comprehensive B2B catalog of global FMCG brands. Please contact us for wholesale pricing requirements."}
          </p>
        </div>

        <ProductFilters categories={categoriesList} />

        {products.length === 0 ? (
          <div className="text-center py-32 bg-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-700 shadow-lg relative z-10">
            <h3 className="text-2xl font-bold text-white mb-3">{locale === 'ar' ? "لم يتم العثور على منتجات" : "No products found"}</h3>
            <p className="text-gray-400 mb-8">{locale === 'ar' ? "حاول التصفية باستخدام مصطلحات مختلفة." : "Try adjusting your search query or filters."}</p>
            <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-transform hover:translate-x-1 rtl:hover:-translate-x-1">
               {locale === 'ar' ? "مسح التصفيات" : "Clear Filters"} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        ) : (
          <ProductGalleryClient products={products} locale={locale} noPricesText={t('noPrices')} />
        )}
      </div>
    </div>
  );
}
