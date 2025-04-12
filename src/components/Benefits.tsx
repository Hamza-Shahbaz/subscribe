import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Zap, Clock, Star } from 'lucide-react';

export const Benefits = () => {
  const { language } = useLanguage();

  const translations = {
    ar: {
      title: 'مزايا الاشتراك',
      subtitle: 'اكتشف المزايا الحصرية التي تأتي مع اشتراكك',
      benefits: [
        {
          icon: Shield,
          title: 'صفر عمولة',
          description: 'احتفظ بكل أرباحك دون أي عمولات'
        },
        {
          icon: Zap,
          title: 'طلبات أكثر',
          description: 'احصل على المزيد من الطلبات وزد دخلك'
        },
        {
          icon: Clock,
          title: 'دعم على مدار الساعة',
          description: 'دعم فني متوفر 24/7 لمساعدتك'
        },
        {
          icon: Star,
          title: 'مزايا حصرية',
          description: 'وصول حصري إلى أحدث الميزات والعروض'
        }
      ]
    },
    en: {
      title: 'Subscription Benefits',
      subtitle: 'Discover the exclusive benefits that come with your subscription',
      benefits: [
        {
          icon: Shield,
          title: 'Zero Commission',
          description: 'Keep all your earnings with no commission fees'
        },
        {
          icon: Zap,
          title: 'More Orders',
          description: 'Get more orders and increase your income'
        },
        {
          icon: Clock,
          title: '24/7 Support',
          description: 'Round-the-clock support to assist you'
        },
        {
          icon: Star,
          title: 'Exclusive Features',
          description: 'Access to latest features and promotions'
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-jeeny/10 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-jeeny" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
