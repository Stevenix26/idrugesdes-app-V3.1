'use client'
import React, { useState, useEffect } from 'react'
import { Prescription, CaretLineLeft, CaretLineRight, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare, Moon, Sun, SignOut } from '@phosphor-icons/react/dist/ssr';
import MenuLink from "./menulink/menulink"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const { user } = useUser();

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

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const menuItems = [
    {
      title: "Main Menu",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <House weight={pathname === "/dashboard" ? "fill" : "regular"} />
        },
        {
          title: "Make a Prescription",
          path: "/dashboard/prescription",
          icon: <Prescription weight={pathname === "/dashboard/prescription" ? "fill" : "regular"} />
        },
        {
          title: "Make Order",
          path: "/dashboard/orders",
          icon: <ShoppingBag weight={pathname === "/dashboard/orders" ? "fill" : "regular"} />
        },
        {
          title: "Submitted Prescriptions",
          path: "/dashboard/submitted",
          icon: <SubtractSquare weight={pathname === "/dashboard/submitted" ? "fill" : "regular"} />
        }
      ]
    },
    {
      title: "User Settings",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <Gear weight={pathname === "/dashboard/settings" ? "fill" : "regular"} />
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <Info weight={pathname === "/dashboard/help" ? "fill" : "regular"} />
        },
        {
          title: "Contact Us",
          path: "/dashboard/contact_us",
          icon: <AddressBook weight={pathname === "/dashboard/contact_us" ? "fill" : "regular"} />
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center">
                <Prescription weight="fill" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">iDrugDes</span>
            </Link>
          )}

          {collapsed && (
            <Link href="/dashboard" className="flex items-center justify-center w-full">
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center">
                <Prescription weight="fill" size={20} className="text-white" />
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
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.fullName || 'User'} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-indigo-600 font-medium">{(user.fullName || 'User').charAt(0)}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 dark:text-white truncate">
                  {user.fullName || 'User'}
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
                    <MenuLink item={listItem} side={collapsed} />
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

export default Sidebar
