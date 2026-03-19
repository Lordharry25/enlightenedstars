import { getTranslations } from 'next-intl/server';
import prisma from '../../../lib/prisma';
import ProductFilters from '../../../components/ProductFilters';
import { ShoppingBag, ArrowRight } from 'lucide-react';
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
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:text-start">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
            {locale === 'ar' ? "تصفح الكتالوج الشامل للعلامات التجارية العالمية. تواصل معنا للحصول على أسعار الجملة." : "Browse our comprehensive B2B catalog of global FMCG brands. Please contact us for wholesale pricing requirements."}
          </p>
        </div>

        <ProductFilters categories={categoriesList} />

        {products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{locale === 'ar' ? "لم يتم العثور على منتجات" : "No products found"}</h3>
            <p className="text-gray-500 mb-8">{locale === 'ar' ? "حاول التصفية باستخدام مصطلحات مختلفة." : "Try adjusting your search query or filters."}</p>
            <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
               {locale === 'ar' ? "مسح التصفيات" : "Clear Filters"} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col transform hover:-translate-y-1">
                <div className="relative h-60 w-full bg-white p-6 flex-shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={locale === 'en' ? product.name_en : product.name_ar}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-darken"
                  />
                  <div className="absolute top-4 start-4">
                     <span className="bg-gray-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                       {product.category}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative overflow-hidden">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {locale === 'en' ? product.name_en : product.name_ar}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 text-sm mb-6 flex-grow leading-relaxed">
                    {locale === 'en' ? product.description_en : product.description_ar}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                    <span className="text-sm font-semibold text-primary flex items-center justify-center gap-2 bg-blue-50 py-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4"/> 
                      {t('noPrices')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
