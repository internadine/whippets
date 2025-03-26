import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarIcon, ScaleIcon } from '@heroicons/react/24/outline';

const PuppyGallery = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, parents
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const puppiesRef = collection(db, 'puppies');
        const querySnapshot = await getDocs(puppiesRef);
        const puppiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPuppies(puppiesData);
      } catch (error) {
        console.error('Error fetching puppies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPuppies();
  }, []);

  const filteredPuppies = puppies.filter(puppy => {
    if (filter === 'all') return !puppy.isParent;
    if (filter === 'parents') return puppy.isParent;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-whippet-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-gray-900">{t('gallery.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-whippet-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('gallery.filters.all')}
        </button>
        <button
          onClick={() => setFilter('parents')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'parents'
              ? 'bg-whippet-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('gallery.filters.parents')}
        </button>
      </div>

      {/* Puppy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPuppies.map((puppy) => (
          <Link
            key={puppy.id}
            to={`/puppy/${puppy.id}`}
            className="group"
          >
            <div className="card overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={puppy.images?.[0] || '/placeholder-puppy.jpg'}
                  alt={t('gallery.puppy.imageAlt', { name: puppy.name })}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {puppy.isParent && (
                  <div className="absolute top-4 left-4 bg-whippet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('gallery.filters.parents')}
                  </div>
                )}
                {!puppy.isParent && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    puppy.status === 'available' 
                      ? 'bg-green-500 text-white' 
                      : puppy.status === 'reserved'
                        ? 'bg-amber-500 text-white'
                        : 'bg-rose-500 text-white'
                  }`}>
                    {puppy.status === 'available' 
                      ? t('gallery.status.available')
                      : puppy.status === 'reserved'
                        ? t('gallery.status.reserved')
                        : t('gallery.status.adopted')}
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900 group-hover:text-whippet-600 transition-colors">
                    {puppy.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{puppy.birthDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ScaleIcon className="h-4 w-4" />
                      <span>{puppy.weight}g</span>
                    </div>
                  </div>
                </div>
                
                {puppy.traits && puppy.traits.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {puppy.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="bg-whippet-50 text-whippet-600 px-2 py-1 rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                )}

                {(puppy.parents?.mother || puppy.parents?.father) && (
                  <div className="text-sm text-gray-600">
                    {puppy.parents.mother && (
                      <div>
                        <span className="font-medium">{t('puppy.parents.mother')}:</span> {puppy.parents.mother}
                      </div>
                    )}
                    {puppy.parents.father && (
                      <div>
                        <span className="font-medium">{t('puppy.parents.father')}:</span> {puppy.parents.father}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPuppies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">{t('gallery.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default PuppyGallery; 