
import { useState } from 'react';
import { Wallet, CreditCard, Apple } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PaymentFormProps {
  selectedPlan: string;
  planPrice: number;
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
  onClick 
}: { 
  icon: any; 
  title: string; 
  description: string;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-colors ${
      selected ? 'border-jeeny' : 'border-gray-200 hover:border-jeeny/50'
    }`}
  >
    <div className="h-12 w-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div className="flex-grow text-left">
      <div className="font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  </button>
);

const CardDetailsForm = ({ 
  cardDetails, 
  setCardDetails,
  translations
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
        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
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
          const value = e.target.value.replace(/\D/g, '').slice(0, 16);
          const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
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
            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
            if (value.length >= 2) {
              const formatted = value.slice(0, 2) + '/' + value.slice(2);
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
            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
            setCardDetails({ ...cardDetails, cvv: value });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-jeeny focus:border-jeeny"
          placeholder="123"
        />
      </div>
    </div>
  </div>
);

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan, planPrice }) => {
  const [selectedPayment, setSelectedPayment] = useState<'wallet' | 'apple' | 'card'>('wallet');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  
  const { language } = useLanguage();

  const translations = {
    ar: {
      paymentMethod: 'طريقة الدفع',
      jeenyWallet: 'محفظة جيني',
      jeenyWalletDesc: 'ادفع باستخدام رصيد محفظتك',
      applePay: 'آبل باي',
      applePayDesc: 'ادفع باستخدام آبل باي',
      creditCard: 'بطاقة الائتمان',
      creditCardDesc: 'ادفع باستخدام بطاقة الائتمان',
      nameOnCard: 'الاسم على البطاقة',
      cardNumber: 'رقم البطاقة',
      expiryDate: 'تاريخ الانتهاء',
      cvv: 'رمز التحقق',
      total: 'المجموع',
      payNow: 'ادفع الآن',
      namePlaceholder: 'محمد عبدالله',
      expiryPlaceholder: 'شهر/سنة'
    },
    en: {
      paymentMethod: 'Payment Method',
      jeenyWallet: 'Jeeny Wallet',
      jeenyWalletDesc: 'Pay using your wallet balance',
      applePay: 'Apple Pay',
      applePayDesc: 'Pay using Apple Pay',
      creditCard: 'Credit Card',
      creditCardDesc: 'Pay using your credit card',
      nameOnCard: 'Name on Card',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      total: 'Total',
      payNow: 'Pay Now',
      namePlaceholder: 'John Doe',
      expiryPlaceholder: 'MM/YY'
    }
  };

  const t = translations[language];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">
        {t.paymentMethod}
      </h2>
      
      <div className="space-y-4 mb-8">
        <PaymentOption
          icon={Wallet}
          title={t.jeenyWallet}
          description={t.jeenyWalletDesc}
          selected={selectedPayment === 'wallet'}
          onClick={() => setSelectedPayment('wallet')}
        />
        <PaymentOption
          icon={Apple}
          title={t.applePay}
          description={t.applePayDesc}
          selected={selectedPayment === 'apple'}
          onClick={() => setSelectedPayment('apple')}
        />
        <PaymentOption
          icon={CreditCard}
          title={t.creditCard}
          description={t.creditCardDesc}
          selected={selectedPayment === 'card'}
          onClick={() => setSelectedPayment('card')}
        />
      </div>

      {selectedPayment === 'card' && (
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
            {language === 'ar' ? `${planPrice} ريال` : `SAR ${planPrice}`}
          </span>
        </div>

        <button className="w-full py-3 px-4 bg-jeeny text-white font-medium rounded-lg hover:bg-jeeny/90 transition-colors">
          {t.payNow}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
