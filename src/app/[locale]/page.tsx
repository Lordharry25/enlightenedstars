import { getTranslations } from 'next-intl/server';
import prisma from '../../lib/prisma';
import HeroClient from '../../components/HeroClient';
import CarouselClient from '../../components/CarouselClient';
import FeaturedProductsClient from '../../components/FeaturedProductsClient';

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
    <main className="min-h-screen">
      <HeroClient locale={locale} />
      <CarouselClient brands={brands} title={t('featuredBrands')} locale={locale} />
      <FeaturedProductsClient products={products} title={t('featuredProducts')} locale={locale} />
    </main>
  );
}
