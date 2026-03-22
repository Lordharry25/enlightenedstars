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
    transition: { staggerChildren: 0.1 }
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

export default function ProductGalleryClient({ products, locale, noPricesText }: { products: any[], locale: string, noPricesText: string }) {
  if (!products || products.length === 0) return null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {products.map((product, index) => (
        <motion.div 
          key={product.id} 
          variants={itemVariants}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-500 overflow-hidden group border border-gray-700 flex flex-col transform hover:-translate-y-1 hover:border-primary/50"
        >
          <div className="relative h-60 w-full bg-gray-800 p-6 flex-shrink-0 overflow-hidden">
            <Image 
              src={product.imageUrl} 
              alt={locale === 'en' ? product.name_en : product.name_ar}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 4}
              placeholder="blur"
              blurDataURL={blurPlaceholder}
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="absolute top-4 start-4 z-10">
               <span className="bg-gray-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-gray-700">
                 {product.category}
               </span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow relative overflow-hidden z-10">
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {locale === 'en' ? product.name_en : product.name_ar}
            </h3>
            <p className="text-gray-300 line-clamp-2 text-sm mb-6 flex-grow leading-relaxed">
              {locale === 'en' ? product.description_en : product.description_ar}
            </p>
            <div className="mt-auto pt-4 border-t border-gray-700 w-full">
              <span className="text-sm font-semibold flex items-center justify-center gap-2 bg-gray-700/50 text-gray-300 py-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                <ShoppingBag className="w-4 h-4"/> 
                {noPricesText}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
