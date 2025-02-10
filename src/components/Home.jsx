import { useTranslation } from 'react-i18next';
import { TrophyIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative rounded-whippet overflow-hidden bg-whippet-50 border border-whippet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center">
          <div className="max-w-lg">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-whippet-100 text-whippet-800">
              {t('hero.badge')}
            </span>
            <h1 className="mt-4 text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex gap-4">
              <Link to="/gallery" className="btn-primary">
                {t('hero.viewJourney')}
              </Link>
              <Link to="/services" className="btn-primary">
                {t('hero.services')}
              </Link>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <img
              src="/mom-whippet.jpg"
              alt={t('hero.imageAlt')}
              className="w-full h-full object-cover rounded-whippet"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              {t('about.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-whippet-100 text-whippet-600">
                <HeartIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {t('services.professionalCare.title')}
              </h3>
              <p className="mt-2 text-gray-500 text-center">
                {t('services.professionalCare.description')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-whippet-100 text-whippet-600">
                <TrophyIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {t('services.sportsExcellence.title')}
              </h3>
              <p className="mt-2 text-gray-500 text-center">
                {t('services.sportsExcellence.description')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-whippet-100 text-whippet-600">
                <StarIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {t('services.expertise.title')}
              </h3>
              <p className="mt-2 text-gray-500 text-center">
                {t('services.expertise.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flyball Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              {t('flyball.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              {t('flyball.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              {t('contact.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('contact.description')}
            </p>
            <div className="mt-8">
              <p className="text-whippet-600 font-semibold">{t('contact.location')}</p>
              <p className="text-gray-500">{t('contact.practice')}</p>
              <p className="text-gray-500">{t('contact.email')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 