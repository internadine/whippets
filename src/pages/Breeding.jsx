import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Breeding = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-whippet-50 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-paws"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              {t('breeding.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('breeding.subtitle')}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('breeding.description')}
            </p>
          </div>
        </div>
      </div>

      {/* About Border Whippets Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-gray-900">
                {t('breeding.about.title')}
              </h2>
              <p className="text-gray-600">
                {t('breeding.about.description')}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                {/* Placeholder for an image of Border Whippets */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Border Whippet Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Puppies Section */}
      <div className="bg-whippet-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  {/* Placeholder for an image of puppies */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Puppies Image
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-3xl font-display font-bold text-gray-900">
                  {t('breeding.puppies.title')}
                </h2>
                <p className="text-gray-600">
                  {t('breeding.puppies.description')}
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link to="/gallery" className="bg-whippet-500 hover:bg-whippet-600 text-white px-6 py-2 rounded-full inline-flex items-center space-x-2 transition-colors">
                    <span>{t('gallery.title')}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <Link to="/diary" className="bg-white text-whippet-500 hover:text-whippet-600 border-2 border-whippet-200 hover:bg-whippet-50 px-6 py-2 rounded-full inline-flex items-center space-x-2 transition-colors">
                    <span>{t('diary.title')}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Parents Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-gray-900">
                {t('breeding.parents.title')}
              </h2>
              <p className="text-gray-600">
                {t('breeding.parents.description')}
              </p>
              <Link to="/gallery?filter=parents" className="bg-whippet-500 hover:bg-whippet-600 text-white px-6 py-2 rounded-full inline-flex items-center space-x-2 transition-colors">
                <span>{t('gallery.filters.parents')}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                {/* Placeholder for an image of parent dogs */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Parent Dogs Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interested Section */}
      <div className="bg-whippet-100 py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              {t('breeding.contact.title')}
            </h2>
            <p className="text-gray-600">
              {t('breeding.contact.description')}
            </p>
            <a href="#contact" className="bg-whippet-500 hover:bg-whippet-600 text-white px-6 py-2 rounded-full inline-block transition-colors">
              {t('contact.title')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breeding; 