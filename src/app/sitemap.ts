import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://enlightenedstars.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'];
  const pages = ['', '/products', '/about', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
