import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin, Building2, Send } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: t('title'),
    description: locale === 'ar' ? 'تواصل معنا للاستفسارات التجارية وطلبات عروض الأسعار' : 'Get in touch for business inquiries and wholesale pricing requests',
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Contact');

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('title')}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          
          {/* Form Section */}
          <div className="p-8 lg:p-14">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('formTitle')}</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('name')}</label>
                  <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-gray-50 focus:bg-white" placeholder={t('namePlaceholder')} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('company')}</label>
                  <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-gray-50 focus:bg-white" placeholder={t('companyPlaceholder')} required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('email')}</label>
                <input type="email" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-gray-50 focus:bg-white" placeholder="john@example.com" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('message')}</label>
                <textarea rows={5} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-gray-50 focus:bg-white resize-none" placeholder={t('messagePlaceholder')} required></textarea>
              </div>

              <button type="button" className="w-full mt-4 bg-primary hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg">
                <span className="text-lg">{t('submit')}</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 outline-none rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Map and Info Section */}
          <div className="bg-gray-900 text-white p-8 lg:p-14 relative flex flex-col justify-between">
             <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
            
             <div className="relative z-10 space-y-10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                    <Building2 className="h-8 w-8 text-secondary" />
                  </div>
                  <span className="font-bold text-3xl uppercase tracking-wider">EnlightenedStars Ltd.</span>
               </div>

               <div className="space-y-8">
                 <div className="flex items-start gap-5">
                   <div className="bg-white/5 p-4 rounded-xl shrink-0 border border-white/10 group hover:bg-white/10 transition-colors">
                     <MapPin className="w-6 h-6 text-secondary" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">{t('hqTitle')}</h4>
                     <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{t('hqDetails')}</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-5">
                   <div className="bg-white/5 p-4 rounded-xl shrink-0 border border-white/10 group hover:bg-white/10 transition-colors">
                     <Phone className="w-6 h-6 text-secondary" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">{t('salesTitle')}</h4>
                     <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{t('phoneDetails')}</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-5">
                   <div className="bg-white/5 p-4 rounded-xl shrink-0 border border-white/10 group hover:bg-white/10 transition-colors">
                     <Mail className="w-6 h-6 text-secondary" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">{t('emailTitle')}</h4>
                     <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{t('emailDetails')}</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="relative z-10 mt-12 w-full h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
               <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none group-hover:bg-transparent transition-colors z-20"></div>
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115370.92548858277!2d54.9961623868612!3d25.04576378419614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1011cdba73fd%3A0xe54261899eafaee7!2sJebel%20Ali%20Free%20Zone%20-%20Dubai!5e0!3m2!1sen!2sae!4v1718000000000!5m2!1sen!2sae" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={false} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="grayscale hover:grayscale-0 transition-all duration-500 relative z-10 text-white"
               />
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
