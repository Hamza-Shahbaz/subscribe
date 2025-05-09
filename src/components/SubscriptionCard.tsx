import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface SubscriptionCardProps {
  type: "weekly" | "monthly";
  price: number;
  features: string[];
  onSelect: (type: "weekly" | "monthly") => void;
  isSelected: boolean;
  isLoading: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  type,
  price,
  features,
  onSelect,
  isSelected,
  isLoading,
}) => {
  const { language } = useLanguage();

  const translations = {
    ar: {
      monthly: "شهريًا",
      weekly: "أسبوعيًا",
      selected: "تم الاختيار",
      selectPlan: "اشترك الآن",
      weeklyPlan: "الاشتراك الأسبوعي",
      monthlyPlan: "الاشتراك الشهري",
    },
    en: {
      weeklyPlan: "Weekly Plan",
      monthlyPlan: "Monthly Plan",
      weekly: "Weekly",
      monthly: "Monthly",
      selected: "Selected",
      selectPlan: "Subscribe Now",
    },
  };

  const featuresWithSymbols = features.map(feature => ({
    key: Symbol(feature), // Create a unique Symbol for each feature
    value: feature
  }));

  const t = translations[language];

  return (
    <div
      className={`rounded-2xl p-6 bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg ${
        isSelected ? "ring-2 ring-jeeny shadow-lg" : ""
      }`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2">
          {type === "weekly" ? t.weeklyPlan : t.monthlyPlan}
        </h3>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            {!isLoading ? (
              <>
                <span className="text-4xl font-bold">{price}</span>
                <span className="text-gray-500">
                  {language === "ar" ? "ريال" : "SAR"}
                </span>
              </>
            ) : (
              <div className="flex items-center">
                <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
              </div>
            )}
            <span className="text-gray-500 mr-1">
              /{type === "weekly" ? t.weekly : t.monthly}
            </span>
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {featuresWithSymbols.map(({key, value}) => (
            <li key={key.toString()} className="flex items-start">
              <Check className="h-5 w-5 text-jeeny shrink-0 ml-2" />
              <span className="text-gray-600 text-sm">{value}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(type)}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSelected
              ? "bg-jeeny text-white hover:bg-jeeny/90"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {isSelected ? t.selected : t.selectPlan}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
