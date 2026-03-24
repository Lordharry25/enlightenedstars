'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { blurPlaceholder } from '../utils/imageLoader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function FeaturedProductsClient({ products, title, locale }: { products: any[], title: string, locale: string }) {
  const t = useTranslations('Home');
  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white">{title}</h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-500 overflow-hidden group border border-gray-700 flex flex-col hover:border-primary/50"
            >
              <div className="relative h-72 w-full bg-gray-800 p-6 flex-shrink-0 overflow-hidden">
                <Image 
                  src={product.imageUrl} 
                  alt={locale === 'en' ? product.name_en : product.name_ar}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="p-6 flex flex-col flex-grow z-10">
                <span className="text-xs font-bold text-primary mb-3 block uppercase tracking-wider">{product.category}</span>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                  {locale === 'en' ? product.name_en : product.name_ar}
                </h3>
                <p className="text-gray-300 line-clamp-2 text-sm mb-6 flex-grow">
                  {locale === 'en' ? product.description_en : product.description_ar}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300 flex items-center gap-1.5 bg-gray-700/50 px-3 py-1 rounded-full">
                    <ShoppingBag className="w-4 h-4"/> {t('b2bOnly')}
                  </span>
                  <a href={`/${locale}/products`} className="text-primary font-semibold hover:underline text-sm flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    {t('viewDetails')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a href={`/${locale}/products`} className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-lg font-semibold py-3 px-8 rounded-full transition-all duration-300">
            {t('viewAll')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
