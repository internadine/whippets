import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { TrophyIcon, HeartIcon, SparklesIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';

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
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 space-y-6">
            <div className="flex items-center gap-4">
              <Logo size="xl" withText={false} />
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-whippet-100 text-teal-600 font-medium text-sm">
                <SparklesIcon className="h-5 w-5 mr-2" />
                {t('hero.badge')}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-800">
              {t('hero.title')} <br />
              <span className="text-whippet-600">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/physiotherapy" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-colors">
                {t('navbar.physiotherapy')}
              </Link>
              <Link to="/breeding" className="bg-white text-whippet-500 hover:text-whippet-600 hover:bg-whippet-50 border-2 border-whippet-200 px-6 py-3 rounded-full transition-colors">
                {t('navbar.breeding')}
              </Link>
              <Link to="/flyball" className="bg-white text-teal-600 hover:text-teal-700 hover:bg-teal-50 border-2 border-teal-200 px-6 py-3 rounded-full transition-colors">
                {t('navbar.flyball')}
              </Link>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px]">
            <img
              src="/mom-whippet.jpg"
              alt={t('hero.imageAlt')}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent mix-blend-overlay" />
          </div>
        </div>
      </section>

      {/* Three Main Sections */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Expert Areas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our three main areas of expertise in canine care and training
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Physiotherapy Card */}
          <div className="group bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100">
            <div className="p-8 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-4">
                {t('physiotherapy.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('physiotherapy.description')}
              </p>
              <Link 
                to="/physiotherapy" 
                className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium group/link"
              >
                <span>{t('diary.readMore')}</span>
                <svg 
                  className="h-5 w-5 transform group-hover/link:translate-x-1 transition-transform" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Breeding Card */}
          <div className="group bg-gradient-to-b from-whippet-50 to-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-whippet-100">
            <div className="p-8 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-whippet-100 text-whippet-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-whippet-600 transition-colors mb-4">
                {t('breeding.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('breeding.description')}
              </p>
              <Link 
                to="/breeding" 
                className="inline-flex items-center space-x-2 text-whippet-600 hover:text-whippet-700 font-medium group/link"
              >
                <span>{t('diary.readMore')}</span>
                <svg 
                  className="h-5 w-5 transform group-hover/link:translate-x-1 transition-transform" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Flyball Card */}
          <div className="group bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100">
            <div className="p-8 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-4">
                {t('flyball.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('flyball.description')}
              </p>
              <Link 
                to="/flyball" 
                className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium group/link"
              >
                <span>{t('diary.readMore')}</span>
                <svg 
                  className="h-5 w-5 transform group-hover/link:translate-x-1 transition-transform" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Diary Entries Section */}
      <section className="bg-whippet-50 rounded-whippet p-6 sm:p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4">
              {t('diary.latestEntries')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('diary.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  <div className="flex items-center gap-2 text-sm text-teal-600 mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
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
              className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <span>{t('diary.viewAll')}</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="container mx-auto px-4" id="contact">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0">
              <div className="h-48 w-full md:h-full md:w-48 flex items-center justify-center bg-teal-600">
                <Logo size="lg" withText={false} />
              </div>
            </div>
            <div className="p-8">
              <div className="text-center md:text-left space-y-4">
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {t('contact.title')}
                </h2>
                <p className="text-gray-600">
                  {t('contact.description')}
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
      </section>
    </div>
  );
};

export default Home; 