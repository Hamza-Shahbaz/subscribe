import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from "../../public/jeeny-logo.png"

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
        <button onClick={scrollToTop} className="relative z-10">
          <img
            src={logo}
            alt="Jeeny Logo"
            className="h-8 w-auto"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" dir={dir}>
          <div>
          </div>
          <button onClick={() => scrollToSection('benefits')} className="text-sm font-medium text-gray-600 hover:text-jeeny transition-colors">
            {language === 'en' ? 'Benefits' : 'المميزات'}
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-gray-600 hover:text-jeeny transition-colors">
            {language === 'en' ? 'Pricing' : 'الأسعار'}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-jeeny transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'عربي' : 'English'}
          </button>
          <button onClick={() => scrollToSection('pricing')} className="button-primary">
            {language === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
          </button>
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
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-xl font-medium text-foreground"
            >
              {language === 'en' ? 'Benefits' : 'المميزات'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-xl font-medium text-foreground"
            >
              {language === 'en' ? 'Pricing' : 'الأسعار'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="button-primary"
            >
              {language === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;