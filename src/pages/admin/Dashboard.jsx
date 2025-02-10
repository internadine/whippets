import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../../firebaseConfig';
import { 
  DocumentPlusIcon, 
  BookOpenIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      title: t('admin.dashboard.puppies'),
      description: t('admin.dashboard.puppiesDesc'),
      icon: DocumentPlusIcon,
      link: '/admin/puppies'
    },
    {
      title: t('admin.dashboard.diary'),
      description: t('admin.dashboard.diaryDesc'),
      icon: BookOpenIcon,
      link: '/admin/diary'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            {t('admin.dashboard.title')}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-whippet-600"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span>{t('admin.dashboard.logout')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white p-6 rounded-whippet shadow-md hover:shadow-lg transition-shadow border border-cream-100"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <item.icon className="h-8 w-8 text-whippet-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 