import { useTranslation } from 'react-i18next';

const Flyball = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-teal-50 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-paws"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              {t('flyball.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('flyball.subtitle')}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('flyball.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-gray-900">
                {t('flyball.achievements.title')}
              </h2>
              <ul className="space-y-4 list-disc pl-5">
                {t('flyball.achievements.items', { returnObjects: true }).map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                {/* Placeholder for an image of Flyball competition */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Flyball Competition Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Yoda Section */}
      <div className="bg-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  {/* Placeholder for an image of Yoda */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Yoda Image
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-3xl font-display font-bold text-gray-900">
                  {t('flyball.yoda.title')}
                </h2>
                <p className="text-gray-600">
                  {t('flyball.yoda.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organizational Involvement Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            {t('flyball.involvement.title')}
          </h2>
          <p className="text-gray-600">
            {t('flyball.involvement.description')}
          </p>
        </div>
      </div>

      {/* Training & Teamwork Section */}
      <div className="bg-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-gray-900">
                  {t('flyball.training.title')}
                </h2>
                <p className="text-gray-600">
                  {t('flyball.training.description')}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  {/* Placeholder for an image of training */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Training Image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flyball for Every Dog Section */}
      <div className="bg-teal-100 py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              {t('flyball.forEveryDog.title')}
            </h2>
            <p className="text-gray-600">
              {t('flyball.forEveryDog.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyball; 