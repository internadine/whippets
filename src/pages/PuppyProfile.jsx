import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CalendarIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const PuppyProfile = () => {
  const { id } = useParams();
  const [puppy, setPuppy] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch puppy data
        const puppyDoc = await getDoc(doc(db, 'puppies', id));
        if (puppyDoc.exists()) {
          setPuppy({ id: puppyDoc.id, ...puppyDoc.data() });
        }

        // Fetch diary entries for this puppy
        const diaryRef = collection(db, 'diary');
        const q = query(
          diaryRef,
          where('puppyId', '==', id),
          orderBy('date', 'desc')
        );
        const diarySnapshot = await getDocs(q);
        const entries = diarySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDiaryEntries(entries);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-whippet-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800">{t('puppy.notFound.title')}</h1>
        <p className="text-gray-600">{t('puppy.notFound.description')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="max-w-lg mx-auto">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <img
                src={puppy.images?.[selectedImage] || '/placeholder-puppy.jpg'}
                alt={t('puppy.imageAlt', { name: puppy.name })}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {puppy.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden bg-gray-100 transition-all ${
                    selectedImage === index ? 'ring-2 ring-whippet-600 scale-95' : 'hover:scale-95'
                  }`}
                >
                  <img
                    src={image}
                    alt={t('puppy.thumbnailAlt', { name: puppy.name, number: index + 1 })}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Puppy Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{puppy.name}</h1>
            <p className="text-gray-600 text-lg">{puppy.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-whippet-600" />
              <span className="text-gray-600">
                <span className="font-medium">{t('puppy.born')}:</span> {puppy.birthDate}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ScaleIcon className="h-5 w-5 text-whippet-600" />
              <span className="text-gray-600">
                <span className="font-medium">{t('puppy.weight')}:</span> {puppy.weight}g
              </span>
            </div>
          </div>

          {puppy.traits?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {t('puppy.traits.title')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {puppy.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="bg-whippet-100 text-whippet-600 px-3 py-1 rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {puppy.parents && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {t('puppy.parents.title')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-800">
                    {t('puppy.parents.mother')}
                  </h3>
                  <p className="text-gray-600">{puppy.parents.mother}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-800">
                    {t('puppy.parents.father')}
                  </h3>
                  <p className="text-gray-600">{puppy.parents.father}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Updates Section */}
      {puppy.updates?.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('puppy.updates.title')}
          </h2>
          <div className="space-y-6">
            {puppy.updates.map((update, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t('puppy.updates.week', { week: update.week })}
                  </h3>
                  <span className="text-gray-500">{update.date}</span>
                </div>
                <p className="text-gray-600">{update.description}</p>
                {update.image && (
                  <img
                    src={update.image}
                    alt={t('puppy.updates.imageAlt', { week: update.week })}
                    className="mt-4 rounded-lg w-full max-w-md mx-auto"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diary Entries Section */}
      <div className="border-t pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            {t('puppy.diary.title')}
          </h2>
          <Link
            to={`/puppy/${id}/diary`}
            className="text-whippet-600 hover:text-whippet-700 font-medium"
          >
            {t('diary.viewAll')} →
          </Link>
        </div>
        
        <div className="space-y-6">
          {diaryEntries.slice(0, 3).map((entry) => (
            <Link 
              key={entry.id}
              to={`/diary/${entry.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="flex">
                  {entry.images?.[0] && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={entry.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-whippet-600 mb-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-whippet-600 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{entry.content}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {diaryEntries.length === 0 && (
            <div className="text-center py-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">{t('puppy.diary.noEntries')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuppyProfile; 