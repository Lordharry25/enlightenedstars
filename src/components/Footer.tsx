import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-secondary" />
            <span className="font-bold text-xl text-white uppercase tracking-wider">Antigravity FMCG</span>
          </div>
          <p className="text-sm">
            {locale === 'ar' 
              ? 'المورد الرائد للسلع الاستهلاكية سريعة التداول عالمياً. نقدم منتجات عالية الجودة لتطوير أعمالك.'
              : 'Leading B2B FMCG supplier globally. We deliver high-quality products to empower your business.'}
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">{locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
          <ul className="space-y-2">
            <li><Link href={`/${locale}`} className="hover:text-secondary transition">{locale === 'ar' ? 'الرئيسية' : 'Home'}</Link></li>
            <li><Link href={`/${locale}/products`} className="hover:text-secondary transition">{locale === 'ar' ? 'المنتجات' : 'Products'}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-secondary transition">{locale === 'ar' ? 'معلومات عنا' : 'About Us'}</Link></li>
            <li><Link href={`/${locale}/contact`} className="hover:text-secondary transition">{locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
              <span>123 Trade Center, Dubai, UAE</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
              <span>+971 4 123 4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
              <span>sales@antigravity-fmcg.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm flex flex-col items-center">
        <p>&copy; {new Date().getFullYear()} Antigravity FMCG. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
      </div>
    </footer>
  );
}
