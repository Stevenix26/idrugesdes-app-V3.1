"use client"
import React, { useState, useEffect } from 'react'
import SidebarAdmin from '../components/ui/dashboard/sidebarAdmin/sidebarAdmin'
import {
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    Cog6ToothIcon,
    CheckIcon,
    TrashIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    KeyIcon,
    ShoppingCartIcon,
    DocumentTextIcon
} from '@heroicons/react/24/solid'
import { useUser, useClerk } from '@clerk/nextjs';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New order #1024 received", time: "2 minutes ago", read: false, type: "order" },
        { id: 2, message: "Prescription #204 needs review", time: "10 minutes ago", read: false, type: "prescription" },
        { id: 3, message: "System update completed", time: "1 hour ago", read: true, type: "system" }
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            sound: true
        },
        language: 'en',
        timezone: 'UTC',
        security: {
            twoFactor: false,
            sessionTimeout: 30
        }
    });
    const { user } = useUser();
    const { signOut } = useClerk();

    // Check for user's preferred theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape' && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [sidebarOpen]);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const markNotificationAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const updateSetting = (category, setting, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: typeof prev[category] === 'object'
                ? { ...prev[category], [setting]: value }
                : value
        }));
    };

    const getToggleClass = (isActive) => {
        return isActive ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700';
    };

    const getTogglePosition = (isActive) => {
        return isActive ? 'translate-x-6' : 'translate-x-1';
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order':
                return <ShoppingCartIcon className="w-4 h-4 text-indigo-600" />;
            case 'prescription':
                return <DocumentTextIcon className="w-4 h-4 text-green-600" />;
            case 'system':
                return <Cog6ToothIcon className="w-5 h-5 text-gray-600" />;
            default:
                return <BellIcon className="w-5 h-5 text-gray-600" />;
        }
    };

    return <>

        <div className="flex h-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Mobile menu toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded={sidebarOpen}
                aria-controls="sidebar"
            >
                {sidebarOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                ) : (
                    <Bars3Icon className="w-6 h-6" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed md:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <SidebarAdmin />
            </aside>

            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top navigation bar for admin */}
                <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
                        <div className="flex items-center space-x-2">
                            <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hidden md:block">
                                iDrugDes Admin
                            </h1>
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Theme toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
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

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    aria-label="View notifications"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                >
                                    <BellIcon className="w-5 h-5" />
                                    {notifications.some(n => !n.read) && (
                                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                    )}
                                </button>

                                {/* Notifications Panel */}
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                                            <button
                                                onClick={clearAllNotifications}
                                                className="text-sm text-red-600 hover:text-red-700"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                                    No notifications
                                                </div>
                                            ) : (
                                                notifications.map(notification => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                                                {notification.message}
                                                            </p>
                                                            <div className="flex space-x-2">
                                                                {!notification.read && (
                                                                    <button
                                                                        onClick={() => markNotificationAsRead(notification.id)}
                                                                        className="text-indigo-600 hover:text-indigo-700"
                                                                        aria-label="Mark as read"
                                                                    >
                                                                        <CheckIcon className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => deleteNotification(notification.id)}
                                                                    className="text-red-600 hover:text-red-700"
                                                                    aria-label="Delete notification"
                                                                >
                                                                    <TrashIcon className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {notification.time}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Settings */}
                            <button
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-label="Open settings"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <Cog6ToothIcon className="w-5 h-5" />
                            </button>

                            {/* Settings Modal */}
                            {showSettings && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
                                                <button
                                                    onClick={() => setShowSettings(false)}
                                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                >
                                                    <XMarkIcon className="w-6 h-6" />
                                                </button>
                                            </div>
                                            <div className="space-y-6">
                                                {/* Theme Settings */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                        <GlobeAltIcon className="w-5 h-5" />
                                                        Appearance
                                                    </h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                                                        <button
                                                            onClick={toggleTheme}
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${getToggleClass(theme === 'dark')}`}
                                                        >
                                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${getTogglePosition(theme === 'dark')}`} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Notification Settings */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                        <GlobeAltIcon className="w-5 h-5" />
                                                        Notifications
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                                                            <button
                                                                onClick={() => updateSetting('notifications', 'email', !settings.notifications.email)}
                                                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${getToggleClass(settings.notifications.email)}`}
                                                            >
                                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${getTogglePosition(settings.notifications.email)}`} />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
                                                            <button
                                                                onClick={() => updateSetting('notifications', 'push', !settings.notifications.push)}
                                                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${getToggleClass(settings.notifications.push)}`}
                                                            >
                                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${getTogglePosition(settings.notifications.push)}`} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Security Settings */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                        <ShieldCheckIcon className="w-5 h-5" />
                                                        Security
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
                                                            <button
                                                                onClick={() => updateSetting('security', 'twoFactor', !settings.security.twoFactor)}
                                                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${getToggleClass(settings.security.twoFactor)}`}
                                                            >
                                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${getTogglePosition(settings.security.twoFactor)}`} />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-700 dark:text-gray-300">Session Timeout (minutes)</span>
                                                            <select
                                                                value={settings.security.sessionTimeout}
                                                                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                                                                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                            >
                                                                <option value={15}>15</option>
                                                                <option value={30}>30</option>
                                                                <option value={60}>60</option>
                                                                <option value={120}>120</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Language Settings */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                        <GlobeAltIcon className="w-5 h-5" />
                                                        Language & Region
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-700 dark:text-gray-300">Language</span>
                                                            <select
                                                                value={settings.language}
                                                                onChange={(e) => updateSetting('language', null, e.target.value)}
                                                                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                            >
                                                                <option value="en">English</option>
                                                                <option value="es">Spanish</option>
                                                                <option value="fr">French</option>
                                                                <option value="de">German</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-700 dark:text-gray-300">Timezone</span>
                                                            <select
                                                                value={settings.timezone}
                                                                onChange={(e) => updateSetting('timezone', null, e.target.value)}
                                                                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                            >
                                                                <option value="UTC">UTC</option>
                                                                <option value="EST">EST</option>
                                                                <option value="PST">PST</option>
                                                                <option value="GMT">GMT</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {user && (
                                <div className="relative">
                                    <button
                                        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                                        aria-label="User profile menu"
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                                            {user.imageUrl ? (
                                                <img
                                                    src={user.imageUrl}
                                                    alt={user.fullName || 'User'}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-indigo-600 font-medium">
                                                    {(user.fullName || 'User').charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                                            {user.fullName || 'User'}
                                        </span>
                                    </button>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {user.fullName || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user.primaryEmailAddress?.emailAddress}
                                                </p>
                                            </div>
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setShowProfileMenu(false);
                                                        setShowSettings(true);
                                                    }}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <UserCircleIcon className="w-4 h-4 mr-2" />
                                                    Profile Settings
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowProfileMenu(false);
                                                        updateSetting('security', 'twoFactor', !settings.security.twoFactor);
                                                    }}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <KeyIcon className="w-4 h-4 mr-2" />
                                                    Security
                                                </button>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main
                    className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 bg-gray-50 dark:bg-gray-900"
                    role="main"
                >
                    <div className="max-w-7xl w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    </>

}

export default Layout