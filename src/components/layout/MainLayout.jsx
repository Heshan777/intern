import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white dark:bg-dark-bg-secondary text-center p-4 shadow-inner">
        © {new Date().getFullYear()} InternLink. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;