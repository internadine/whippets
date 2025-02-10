import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CalendarIcon, TagIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const DiaryPage = () => {
  const { id: puppyId } = useParams();
  const [entries, setEntries] = useState([]);
  const [puppy, setPuppy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (puppyId) {
          const puppyDoc = await getDoc(doc(db, 'puppies', puppyId));
          if (puppyDoc.exists()) {
            setPuppy({ id: puppyDoc.id, ...puppyDoc.data() });
          }
        }

        const diaryRef = collection(db, 'diary');
        let q;
        
        if (puppyId) {
          q = query(
            diaryRef,
            where('puppyId', '==', puppyId),
            orderBy('date', 'desc')
          );
        } else {
          q = query(diaryRef, orderBy('date', 'desc'));
        }

        const snapshot = await getDocs(q);
        const entriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEntries(entriesData);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [puppyId]);

  const categories = ['all', 'general', 'milestone', 'health', 'training'];
  
  const filteredEntries = entries.filter(entry => 
    selectedCategory === 'all' || entry.category === selectedCategory
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'milestone':
        return 'bg-amber-100 text-amber-800';
      case 'health':
        return 'bg-emerald-100 text-emerald-800';
      case 'training':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-whippet-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-gradient-to-b from-whippet-50 to-transparent opacity-50"></div>
        </div>
        <h1 className="text-5xl font-display font-bold text-gray-900 relative">
          {puppy ? t('diary.puppyTitle', { name: puppy.name }) : t('diary.title')}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-whippet-500 rounded-full"></div>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {puppy ? t('diary.puppyDescription', { name: puppy.name }) : t('diary.description')}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-whippet-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t(`diary.categories.${category === 'all' ? 'all' : category}`)}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-12">
        {filteredEntries.map((entry) => (
          <Link 
            key={entry.id}
            to={`/diary/${entry.id}`}
            className="block group"
          >
            <div className="bg-white rounded-whippet shadow-lg overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                  <div className="flex items-center gap-2 text-whippet-600">
                    <CalendarIcon className="h-5 w-5" />
                    <span className="font-medium">
                      {new Date(entry.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {entry.category && (
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getCategoryColor(entry.category)}`}>
                      <TagIcon className="h-4 w-4" />
                      <span className="capitalize font-medium">
                        {t(`diary.categories.${entry.category}`)}
                      </span>
                    </div>
                  )}
                  <div className="ml-auto flex items-center gap-2 text-whippet-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">{t('diary.readMore')}</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Text Content */}
                  <div className="space-y-6">
                    <h2 className="text-3xl font-display font-bold text-gray-900 group-hover:text-whippet-600 transition-colors">
                      {entry.title}
                    </h2>

                    <div className="prose prose-lg prose-whippet">
                      <p className="text-gray-600 whitespace-pre-line leading-relaxed line-clamp-3">
                        {entry.content}
                      </p>
                    </div>
                  </div>

                  {/* Images */}
                  {entry.images && entry.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
                      {entry.images.map((image, index) => (
                        <div 
                          key={index} 
                          className={`relative group rounded-2xl overflow-hidden ${
                            entry.images.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'
                          }`}
                        >
                          <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredEntries.length === 0 && (
          <div className="text-center py-16 bg-white rounded-whippet shadow-md">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedCategory === 'all' 
                  ? (puppy ? t('diary.noPuppyEntries') : t('diary.noEntries'))
                  : t('diary.noCategoryEntries', { category: t(`diary.categories.${selectedCategory}`) })}
              </h3>
              <p className="text-gray-500">
                {t('diary.checkBackSoon')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryPage; 