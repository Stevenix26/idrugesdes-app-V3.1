'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const Navigation = () => {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
        if (!isLoaded || !user) return;

        const fetchUserRole = async () => {
            try {
                const response = await fetch('/api/test/users');
                if (!response.ok) throw new Error('Failed to fetch user data');
                const { currentUser } = await response.json();
                setUserRole(currentUser?.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, [user, isLoaded]);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Prescriptions', href: '/dashboard/prescriptions' },
        ...(userRole === 'PHARMACIST' ? [
            { name: 'Pharmacist Dashboard', href: '/dashboard/pharmacist' }
        ] : []),
        { name: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <nav className="space-y-1">
            {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`
                            group flex items-center px-3 py-2 text-sm font-medium rounded-md
                            ${isActive
                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                            }
                        `}
                    >
                        <span className="truncate">{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navigation; 