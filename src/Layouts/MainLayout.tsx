import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Subheader } from '../components/Subheader';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Subheader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};