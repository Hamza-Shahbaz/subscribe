import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, dir } = useLanguage();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
      dir={dir}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <a href="#" className="relative z-10">
          <img 
            src="https://www.jeeny.me/static/images/v2/Layer%202.svg" 
            alt="Jeeny Logo" 
            className="h-8 w-auto"
          />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" dir={dir}>
          <div>
          </div>
          <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-jeeny transition-colors">
            {language === 'en' ? 'Benefits' : 'المميزات'}
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-jeeny transition-colors">
            {language === 'en' ? 'Pricing' : 'الأسعار'}
          </a>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-jeeny transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'عربي' : 'English'}
          </button>
          <a href="#pricing" className="button-primary">
            {language === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 relative z-10">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-jeeny transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'عربي' : 'English'}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white z-0 flex flex-col items-center justify-center space-y-8 animate-fade-in">
            <a 
              href="#benefits" 
              className="text-xl font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Benefits' : 'المميزات'}
            </a>
            <a 
              href="#pricing" 
              className="text-xl font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Pricing' : 'الأسعار'}
            </a>
            <a 
              href="#faq" 
              className="text-xl font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
            </a>
            <a 
              href="#subscribe" 
              className="button-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
