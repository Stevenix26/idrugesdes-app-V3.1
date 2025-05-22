"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/ui/dashboard/sidebar/sidebar'
import { useUser } from '@clerk/nextjs';
import { useAuth } from "../../hooks/useAuth";
import {
  HomeIcon,
  BeakerIcon as PrescriptionBottleIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon as CogIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const { user } = useUser();
  const { isPharmacist, isAdmin, isLoadingDbUser } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Prescriptions", href: "/dashboard/prescriptions", icon: PrescriptionBottleIcon },
    ...(isPharmacist || isAdmin
      ? [{ name: "Pharmacy Management", href: "/dashboard/pharmacy", icon: BuildingStorefrontIcon }]
      : []),
    ...(isAdmin
      ? [
        { name: "User Management", href: "/dashboard/admin/users", icon: UserGroupIcon },
        { name: "Settings", href: "/dashboard/admin/settings", icon: CogIcon },
      ]
      : []),
  ];

  if (isLoadingDbUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Toggle sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar navigation={navigation} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hidden md:block">iDrugDes</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {user && (
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden ring-2 ring-indigo-200 dark:ring-indigo-800">
                    {user.imageUrl ? (
                      <img src={user.imageUrl} alt={user.fullName || 'User'} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-indigo-600 font-medium text-lg">{(user.fullName || 'User').charAt(0)}</span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.fullName || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-all duration-300 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout