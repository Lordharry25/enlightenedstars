'use client';

export default function CarouselClient({ brands, title, locale }: { brands: any[], title: string, locale: string }) {
  if (!brands || brands.length === 0) return null;

  // We duplicate the array to allow for seamless infinite scrolling
  const scrollBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-500 uppercase tracking-wider">{title}</h2>
      </div>
      
      {/* Container with fade edges */}
      <div className="relative flex overflow-x-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className={`flex items-center w-max ${locale === 'ar' ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
          {scrollBrands.map((brand, i) => (
            <div key={`${brand.id}-${i}`} className="mx-12 shrink-0 flex items-center justify-center w-40 h-24">
              <img 
                src={brand.logoUrl} 
                alt={brand.brandName} 
                className="max-h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
