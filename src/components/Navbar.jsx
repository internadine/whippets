import { Link } from 'react-router-dom';
import { HomeIcon, HeartIcon, BookOpenIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-cream-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-whippet-500 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
              <HomeIcon className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-whippet-600 to-whippet-800 bg-clip-text text-transparent">
                Border Whippet's
              </span>
              <div className="text-sm text-gray-500">Elegant & Graceful Companions</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/gallery" 
              className="nav-link font-medium flex items-center space-x-2"
            >
              <span>{t('gallery.title')}</span>
            </Link>
            <Link 
              to="/diary" 
              className="nav-link font-medium flex items-center space-x-2"
            >
              <BookOpenIcon className="h-5 w-5" />
              <span>{t('diary.title')}</span>
            </Link>
            <a 
              href="#contact" 
              className="btn-primary flex items-center space-x-2"
            >
              <HeartIcon className="h-5 w-5" />
              <span>{t('contact.title')}</span>
            </a>
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="py-4 space-y-4 border-t border-gray-100">
            <Link 
              to="/gallery" 
              className="block px-4 py-2 text-gray-600 hover:bg-whippet-50 hover:text-whippet-600 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('gallery.title')}
            </Link>
            <Link 
              to="/diary" 
              className="block px-4 py-2 text-gray-600 hover:bg-whippet-50 hover:text-whippet-600 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('diary.title')}
            </Link>
            <a 
              href="#contact"
              className="block px-4 py-2 text-gray-600 hover:bg-whippet-50 hover:text-whippet-600 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact.title')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 