import { useTranslation } from 'react-i18next';

const Imprint = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
          {t('imprint.title')}
        </h1>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.legalInfo')}
            </h2>
            <div className="space-y-1 text-gray-600">
              <p>Corinna Spitzer</p>
              <p>Hundephysio</p>
              <p>Friedensstrasse 14</p>
              <p>85622 Feldkirchen</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.contact')}
            </h2>
            <div className="space-y-1 text-gray-600">
              <p>E-Mail: corinna.spitzer@gmx.de</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.professionalTitle')}
            </h2>
            <div className="space-y-1 text-gray-600">
              <p>{t('imprint.professionalInfo.title')}</p>
              <p>{t('imprint.professionalInfo.country')}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.disputeResolution.title')}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                {t('imprint.disputeResolution.platform')}:{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>{t('imprint.disputeResolution.participation')}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.liability.content.title')}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>{t('imprint.liability.content.text1')}</p>
              <p>{t('imprint.liability.content.text2')}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.liability.links.title')}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>{t('imprint.liability.links.text1')}</p>
              <p>{t('imprint.liability.links.text2')}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
              {t('imprint.copyright.title')}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>{t('imprint.copyright.text1')}</p>
              <p>{t('imprint.copyright.text2')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Imprint; 