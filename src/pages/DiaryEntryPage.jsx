import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CalendarIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const DiaryEntryPage = () => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entryDoc = await getDoc(doc(db, 'diary', entryId));
        if (entryDoc.exists()) {
          setEntry({ id: entryDoc.id, ...entryDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching diary entry:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [entryId]);

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

  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {t('diary.entryNotFound')}
        </h1>
        <Link to="/diary" className="text-whippet-600 hover:text-whippet-700">
          {t('diary.backToDiary')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      {/* Back Button */}
      <Link
        to="/diary"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-whippet-600 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>{t('diary.backToDiary')}</span>
      </Link>

      <article className="bg-white rounded-whippet shadow-lg overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
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
          </div>

          {/* Title */}
          <h1 className="text-4xl font-display font-bold text-gray-900">
            {entry.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg prose-whippet max-w-none">
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {entry.content}
            </p>
          </div>

          {/* Images */}
          {entry.images && entry.images.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {entry.images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative rounded-2xl overflow-hidden aspect-video"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default DiaryEntryPage; 