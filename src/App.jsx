import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PuppyGallery from './pages/PuppyGallery';
import PuppyProfile from './pages/PuppyProfile';
import DiaryPage from './pages/DiaryPage';
import DiaryEntryPage from './pages/DiaryEntryPage';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import BorderWhippetManager from './pages/admin/PuppyManager';
import DiaryManager from './pages/admin/DiaryManager';
import ContentManager from './pages/admin/ContentManager';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Physiotherapy from './pages/Physiotherapy';
import Breeding from './pages/Breeding';
import Flyball from './pages/Flyball';
import Imprint from './pages/Imprint';

const router = {
  future: {
    v7_startTransition: true,
  },
};

function App() {
  return (
    <Router {...router}>
      <div className="min-h-screen flex flex-col bg-cream-50">
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/physiotherapy" element={<Physiotherapy />} />
            <Route path="/breeding" element={<Breeding />} />
            <Route path="/flyball" element={<Flyball />} />
            <Route path="/gallery" element={<PuppyGallery />} />
            <Route path="/puppy/:id" element={<PuppyProfile />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/diary/:entryId" element={<DiaryEntryPage />} />
            <Route path="/puppy/:id/diary" element={<DiaryPage />} />
            <Route path="/imprint" element={<Imprint />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/puppies"
            element={
              <ProtectedRoute>
                <BorderWhippetManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/diary"
            element={
              <ProtectedRoute>
                <DiaryManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <ProtectedRoute>
                <ContentManager />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 