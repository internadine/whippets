import { Link, useLocation } from 'react-router-dom';
import { HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md border-b border-cream-100' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/physiotherapy" 
              isActive={isActive('/physiotherapy')}
              label="Dog Physio"
            />
            <NavLink 
              to="/breeding" 
              isActive={isActive('/breeding')}
              label={t('navbar.breeding')}
            />
            <NavLink 
              to="/flyball" 
              isActive={isActive('/flyball')}
              label={t('navbar.flyball')}
            />
            <NavLink 
              to="/gallery" 
              isActive={isActive('/gallery')}
              label="Puppy Gallery"
            />
            
            <div className="ml-4 flex items-center gap-3">
              <a 
                href="#contact" 
                className="bg-whippet-500 hover:bg-whippet-600 text-white px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow"
              >
                <HeartIcon className="h-4 w-4" />
                <span>{t('contact.title')}</span>
              </a>
              <div className="border-l border-gray-200 h-8 mx-1"></div>
              <LanguageSwitcher />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-whippet-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, slide in from the right */}
      <div 
        className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 h-16 border-b border-gray-100">
          <Logo size="sm" withText={false} />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="py-4 px-2 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          <MobileNavLink 
            to="/physiotherapy" 
            isActive={isActive('/physiotherapy')}
            label="Dog Physio"
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink 
            to="/breeding" 
            isActive={isActive('/breeding')}
            label={t('navbar.breeding')}
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink 
            to="/flyball" 
            isActive={isActive('/flyball')}
            label={t('navbar.flyball')}
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink 
            to="/gallery" 
            isActive={isActive('/gallery')}
            label="Puppy Gallery"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a 
              href="#contact"
              className="block w-full bg-whippet-500 hover:bg-whippet-600 text-white px-4 py-3 rounded-lg text-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact.title')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

// Desktop nav link component
const NavLink = ({ to, isActive, label }) => {
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 text-sm font-medium transition-all relative group ${
        isActive 
          ? 'text-whippet-600' 
          : 'text-gray-600 hover:text-whippet-500'
      }`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-whippet-500 transform transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
    </Link>
  );
};

// Mobile nav link component
const MobileNavLink = ({ to, isActive, label, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`block px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-whippet-50 text-whippet-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-whippet-500'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar; 