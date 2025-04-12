import { useState } from "react";
import { Wallet } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useSelector } from "react-redux";

interface PaymentFormProps {
  selectedPlan: string;
  planPrice: number;
  onSubscribe: () => void;
  paymentProcessing: boolean;
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

const PaymentOption = ({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  balance,
  language,
}: {
  icon: any;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  balance: number;
  language: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-colors ${
      selected ? "border-jeeny" : "border-gray-200 hover:border-jeeny/50"
    }`}
  >
    <div className="h-12 w-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div
      className={`flex-grow ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div className="font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
    <div className="font-lg weight-bold text-gray-900 flex-shrink-0">
      {language === "ar" ? ` ${balance} ريال` : ` SAR ${balance}`}
    </div>
  </button>
);
const CardDetailsForm = ({
  cardDetails,
  setCardDetails,
  translations,
}: {
  cardDetails: CardDetails;
  setCardDetails: (details: CardDetails) => void;
  translations: any;
}) => (
  <div className="mt-6 space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {translations.nameOnCard}
      </label>
      <input
        type="text"
        value={cardDetails.name}
        onChange={(e) =>
          setCardDetails({ ...cardDetails, name: e.target.value })
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-jeeny focus:border-jeeny"
        placeholder={translations.namePlaceholder}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {translations.cardNumber}
      </label>
      <input
        type="text"
        value={cardDetails.cardNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 16);
          const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
          setCardDetails({ ...cardDetails, cardNumber: formatted });
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-jeeny focus:border-jeeny"
        placeholder="1234 5678 9012 3456"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translations.expiryDate}
        </label>
        <input
          type="text"
          value={cardDetails.expiryDate}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 4);
            if (value.length >= 2) {
              const formatted = value.slice(0, 2) + "/" + value.slice(2);
              setCardDetails({ ...cardDetails, expiryDate: formatted });
            } else {
              setCardDetails({ ...cardDetails, expiryDate: value });
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-jeeny focus:border-jeeny"
          placeholder={translations.expiryPlaceholder}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translations.cvv}
        </label>
        <input
          type="text"
          value={cardDetails.cvv}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 3);
            setCardDetails({ ...cardDetails, cvv: value });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-jeeny focus:border-jeeny"
          placeholder="123"
        />
      </div>
    </div>
  </div>
);

const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedPlan,
  planPrice,
  onSubscribe,
  paymentProcessing,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<
    "wallet" | "apple" | "card"
  >("wallet");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  const userInfo = useSelector((state: any) => state.user);

  const { language } = useLanguage();

  const translations = {
    ar: {
      paymentMethod: "طريقة الدفع",
      jeenyWallet: "محفظة جيني",
      jeenyWalletDesc: "ادفع باستخدام رصيد محفظتك",
      applePay: "آبل باي",
      applePayDesc: "ادفع باستخدام آبل باي",
      creditCard: "بطاقة الائتمان",
      creditCardDesc: "ادفع باستخدام بطاقة الائتمان",
      nameOnCard: "الاسم على البطاقة",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء",
      cvv: "رمز التحقق",
      total: "المجموع",
      payNow: "ادفع الآن",
      namePlaceholder: "محمد عبدالله",
      expiryPlaceholder: "شهر/سنة",
      insufficientBalance:
        "رصيد محفظة جيني الحالي لديك غير كافٍ للاشتراك في هذه الباقة. يرجى إضافة رصيد إلى محفظتك للمتابعة",
      topUpAccount: "اشحن محفظة جيني",
      processing: "جاري الدفع...",
      remainder: "المبلغ المتبقي",
    },
    en: {
      paymentMethod: "Payment Method",
      jeenyWallet: "Jeeny Wallet",
      jeenyWalletDesc: "Pay using your wallet balance",
      applePay: "Apple Pay",
      applePayDesc: "Pay using Apple Pay",
      creditCard: "Credit Card",
      creditCardDesc: "Pay using your credit card",
      nameOnCard: "Name on Card",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      total: "Total",
      payNow: "Pay Now",
      namePlaceholder: "John Doe",
      expiryPlaceholder: "MM/YY",
      insufficientBalance:
        "Your current Jeeny Wallet balance is not enough to subscribe to this package. Please add funds to your wallet to proceed.",
      topUpAccount: "Top up Jeeny Wallet",
      processing: "Processing Payment...",
      remainder: "Remainder Amount",
    },
  };

  const t = translations[language];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">{t.paymentMethod}</h2>

      <div className="space-y-4 mb-8">
        <PaymentOption
          icon={Wallet}
          title={t.jeenyWallet}
          description={t.jeenyWalletDesc}
          selected={selectedPayment === "wallet"}
          onClick={() => setSelectedPayment("wallet")}
          balance={userInfo.userBalance}
          language={language}
        />
      </div>

      {selectedPayment === "card" && (
        <CardDetailsForm
          cardDetails={cardDetails}
          setCardDetails={setCardDetails}
          translations={t}
        />
      )}

      <div className="mt-8 pt-6 border-t">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">{t.total}</span>
          <span className="text-2xl font-bold">
            {language === "ar" ? `${planPrice} ريال` : `SAR ${planPrice}`}
          </span>
        </div>

        {userInfo.userBalance >= Number(planPrice) ? (
          <button
            className="w-full py-3 px-4 bg-jeeny text-white font-medium rounded-lg hover:bg-jeeny/90 transition-colors"
            onClick={onSubscribe}
          >
            {paymentProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="ml-2">{t.processing}</span>
              </div>
            ) : (
              t.payNow
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="mb-6">
              <p className="text-red-500 font-semibold text-lg mb-2">
                {t.insufficientBalance}
              </p>
              {/* <p className="text-gray-600 font-semibold text-sm">
                {t.remainder}
                {language === "ar"
                  ? ` ${Math.abs(userInfo.userBalance - planPrice)} ريال`
                  : ` SAR ${Math.abs(userInfo.userBalance - planPrice)}`}
              </p> */}
            </div>
            <a
              className="w-full sm:w-auto py-3 px-6 bg-jeeny text-white text-center font-medium rounded-lg hover:bg-jeeny/90 transition-colors"
              href="com.jeenydriver://wallet_topup"
              onClick={onSubscribe}
            >
              {paymentProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="ml-2">{t.processing}</span>
                </div>
              ) : (
                t.topUpAccount
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
