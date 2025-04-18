import { useTranslation } from 'react-i18next';
import { HeartIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-white border-t border-cream-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <Logo size="xl" className="mb-4" />
          <div className="flex gap-2">
            <Link to="/physiotherapy" className="text-gray-500 hover:text-teal-600 transition-colors">
              {t('navbar.physiotherapy')}
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/breeding" className="text-gray-500 hover:text-whippet-600 transition-colors">
              {t('navbar.breeding')}
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/flyball" className="text-gray-500 hover:text-teal-600 transition-colors">
              {t('navbar.flyball')}
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('footer.about.title')}
            </h3>
            <p className="mt-4 text-gray-500">
              {t('footer.about.description')}
            </p>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('footer.services.title')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-500">{t('footer.services.item1')}</li>
              <li className="text-gray-500">{t('footer.services.item2')}</li>
              <li className="text-gray-500">{t('footer.services.item3')}</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('footer.contact.title')}
            </h3>
            <div className="mt-4 space-y-2">
              <p className="text-gray-500">{t('footer.contact.location')}</p>
              <p className="text-gray-500">{t('footer.contact.practice')}</p>
              <p className="text-gray-500">{t('footer.contact.email')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cream-100">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-gray-500 flex items-center justify-center gap-2">
              {t('footer.closing')}
              <HeartIcon className="h-5 w-5 text-whippet-500" />
              <TrophyIcon className="h-5 w-5 text-teal-500" />
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link 
                to="/imprint" 
                className="text-gray-400 hover:text-teal-600 transition-colors"
              >
                Impressum
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                to="/admin/login" 
                className="text-gray-400 hover:text-teal-600 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 