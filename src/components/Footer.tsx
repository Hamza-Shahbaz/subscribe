import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  
  const translations = {
    ar: {
      rights: 'جميع الحقوق محفوظة',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
    },
    en: {
      rights: 'All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    }
  };

  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div>
            &copy; {currentYear} Jeeny. {t.rights}
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-jeeny transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="hover:text-jeeny transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
