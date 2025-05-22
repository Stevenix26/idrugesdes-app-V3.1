'use client';

import { useEffect, useState } from 'react';
import AdminBillsList from '../components/AdminBillsList';

export default function AdminBillsPage() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await fetch('/api/admin/bills/check');
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to fetch bills:', errorText);
                    throw new Error(errorText || 'Failed to fetch bills');
                }
                const data = await response.json();
                console.log('Fetched bills data:', data);
                setBills(data.bills || []);
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

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <AdminBillsList bills={bills} />
            </div>
        </div>
    );
} 