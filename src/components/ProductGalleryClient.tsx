'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { blurPlaceholder } from '../utils/imageLoader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
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
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden group border border-gray-700 flex flex-col hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-colors duration-300"
        >
          {/* Image with animated overlay */}
          <div className="relative h-60 w-full bg-gray-800 p-6 flex-shrink-0 overflow-hidden">
            <Image 
              src={product.imageUrl} 
              alt={locale === 'en' ? product.name_en : product.name_ar}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 4}
              placeholder="blur"
              blurDataURL={blurPlaceholder}
              className="object-contain m-[5px] p-[5px] !w-[calc(100%-10px)] !h-[calc(100%-10px)] rounded-[10px] group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Animated glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Sparkle indicator on hover */}
            <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
              <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
            </div>
            
            {/* Category badge */}
            <div className="absolute top-4 start-4 z-10">
               <span className="bg-gray-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-gray-700 group-hover:bg-primary/90 group-hover:border-primary transition-colors duration-300">
                 {product.category}
               </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow relative overflow-hidden z-10">
            {/* Subtle animated background shine */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
            
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight duration-300">
              {locale === 'en' ? product.name_en : product.name_ar}
            </h3>
            <p className="text-gray-400 line-clamp-2 text-sm mb-6 flex-grow leading-relaxed">
              {locale === 'en' ? product.description_en : product.description_ar}
            </p>
            <div className="mt-auto pt-4 border-t border-gray-700/50 w-full group-hover:border-primary/30 transition-colors duration-300">
              <span className="text-sm font-semibold flex items-center justify-center gap-2 bg-gray-700/50 text-gray-300 py-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/20">
                <ShoppingBag className="w-4 h-4 group-hover:animate-bounce"/> 
                {noPricesText}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
