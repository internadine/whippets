import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const AdminNav = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-purple-100 text-purple-900' : 'hover:bg-gray-100';
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          <div className="flex flex-grow items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-display text-lg font-bold text-purple-700">Admin Area</span>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
              <Link
                to="/"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center space-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HomeIcon className="h-4 w-4" />
                <span>View Site</span>
              </Link>
              <Link
                to="/admin/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('/admin/dashboard')}`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/puppies"
                className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('/admin/puppies')}`}
              >
                Border Whippet Manager
              </Link>
              <Link
                to="/admin/diary"
                className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('/admin/diary')}`}
              >
                Diary Manager
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="pt-2 pb-3 space-y-1 px-4">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HomeIcon className="h-5 w-5" />
            <span>View Site</span>
          </Link>
          <Link
            to="/admin/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/dashboard')}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/puppies"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/puppies')}`}
          >
            Border Whippet Manager
          </Link>
          <Link
            to="/admin/diary"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/diary')}`}
          >
            Diary Manager
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNav; 