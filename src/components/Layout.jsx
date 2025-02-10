import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        <div className="absolute inset-0 bg-whippet-pattern opacity-5 pointer-events-none" />
        <div className="relative">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
} 