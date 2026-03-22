import { getTranslations } from 'next-intl/server';
import prisma from '../../lib/prisma';
import HeroClient from '../../components/HeroClient';
import CarouselClient from '../../components/CarouselClient';
import FeaturedProductsClient from '../../components/FeaturedProductsClient';
import StarsBackground from '../../components/StarsBackground';

// Enable dynamic revalidation or caching as preferred
export const revalidate = 60; // Revalidate every minute

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Home');

  // Fetch from database!
  const brands = await prisma.brandLogo.findMany({
    where: { isVisible: true },
    orderBy: { orderIndex: 'asc' }
  });

  const products = await prisma.product.findMany({
    where: { isVisible: true },
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900">
      <StarsBackground />
      <HeroClient locale={locale} />
      <div className="relative z-10">
        <CarouselClient brands={brands} title={t('featuredBrands')} locale={locale} />
        <FeaturedProductsClient products={products} title={t('featuredProducts')} locale={locale} />
      </div>
    </main>
  );
}

