import { useTranslation } from 'react-i18next';

const Physiotherapy = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-teal-50 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-paws"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              {t('physiotherapy.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('physiotherapy.subtitle')}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('physiotherapy.description')}
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                {t('physiotherapy.contact.title')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            {t('physiotherapy.services.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('physiotherapy.services.rehabilitation.title')}
            </h3>
            <p className="text-gray-600">
              {t('physiotherapy.services.rehabilitation.description')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('physiotherapy.services.sportsMedicine.title')}
            </h3>
            <p className="text-gray-600">
              {t('physiotherapy.services.sportsMedicine.description')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('physiotherapy.services.geriatricCare.title')}
            </h3>
            <p className="text-gray-600">
              {t('physiotherapy.services.geriatricCare.description')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('physiotherapy.services.consultations.title')}
            </h3>
            <p className="text-gray-600">
              {t('physiotherapy.services.consultations.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div className="bg-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              {t('physiotherapy.approach.title')}
            </h2>
            <p className="text-gray-600">
              {t('physiotherapy.approach.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4" id="contact">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0">
              <div className="h-48 w-full md:h-full md:w-48 bg-teal-600"></div>
            </div>
            <div className="p-8">
              <div className="text-center md:text-left space-y-4">
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {t('physiotherapy.contact.title')}
                </h2>
                <p className="text-gray-600">
                  {t('physiotherapy.contact.description')}
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:contact@example.com"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-colors"
                  >
                    {t('contact.title')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Physiotherapy; 