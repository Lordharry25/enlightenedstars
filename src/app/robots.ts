import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://enlightenedstars.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/en/admin/', '/ar/admin/', '/en/login', '/ar/login'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
