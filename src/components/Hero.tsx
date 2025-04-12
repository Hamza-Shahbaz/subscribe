
import { ArrowRight, Wallet, Percent } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


const translations = {
  ar: {
    zeroCommission: 'بدون عمولة',
    title: 'احتفظ بـ',
    titleSpan: '100%',
    titleEnd: ' من أرباحك',
    subtitle: 'وداعًا للعمولات العالية والأرباح غير الثابتة! مع باقات الاشتراك من جيني، استمتع بمشاوير بدون عمولة واحتفظ بـ100% من أرباحك، اختار الخطة اللي تناسب أهدافك، انطلق مع جيني واربح أكثر!',
    startEarning: 'اربح أكثر',
    features: {
      commission: 'مشاوير بدون عمولة',
      earnings: 'أرباح أكثر',
      activation: 'تفعيل فوري'
    }
  },
  en: {
    zeroCommission: 'Zero Commission',
    title: 'Keep ',
    titleSpan: '100%',
    titleEnd: ' of what you earn',
    subtitle: "Say goodbye to high commissions and uncertain earnings! With Jeeny's Subscription Plans, enjoy zero commission and keep 100% of your earnings. Choose the plan that best fits your driving goals and boost your earnings instantly.",
    startEarning: 'Start Earning More',
    features: {
      commission: 'Drive with Zero Commission',
      earnings: 'Unlock More Earnings',
      activation: 'Get Instance Activation'
    }
  }
};

const Hero = () => {
  const { language } = useLanguage();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const t = translations[language];

  return (
    <section className="pt-24 pb-12 md:pt-24 md:pb-12" dir={language === 'ar' ? 'rtl' : 'ltr'} id='benefits'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-jeeny bg-jeeny/10 rounded-full">
            {t.zeroCommission}
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t.title}<span className="text-jeeny">{t.titleSpan}</span>{t.titleEnd}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
              onClick={() => scrollToSection('pricing')}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-jeeny hover:bg-jeeny/90 rounded-md transition-colors group"
            >
              {t.startEarning}
              {language === 'en' && (
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              )}
              {language === 'ar' && (
                <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              )}
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-jeeny/10 rounded-full flex items-center justify-center">
                <Percent className="h-6 w-6 text-jeeny" />
              </div>
              <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-gray-600 font-medium`}>
                {t.features.commission}
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="h-12 w-12 bg-jeeny/10 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-jeeny" />
              </div>
              <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-gray-600 font-medium`}>
                {t.features.earnings}
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="h-12 w-12 bg-jeeny/10 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-jeeny" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-gray-600 font-medium`}>
                {t.features.activation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
