import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-midnight-900 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full flex flex-col relative z-0 mt-16">
        <div className="w-full mx-auto container px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
