'use client';

import Image from 'next/image';
import { blurPlaceholder } from '../utils/imageLoader';

export default function CarouselClient({ brands, title, locale }: { brands: any[], title: string, locale: string }) {
  if (!brands || brands.length === 0) return null;

  // Only duplicate once for seamless loop
  const scrollBrands = [...brands, ...brands];
  const isRTL = locale === 'ar';

  return (
    <section className="py-16 overflow-hidden border-b border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-300 uppercase tracking-wider">{title}</h2>
      </div>
      
      {/* Container with fade edges */}
      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        <div 
          className={`flex items-center w-max ${isRTL ? 'animate-marquee-rtl' : 'animate-marquee'}`}
          style={{ willChange: 'transform' }}
        >
          {scrollBrands.map((brand, i) => (
            <div key={`${brand.id}-${i}`} className="mx-12 shrink-0 flex items-center justify-center w-40 h-24">
              <div className="relative h-16 w-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 invert brightness-200 hover:invert-0 hover:brightness-100">
                <Image 
                  src={brand.logoUrl} 
                  alt={brand.brandName} 
                  fill
                  sizes="(max-width: 768px) 100px, 160px"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
