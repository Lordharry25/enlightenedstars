import { getTranslations } from 'next-intl/server';
import { Building2, Globe, Target, Award } from 'lucide-react';

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('About');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20">
            <Building2 className="w-10 h-10 text-secondary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight">{t('title')}</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed font-medium">
            {locale === 'ar' ? 'نبني مستقبل التوزيع الذكي للسلع الاستهلاكية، لربط المصنعين العالميين بالأسواق المحلية بأعلى كفاءة.' : 'We are building the future of smart FMCG distribution, connecting global manufacturers to local B2B markets with ultimate efficiency.'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-16">
              <div className="flex gap-8 start group">
                <div className="shrink-0 transition-transform group-hover:scale-110">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{t('history')}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t('historyText')} {locale === 'en' ? 'Through scalable global sourcing and highly optimized logistics, we consistently deliver top tier products exactly when you need them.' : 'من خلال التوريد العالمي القابل للتطوير واللوجستيات عالية التحسين، نقدم باستمرار منتجات من الدرجة الأولى في الوقت الذي تحتاجه فيه بالضبط.'}</p>
                </div>
              </div>

              <div className="flex gap-8 start group">
                <div className="shrink-0 transition-transform group-hover:scale-110">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{t('vision')}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t('visionText')}</p>
                </div>
              </div>

              <div className="flex gap-8 start group">
                <div className="shrink-0 transition-transform group-hover:scale-110">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{t('mission')}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t('missionText')}</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=3000&auto=format&fit=crop" 
                  alt="Logistics Operations" 
                  className="w-full h-[700px] object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 start-0 p-10">
                  <div className="text-secondary font-black text-6xl mb-3">10+</div>
                  <div className="text-white uppercase tracking-widest text-lg font-bold">{locale === 'ar' ? 'سنوات من الخبرة' : 'Years of Excellence'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
