import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { TrophyIcon, HeartIcon, SparklesIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [featuredPuppies, setFeaturedPuppies] = useState([]);
  const [latestDiaryEntries, setLatestDiaryEntries] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch featured puppies
      const puppiesRef = collection(db, 'puppies');
      const puppiesQuery = query(puppiesRef, limit(3));
      const puppiesSnapshot = await getDocs(puppiesQuery);
      const puppies = puppiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeaturedPuppies(puppies);

      // Fetch latest diary entries
      const diaryRef = collection(db, 'diary');
      const diaryQuery = query(diaryRef, orderBy('date', 'desc'), limit(3));
      const diarySnapshot = await getDocs(diaryQuery);
      const entries = diarySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLatestDiaryEntries(entries);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-whippet overflow-hidden bg-whippet-50 border border-whippet-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-whippet-100 text-whippet-600 font-medium text-sm">
              <SparklesIcon className="h-5 w-5 mr-2" />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-800">
              {t('hero.title')} <br/>
              <span className="bg-gradient-to-r from-whippet-600 to-whippet-800 bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery" className="btn-primary">
                {t('hero.viewJourney')}
              </Link>
              <a href="#physio" className="btn-primary bg-white !text-whippet-600 border-2 border-whippet-200 hover:bg-whippet-50">
                {t('hero.services')}
              </a>
            </div>
          </div>
          <div className="relative h-full min-h-[500px] md:min-h-0">
            <img
              src="/mom-whippet.jpg"
              alt={t('hero.imageAlt')}
              className="absolute inset-0 w-full h-full object-cover rounded-whippet"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-whippet-900/20 to-transparent mix-blend-overlay rounded-whippet" />
          </div>
        </div>
      </section>

      {/* Latest Diary Entries Section */}
      <section className="bg-whippet-50 rounded-whippet p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              {t('diary.latestEntries')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('diary.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestDiaryEntries.map((entry) => (
              <Link
                key={entry.id}
                to={entry.puppyId ? `/puppy/${entry.puppyId}/diary` : '/diary'}
                className="bg-white rounded-whippet shadow-md overflow-hidden hover:shadow-lg transition-all group"
              >
                {entry.images?.[0] && (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={entry.images[0]}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-whippet-600 mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-whippet-600 transition-colors mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{entry.content}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/diary"
              className="inline-flex items-center space-x-2 text-whippet-600 hover:text-whippet-700 font-medium"
            >
              <span>{t('diary.viewAll')}</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Corinna Section */}
      <section className="space-y-8" id="physio">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="section-title inline-block">{t('about.title')}</h2>
          <p className="text-gray-600 mt-4">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="card p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-whippet-100 rounded-full flex items-center justify-center mx-auto">
              <HeartIcon className="h-8 w-8 text-whippet-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{t('services.professionalCare.title')}</h3>
            <p className="text-gray-600">
              {t('services.professionalCare.description')}
            </p>
          </div>
          <div className="card p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-whippet-100 rounded-full flex items-center justify-center mx-auto">
              <TrophyIcon className="h-8 w-8 text-whippet-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{t('services.sportsExcellence.title')}</h3>
            <p className="text-gray-600">
              {t('services.sportsExcellence.description')}
            </p>
          </div>
          <div className="card p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-whippet-100 rounded-full flex items-center justify-center mx-auto">
              <UserGroupIcon className="h-8 w-8 text-whippet-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{t('services.expertise.title')}</h3>
            <p className="text-gray-600">
              {t('services.expertise.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Flyball Section */}
      <section className="bg-whippet-50 rounded-whippet p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="section-title inline-block">{t('flyball.title')}</h2>
          <p className="text-gray-600">
            {t('flyball.description')}
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('flyball.competition.title')}</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                {t('flyball.competition.services', { returnObjects: true }).map((service, index) => (
                  <li key={index}>• {service}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('flyball.general.title')}</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                {t('flyball.general.services', { returnObjects: true }).map((service, index) => (
                  <li key={index}>• {service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-cream-50 rounded-whippet p-8 md:p-12" id="contact">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="section-title inline-block">{t('contact.title')}</h2>
          <p className="text-gray-600">
            {t('contact.description')}
          </p>
          <div className="inline-flex flex-col items-center space-y-2">
            <p className="font-medium text-gray-800">{t('contact.details.name')}</p>
            <p className="text-gray-600">{t('contact.details.title')}</p>
            <p className="text-gray-600">{t('contact.details.subtitle')}</p>
            <p className="text-gray-600">{t('contact.details.location')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 