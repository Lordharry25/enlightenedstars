import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import '../globals.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const isAr = locale === 'ar';

  return {
    title: {
      default: isAr ? 'إنلايتند ستارز | موردو السلع الاستهلاكية بالجملة' : 'EnlightenedStars Ltd. | Premium B2B Wholesale Suppliers',
      template: isAr ? '%s | إنلايتند ستارز' : '%s | EnlightenedStars Ltd.',
    },
    description: t('heroSubtitle'),
    keywords: ['FMCG', 'B2B', 'wholesale', 'suppliers', 'Dubai', 'UAE', 'import', 'distribution', 'quick commerce'],
    openGraph: {
      title: isAr ? 'إنلايتند ستارز' : 'EnlightenedStars Ltd.',
      description: t('heroSubtitle'),
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      siteName: 'EnlightenedStars Ltd.',
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'إنلايتند ستارز' : 'EnlightenedStars Ltd.',
      description: t('heroSubtitle'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
