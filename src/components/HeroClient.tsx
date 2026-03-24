'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroClient({ locale }: { locale: string }) {
  const t = useTranslations('Home');
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900 py-32">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" 
          alt="Modern Warehouse" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md"
        >
          {t('heroTitle')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-sm"
        >
          {t('heroSubtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href={`/${locale}/products`} className="inline-block bg-primary hover:bg-blue-800 text-white text-lg font-semibold py-4 px-10 rounded-full transition-all hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1">
            {t('exploreCta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
