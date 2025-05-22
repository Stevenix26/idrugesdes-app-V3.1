'use client'
import React, { useState, useEffect } from 'react'
import { Prescription, ShoppingBag, House, Gear, Info, AddressBook, Users, CaretLineLeft, CaretLineRight, Bell, SignOut, Moon, Sun, Receipt } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const SidebarAdmin = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('light');

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  // Check for user's preferred theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const menuItems = [
    {
      title: "Main",
      list: [
        {
          title: "Dashboard",
          path: "/admin",
          icon: <House weight={pathname === "/admin" ? "fill" : "duotone"} />
        },
        {
          title: "Prescriptions",
          path: "/admin/prescriptionList",
          icon: <Prescription weight={pathname === "/admin/prescriptionList" ? "fill" : "duotone"} />
        },
        {
          title: "Orders",
          path: "/admin/orders",
          icon: <ShoppingBag weight={pathname === "/admin/orders" ? "fill" : "duotone"} />
        },
        {
          title: "Users",
          path: "/admin/users",
          icon: <Users weight={pathname === "/admin/users" ? "fill" : "duotone"} />
        },
        {
          title: "Bills",
          path: "/admin/bills",
          icon: <Receipt weight={pathname === "/admin/bills" ? "fill" : "duotone"} />
        },
      ]
    },
    {
      title: "System",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <Gear weight="duotone" />
        },
        {
          title: "Notifications",
          path: "/dashboard/notifications",
          icon: <Bell weight="duotone" />
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <Info weight="duotone" />
        },
        {
          title: "Contact Us",
          path: "/dashboard/contact_us",
          icon: <AddressBook weight="duotone" />
        },
      ]
    }
  ];

  return (
    <aside className="h-screen sticky top-0 left-0 z-40">
      <div className={`
        h-full flex flex-col 
        ${collapsed ? 'w-20' : 'w-64'} 
        transition-all duration-300 ease-in-out 
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700 
        shadow-lg
      `}>
        {/* Logo and Toggle Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 dark:bg-purple-500 rounded-md flex items-center justify-center">
                <Users weight="fill" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">Admin</span>
            </Link>
          )}

          {collapsed && (
            <Link href="/admin" className="flex items-center justify-center w-full">
              <div className="w-8 h-8 bg-purple-600 dark:bg-purple-500 rounded-md flex items-center justify-center">
                <Users weight="fill" size={20} className="text-white" />
              </div>
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <CaretLineRight weight="bold" size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <CaretLineLeft weight="bold" size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* User Profile Section */}
        {!collapsed && user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.fullName || 'Admin'} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-purple-600 font-medium">{(user.fullName || 'Admin').charAt(0)}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 dark:text-white truncate">
                  Admin Panel
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.primaryEmailAddress?.emailAddress || ''}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Menu Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-6">
              {!collapsed && (
                <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {item.title}
                </h3>
              )}
              <ul className="space-y-2">
                {item.list.map((listItem, listIndex) => (
                  <li key={listIndex}>
                    <Link
                      href={listItem.path}
                      className={`
                        flex items-center ${collapsed ? 'justify-center' : ''} 
                        px-4 py-2 rounded-lg 
                        transition-all duration-200 
                        ${pathname === listItem.path
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                      `}
                    >
                      <span className="text-xl mr-3">{listItem.icon}</span>
                      {!collapsed && <span className="font-medium">{listItem.title}</span>}
                      {pathname === listItem.path && <span className="absolute left-0 w-1 h-8 bg-purple-600 dark:bg-purple-400 rounded-r-md"></span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              flex items-center ${collapsed ? 'justify-center' : 'justify-between'} w-full 
              p-2 rounded-lg 
              hover:bg-gray-100 dark:hover:bg-gray-700 
              text-gray-600 dark:text-gray-300 
              transition-colors
            `}
            aria-label="Toggle theme"
          >
            <span className="text-xl">
              {theme === 'dark' ? <Sun weight="regular" /> : <Moon weight="regular" />}
            </span>
            {!collapsed && (
              <span className="font-medium">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={() => signOut()}
            className={`
              flex items-center ${collapsed ? 'justify-center' : 'justify-between'} w-full 
              p-2 rounded-lg 
              hover:bg-red-50 dark:hover:bg-red-900/20 
              text-red-600 dark:text-red-400 
              transition-colors
            `}
            aria-label="Sign out"
          >
            <span className="text-xl">
              <SignOut weight="regular" />
            </span>
            {!collapsed && (
              <span className="font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SidebarAdmin
