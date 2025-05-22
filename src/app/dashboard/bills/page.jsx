'use client';

import { useEffect, useState } from 'react';
import BillsList from '../components/BillsList';

export default function BillsPage() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await fetch('/api/bills');
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to fetch bills:', errorText);
                    throw new Error(errorText || 'Failed to fetch bills');
                }
                const data = await response.json();
                console.log('Fetched bills:', data); // Debug log
                setBills(data);
            } catch (err) {
                console.error('Error fetching bills:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!bills || bills.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="text-center py-12">
                        <p className="text-gray-500">No bills found</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <BillsList bills={bills} />
            </div>
        </div>
    );
} 