import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-whippet-50 hover:bg-whippet-100 transition-colors"
      aria-label={`Switch to ${i18n.language === 'en' ? 'German' : 'English'}`}
    >
      <GlobeAltIcon className="h-5 w-5 text-whippet-600" />
      <span className="text-sm font-medium text-whippet-600">
        {i18n.language === 'en' ? 'DE' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher; 