import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';

const ContentManager = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [content, setContent] = useState({
    hero: {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      description: t('hero.description')
    },
    about: {
      title: t('about.title'),
      description: t('about.description')
    },
    contact: {
      title: t('contact.title'),
      description: t('contact.description')
    }
  });

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  const handleSave = async (section) => {
    setLoading(true);
    try {
      const contentRef = doc(db, 'content', 'main');
      await updateDoc(contentRef, {
        [section]: content[section]
      });
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const sections = [
    {
      id: 'hero',
      title: 'Hero Section',
      fields: ['title', 'subtitle', 'description']
    },
    {
      id: 'about',
      title: 'About Section',
      fields: ['title', 'description']
    },
    {
      id: 'contact',
      title: 'Contact Section',
      fields: ['title', 'description']
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
          {t('admin.dashboard.content')}
        </h1>

        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.id} className="bg-white rounded-whippet shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                {editingSection === section.id ? (
                  <button
                    onClick={() => handleSave(section.id)}
                    disabled={loading}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span>{t('admin.content.save')}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(section.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-whippet-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span>{t('admin.content.edit')}</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {section.fields.map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field}
                    </label>
                    {editingSection === section.id ? (
                      field === 'description' ? (
                        <textarea
                          value={content[section.id][field]}
                          onChange={(e) => handleChange(section.id, field, e.target.value)}
                          rows={4}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500"
                        />
                      ) : (
                        <input
                          type="text"
                          value={content[section.id][field]}
                          onChange={(e) => handleChange(section.id, field, e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500"
                        />
                      )
                    ) : (
                      <div className="text-gray-600 bg-gray-50 rounded-lg p-3">
                        {content[section.id][field]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManager; 