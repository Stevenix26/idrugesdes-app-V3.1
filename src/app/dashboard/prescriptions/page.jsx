'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { NotificationsContainer, NotificationTypes } from '@/app/components/Notifications';
import PrescriptionModal from '@/app/components/PrescriptionModal';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

const PrescriptionsPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [filters, setFilters] = useState({
        status: 'all',
        date: 'all',
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/prescriptions');
            if (!response.ok) throw new Error('Failed to fetch prescriptions');
            const data = await response.json();
            setPrescriptions(data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            addNotification({
                type: NotificationTypes.ERROR,
                title: 'Error',
                message: 'Failed to load prescriptions'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const addNotification = (notification) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...notification, id }]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const handlePrescriptionClick = (prescription) => {
        setSelectedPrescription(prescription);
    };

    const handleModalClose = () => {
        setSelectedPrescription(null);
        fetchPrescriptions(); // Refresh the list after modal closes
    };

    const filterPrescriptions = () => {
        return prescriptions.filter(prescription => {
            const matchesStatus = filters.status === 'all' || prescription.status === filters.status;
            const matchesSearch = searchTerm === '' ||
                prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prescription.medication.toLowerCase().includes(searchTerm.toLowerCase());

            let matchesDate = true;
            if (filters.date !== 'all') {
                const prescriptionDate = new Date(prescription.createdAt);
                const today = new Date();
                const daysDiff = Math.floor((today - prescriptionDate) / (1000 * 60 * 60 * 24));

                switch (filters.date) {
                    case 'today':
                        matchesDate = daysDiff === 0;
                        break;
                    case 'week':
                        matchesDate = daysDiff <= 7;
                        break;
                    case 'month':
                        matchesDate = daysDiff <= 30;
                        break;
                }
            }

            return matchesStatus && matchesSearch && matchesDate;
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'APPROVED':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'REJECTED':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Prescriptions</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Manage and review prescription requests
                </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search prescriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="all">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={filters.date}
                            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filterPrescriptions().map((prescription) => (
                            <li
                                key={prescription.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                                onClick={() => handlePrescriptionClick(prescription)}
                            >
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                                                {prescription.patientName}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                Prescribed by {prescription.doctorName}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                                                {prescription.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                {prescription.medication}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                            <p>
                                                Submitted on{' '}
                                                {format(new Date(prescription.createdAt), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedPrescription && (
                <PrescriptionModal
                    prescription={selectedPrescription}
                    onClose={handleModalClose}
                />
            )}

            <NotificationsContainer
                notifications={notifications}
                onClose={removeNotification}
            />
        </div>
    );
};

export default PrescriptionsPage; 