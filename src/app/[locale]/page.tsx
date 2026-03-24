import { getTranslations } from 'next-intl/server';
import prisma from '../../lib/prisma';
import HeroClient from '../../components/HeroClient';
import CarouselClient from '../../components/CarouselClient';
import FeaturedProductsClient from '../../components/FeaturedProductsClient';
import StarsBackground from '../../components/StarsBackground';
import JsonLd from '../../components/JsonLd';
import type { Metadata } from 'next';

// Enable dynamic revalidation or caching as preferred
export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الرئيسية' : 'Premium FMCG Wholesale Suppliers',
    description: isAr
      ? 'حلول سلسلة التوريد الموثوقة للمتاجر المظلمة والتجارة السريعة.'
      : 'Reliable supply chain solutions for dark stores and quick commerce. Browse our B2B FMCG catalog.',
  };
}

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

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EnlightenedStars Ltd.',
    description: 'Premium B2B FMCG Wholesale Suppliers in the UAE',
    url: 'https://enlightenedstars.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Logistics Park, JAFZA',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-4-123-4567',
      contactType: 'sales',
    },
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900">
      <JsonLd data={orgSchema} />
      <StarsBackground />
      <HeroClient locale={locale} />
      <div className="relative z-10">
        <CarouselClient brands={brands} title={t('featuredBrands')} locale={locale} />
        <FeaturedProductsClient products={products} title={t('featuredProducts')} locale={locale} />
      </div>
    </main>
  );
}
