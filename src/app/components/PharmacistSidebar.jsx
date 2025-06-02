import React from 'react';
import {
    ClipboardDocumentCheckIcon,
    ClockIcon,
    XCircleIcon,
    CheckCircleIcon,
    ChartBarIcon,
    CalendarIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PharmacistSidebar = ({ stats }) => {
    const pathname = usePathname();

    const navigation = [
        {
            name: 'Dashboard Overview',
            href: '/pharmacist',
            icon: ChartBarIcon
        },
        {
            name: 'Store Management',
            href: '/pharmacist/store',
            icon: BuildingStorefrontIcon
        },
        {
            name: 'Pending Reviews',
            href: '/pharmacist/prescriptions?filter=pending',
            icon: ClockIcon,
            count: stats?.pending || 0,
            highlight: true
        },
        {
            name: 'Approved Prescriptions',
            href: '/pharmacist/prescriptions?filter=approved',
            icon: CheckCircleIcon,
            count: stats?.approved || 0
        },
        {
            name: 'Rejected Prescriptions',
            href: '/pharmacist/prescriptions?filter=rejected',
            icon: XCircleIcon,
            count: stats?.rejected || 0
        },
        {
            name: "Today&apos;s Queue",
            href: '/pharmacist/prescriptions?filter=today',
            icon: CalendarIcon,
            count: stats?.todayCount || 0
        },
        {
            name: 'Patient Records',
            href: '/pharmacist/patients',
            icon: UserGroupIcon
        },
        {
            name: 'Settings',
            href: '/pharmacist/settings',
            icon: Cog6ToothIcon
        },
    ];

    return (
        <div className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg">
            <div className="p-4">
                <div className="flex items-center space-x-2 mb-6">
                    <ClipboardDocumentCheckIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Pharmacist Portal
                    </h2>
                </div>

                {/* Quick Stats */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Quick Overview
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Pending</span>
                            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                                {stats?.pending || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Today&apos;s Queue</span>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {stats?.todayCount || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Total Processed</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {(stats?.approved || 0) + (stats?.rejected || 0)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href.split('?')[0];
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center px-3 py-2 text-sm font-medium rounded-md
                                    ${isActive
                                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                                    }
                                    ${item.highlight && !isActive ? 'border border-yellow-200 dark:border-yellow-900' : ''}
                                `}
                            >
                                <item.icon
                                    className={`
                                        mr-3 h-5 w-5
                                        ${isActive
                                            ? 'text-indigo-500 dark:text-indigo-400'
                                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                                        }
                                    `}
                                />
                                <span className="flex-1">{item.name}</span>
                                {item.count !== undefined && (
                                    <span className={`
                                        ml-2 px-2 py-0.5 text-xs rounded-full
                                        ${isActive
                                            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-200'
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                        }
                                    `}>
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default PharmacistSidebar; 