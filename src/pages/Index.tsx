
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SubscriptionCard from '../components/SubscriptionCard';
import PaymentForm from '../components/PaymentForm';
import Footer from '../components/Footer';

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly" | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { language } = useLanguage();

  const translations = {
    ar: {
      flexiblePlans: 'باقات الاشتراك',
      chooseSubscription: 'انطلق لمشاويرك بطريقتك',
      selectPlan: 'اختار خطة الاشتراك اللي تناسب جدولك وأهدافك',
      weeklyFeatures: [
        'مشاوير بدون عمولة – احتفظ بـ100% من أرباحك',
        'استمتع بزيادة دخل ثابتة كل أسبوع',
        'حصري لشركاء جيني فقط'
      ],
      monthlyFeatures: [
        'كل مميزات الاشتراك الأسبوعي موجودة',
        'أرباح ثابتة',
        'وفّر أكثر على المدى الطويل مع تكلفة اشتراك أقل'
      ]
    },
    en: {
      flexiblePlans: 'Subscription Plans',
      chooseSubscription: 'Drive Your Way',
      selectPlan: 'Choose the subscription plan that best fits your driving schedule and goals',
      weeklyFeatures: [
        'Zero commission on rides – Keep 100% of your earnings',
        'Enjoy a guaranteed income boost every week',
        'Exclusive access for Jeeny drivers'
      ],
      monthlyFeatures: [
        'All Weekly Plan benefits included',
        'Drive stress-free with predictable earnings',
        'Save more in the long run with a lower subscription cost'
      ]
    }
  };

  const getPlanPrice = () => {
    if (selectedPlan === 'weekly') return 49.99;
    if (selectedPlan === 'monthly') return 149.99;
    return 0;
  };

  const handlePlanSelect = (plan: "weekly" | "monthly") => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 px-4 md:py-24" id="pricing">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-jeeny bg-jeeny/10 rounded-full">
                {t.flexiblePlans}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.chooseSubscription}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.selectPlan}
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <SubscriptionCard
                  type="weekly"
                  price={49.99}
                  features={t.weeklyFeatures}
                  onSelect={handlePlanSelect}
                  isSelected={selectedPlan === "weekly"}
                />
                
                <SubscriptionCard
                  type="monthly"
                  price={149.99}
                  features={t.monthlyFeatures}
                  onSelect={handlePlanSelect}
                  isSelected={selectedPlan === "monthly"}
                />
              </div>
              
              {showPayment && (
                <div className="mt-12 max-w-md mx-auto">
                  <PaymentForm 
                    selectedPlan={selectedPlan} 
                    planPrice={getPlanPrice()} 
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
