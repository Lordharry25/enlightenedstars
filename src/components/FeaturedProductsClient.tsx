'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function FeaturedProductsClient({ products, title, locale }: { products: any[], title: string, locale: string }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
            >
              <div className="relative h-64 w-full bg-white p-6 flex-shrink-0">
                <img 
                  src={product.imageUrl} 
                  alt={locale === 'en' ? product.name_en : product.name_ar}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-primary mb-3 block uppercase tracking-wider">{product.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                  {locale === 'en' ? product.name_en : product.name_ar}
                </h3>
                <p className="text-gray-600 line-clamp-2 text-sm mb-6 flex-grow">
                  {locale === 'en' ? product.description_en : product.description_ar}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                    <ShoppingBag className="w-4 h-4"/> B2B Only
                  </span>
                  <a href={`/${locale}/products`} className="text-primary font-semibold hover:underline text-sm flex items-center gap-1">
                    {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href={`/${locale}/products`} className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-colors">
            {locale === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
          </a>
        </div>
      </div>
    </section>
  );
}
