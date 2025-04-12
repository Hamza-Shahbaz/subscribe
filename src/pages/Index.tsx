import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SubscriptionCard from "../components/SubscriptionCard";
import PaymentForm from "../components/PaymentForm";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "@/redux/Slices/userSlice";
import { toast } from "sonner";
import UserNotFound from "@/components/UserNotFound";
const translations = {
  ar: {
    flexiblePlans: "باقات الاشتراك",
    chooseSubscription: "انطلق لمشاويرك بطريقتك",
    selectPlan: "اختار خطة الاشتراك اللي تناسب جدولك وأهدافك",
    weeklyFeatures: [
      "مشاوير بدون عمولة – احتفظ بـ100% من أرباحك",
      "استمتع بزيادة دخل ثابتة كل أسبوع",
      "حصري لشركاء جيني فقط",
    ],
    monthlyFeatures: [
      "كل مميزات الاشتراك الأسبوعي موجودة",
      "أرباح ثابتة",
      "وفّر أكثر على المدى الطويل مع تكلفة اشتراك أقل",
    ],
    continue: "متابعة",
    enterRegisteredNumber: "أدخل رقمك المسجل للمتابعة!",
    subscriptionSucessful : "تم الاشتراك بنجاح! تم تفعيل خطة العمولة صفر. استمتع الآن بالحصول على ١٠٠٪ مما تكسبه!"
  },
  en: {
    flexiblePlans: "Subscription Plans",
    chooseSubscription: "Drive Your Way",
    selectPlan:
      "Choose the subscription plan that best fits your driving schedule and goals",
    weeklyFeatures: [
      "Zero commission on rides – Keep 100% of your earnings",
      "Enjoy a guaranteed income boost every week",
      "Exclusive access for Jeeny drivers",
    ],
    monthlyFeatures: [
      "All Weekly Plan benefits included",
      "Drive stress-free with predictable earnings",
      "Save more in the long run with a lower subscription cost",
    ],
    continue: "Continue",
    enterRegisteredNumber: "Enter your registered number to continue!",
    subscriptionSucessful : "Subscription Successful! Your Zero Commission Plan is active. Enjoy keeping 100% of your earnings!"
  },
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly" | null>(
    null
  );
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { language } = useLanguage();
  const userInfo = useSelector((state: any) => state.user);
  const paymentFormRef = useRef<HTMLDivElement>(null);

  const getPlanPrice = () => {
    if (selectedPlan === "weekly") return userInfo.weeklyPlan;
    if (selectedPlan === "monthly") return userInfo.monthlyPlan;
    return 0;
  };

  const handlePlanSelect = (plan: "weekly" | "monthly") => {
    setSelectedPlan(plan);
    setShowPayment(true);
    setTimeout(() => {
      if (paymentFormRef.current) {
        paymentFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const t = translations[language];

  const getUserData = async (phone?: any) => {
    try {
      setIsLoading(true);
      if (!params.id && !phone) {
        throw new Error("");
      }
      const temp: any = {
        command: "status",
      };
      if (phone) {
        temp.phone = phone;
      } else {
        temp.driver_id = params.id;
      }
      const body = JSON.stringify(temp);
      const response = await fetch(baseUrl, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 95c9ff81-e387-4ad4-90b8-5ffdffff94e6",
        },
        body,
      });
      const respData = await response.json();
      if (respData.error === true) {
        throw new Error(respData.message);
      }
      const data = respData.data;
      const userData = {
        monthlyPlan: data.monthly_package || "0",
        weeklyPlan: data.weekly || "0",
        phone: data.phone,
        name: data.driver_name,
        planId: data.plan_id,
        areaCode: data.area_code,
        cohort: data.cohort,
        driverId: data.driver_id,
        userBalance: data.user_balance || 0,
      };
      dispatch(updateUser(userData));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.dismiss();
      if (error.message) {
        toast.error(error.message);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToPlan = async () => {
    const body = JSON.stringify({
      command: "subscribe",
      driver_id: userInfo.driverId,
      package: selectedPlan,
      amount: getPlanPrice(),
    });
    try {
      setPaymentProcessing(true);
      const response = await fetch(baseUrl, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 95c9ff81-e387-4ad4-90b8-5ffdffff94e6",
        },
        body,
      });
      const data = await response.json();
      if (data.error === true) {
        toast.dismiss();
        toast.error(data.message);
      } else {
        toast.dismiss();
        toast.success(t.subscriptionSucessful);
      }
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.dismiss();
      toast.error("Error fetching data");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleSearch = () => {
    const cleanedPhoneNumber = "966" + phoneNumber.replace(/[^\d]/g, "");

    if (cleanedPhoneNumber.length < 7) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setIsError(false);
    setIsLoading(true);

    getUserData(cleanedPhoneNumber);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <section className="py-16 px-4 md:py-24" id="pricing">
          {isError ? (
            <UserNotFound
              phoneNumber={phoneNumber}
              handleSearch={handleSearch}
              setPhoneNumber={setPhoneNumber}
              continueText={t.continue}
              enterRegisteredNumber={t.enterRegisteredNumber}
            />
          ) : (
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
                    price={userInfo.weeklyPlan}
                    features={t.weeklyFeatures}
                    onSelect={handlePlanSelect}
                    isSelected={selectedPlan === "weekly"}
                    isLoading={isLoading}
                  />

                  <SubscriptionCard
                    type="monthly"
                    price={userInfo.monthlyPlan}
                    features={t.monthlyFeatures}
                    onSelect={handlePlanSelect}
                    isSelected={selectedPlan === "monthly"}
                    isLoading={isLoading}
                  />
                </div>

                {showPayment && (
                  <div className="mt-12 max-w-md mx-auto" ref={paymentFormRef}>
                    <PaymentForm
                      selectedPlan={selectedPlan}
                      planPrice={getPlanPrice()}
                      onSubscribe={subscribeToPlan}
                      paymentProcessing={paymentProcessing}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
