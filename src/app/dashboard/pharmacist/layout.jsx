'use client';

import React from 'react';
import PharmacistSidebar from '@/app/components/PharmacistSidebar';

const PharmacistLayout = ({ children }) => {
    // Extract stats from children if available
    const childStats = React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type.name === 'PharmacistDashboard') {
            return child.props.stats;
        }
        return null;
    })?.[0];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="flex-none">
                <PharmacistSidebar stats={childStats} />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="container mx-auto px-4 py-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PharmacistLayout; 