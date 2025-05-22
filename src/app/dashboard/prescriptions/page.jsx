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
    ArrowPathIcon,
    ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';

const PrescriptionsPage = () => {
    const { user, isLoaded: isUserLoaded } = useUser();
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [filters, setFilters] = useState({
        status: 'all',
        date: 'all',
        sortBy: 'date',
        order: 'desc'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);

    useEffect(() => {
        if (!isUserLoaded || !user) return;

        const fetchUserRole = async () => {
            try {
                const response = await fetch('/api/test/users');
                if (!response.ok) throw new Error('Failed to fetch user data');
                const { currentUser } = await response.json();
                setUserRole(currentUser?.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
                addNotification({
                    type: NotificationTypes.ERROR,
                    title: 'Error',
                    message: 'Failed to load user role'
                });
            }
        };

        fetchUserRole();
    }, [user, isUserLoaded]);

    useEffect(() => {
        if (!userRole) return;
        fetchPrescriptions();
    }, [userRole]);

    useEffect(() => {
        let refreshInterval;
        if (autoRefresh) {
            refreshInterval = setInterval(() => {
                fetchPrescriptions();
            }, 30000); // Refresh every 30 seconds
        }
        return () => clearInterval(refreshInterval);
    }, [autoRefresh]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Ctrl/Cmd + R to refresh
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                handleRefresh();
            }
            // Ctrl/Cmd + F to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('search-prescriptions').focus();
            }
            // Esc to clear search and close modal
            if (e.key === 'Escape') {
                if (searchTerm) {
                    setSearchTerm('');
                } else if (selectedPrescription) {
                    setSelectedPrescription(null);
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [searchTerm, selectedPrescription]);

    const fetchPrescriptions = async () => {
        setIsLoading(true);
        try {
            let endpoint = '/api/prescriptions';

            // Add role-specific endpoints
            if (userRole === 'DOCTOR') {
                endpoint = '/api/prescriptions/doctor';
            } else if (userRole === 'PHARMACIST') {
                endpoint = '/api/prescriptions/pharmacist';
            } else if (userRole === 'PATIENT') {
                endpoint = '/api/prescriptions/patient';
            }

            const response = await fetch(endpoint);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch prescriptions');
            }
            const data = await response.json();

            // Transform the data to match the component's expected format
            const transformedPrescriptions = data.map(prescription => ({
                id: prescription.id,
                patientName: prescription.patient?.name || prescription.patientName,
                patientId: prescription.patient?.id || prescription.patientId,
                doctorName: prescription.doctorName,
                doctorId: prescription.doctorId,
                medication: prescription.medications?.map(med => med.name).join(', ') || prescription.medication,
                status: prescription.status,
                createdAt: prescription.createdAt,
                prescriptionFilePath: prescription.prescriptionFilePath,
                phoneNumber: prescription.patient?.phoneNumber || prescription.phoneNumber,
                dosage: prescription.dosage,
                frequency: prescription.frequency,
                duration: prescription.duration,
                notes: prescription.notes,
                declineReason: prescription.declineReason,
                updatedAt: prescription.updatedAt,
                pharmacistId: prescription.pharmacistId,
                pharmacistName: prescription.pharmacist?.name
            }));

            setPrescriptions(transformedPrescriptions);
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
        return prescriptions
            .filter(prescription => {
                const matchesStatus = filters.status === 'all' || prescription.status === filters.status;
                const matchesSearch = searchTerm === '' ||
                    prescription.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prescription.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prescription.medication?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prescription.pharmacistName?.toLowerCase().includes(searchTerm.toLowerCase());

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
                        case 'quarter':
                            matchesDate = daysDiff <= 90;
                            break;
                        case 'year':
                            matchesDate = daysDiff <= 365;
                            break;
                    }
                }

                return matchesStatus && matchesSearch && matchesDate;
            })
            .sort((a, b) => {
                const dateA = new Date(filters.sortBy === 'date' ? a.createdAt : a.updatedAt);
                const dateB = new Date(filters.sortBy === 'date' ? b.createdAt : b.updatedAt);
                return filters.order === 'desc' ? dateB - dateA : dateA - dateB;
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

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchPrescriptions();
        setIsRefreshing(false);
    };

    const getPrescriptionStats = () => {
        const total = prescriptions.length;
        const pending = prescriptions.filter(p => p.status === 'PENDING').length;
        const approved = prescriptions.filter(p => p.status === 'APPROVED').length;
        const rejected = prescriptions.filter(p => p.status === 'REJECTED').length;
        const hasImage = prescriptions.filter(p => p.prescriptionFilePath).length;

        return { total, pending, approved, rejected, hasImage };
    };

    if (!isUserLoaded) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-lg text-gray-600 dark:text-gray-400">Please sign in to view prescriptions</p>
            </div>
        );
    }

    if (!userRole) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Loading user information...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {userRole === 'PHARMACIST' ? 'Manage Prescriptions' :
                            userRole === 'DOCTOR' ? 'Prescribed Medications' :
                                'My Prescriptions'}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {userRole === 'PHARMACIST' ? 'Review and process prescription requests' :
                            userRole === 'DOCTOR' ? 'View and manage your prescribed medications' :
                                'View and track your prescription history'}
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleRefresh}
                        className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isRefreshing}
                    >
                        <ArrowPathIcon className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="autoRefresh"
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="autoRefresh" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Auto-refresh
                        </label>
                    </div>
                </div>
            </div>

            {/* Statistics section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Prescriptions</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{getPrescriptionStats().total}</dd>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Review</dt>
                        <dd className="mt-1 text-3xl font-semibold text-yellow-600 dark:text-yellow-400">{getPrescriptionStats().pending}</dd>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Approved</dt>
                        <dd className="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">{getPrescriptionStats().approved}</dd>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Rejected</dt>
                        <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">{getPrescriptionStats().rejected}</dd>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">With Images</dt>
                        <dd className="mt-1 text-3xl font-semibold text-blue-600 dark:text-blue-400">{getPrescriptionStats().hasImage}</dd>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        id="search-prescriptions"
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search prescriptions... (Ctrl/⌘ + F)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search prescriptions"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            aria-label="Filter by status"
                        >
                            <option value="all">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" aria-hidden="true">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={filters.date}
                            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                            aria-label="Filter by date"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="quarter">Last 90 Days</option>
                            <option value="year">Last Year</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" aria-hidden="true">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            aria-label="Sort by"
                        >
                            <option value="date">Sort by Creation Date</option>
                            <option value="updated">Sort by Last Updated</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" aria-hidden="true">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <button
                        onClick={() => setFilters(prev => ({ ...prev, order: prev.order === 'desc' ? 'asc' : 'desc' }))}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                        aria-label={filters.order === 'desc' ? 'Sort descending' : 'Sort ascending'}
                    >
                        {filters.order === 'desc' ? '↓ Newest First' : '↑ Oldest First'}
                    </button>
                </div>
            </div>

            {/* Keyboard shortcuts help */}
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Keyboard shortcuts:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Ctrl/⌘ + F: Focus search</li>
                    <li>Ctrl/⌘ + R: Refresh list</li>
                    <li>Esc: Clear search or close modal</li>
                </ul>
            </div>

            {isLoading ? (
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                    <div className="animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : filterPrescriptions().length === 0 ? (
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center py-12">
                        <ClipboardDocumentIcon className="h-12 w-12 text-gray-400 mb-4" />
                        {searchTerm || filters.status !== 'all' || filters.date !== 'all' ? (
                            <>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching prescriptions</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({
                                            status: 'all',
                                            date: 'all',
                                            sortBy: 'date',
                                            order: 'desc'
                                        });
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Clear all filters
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No prescriptions found</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {userRole === 'PATIENT' ? "You don't have any prescriptions yet" :
                                        userRole === 'DOCTOR' ? "You haven't prescribed any medications yet" :
                                            "No prescriptions to review at the moment"}
                                </p>
                            </>
                        )}
                    </div>
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
                                                {prescription.pharmacistName && (
                                                    <span className="ml-2 text-gray-500">
                                                        • Reviewed by {prescription.pharmacistName}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                                                {prescription.status}
                                            </span>
                                            {prescription.prescriptionFilePath && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    Has Image
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex flex-col">
                                            <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-medium">Medication:</span> {prescription.medication}
                                            </p>
                                            {prescription.dosage && (
                                                <p className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-medium">Dosage:</span> {prescription.dosage}
                                                    {prescription.frequency && ` • ${prescription.frequency}`}
                                                    {prescription.duration && ` • ${prescription.duration}`}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                            <p>
                                                Submitted on{' '}
                                                {format(new Date(prescription.createdAt), 'MMM d, yyyy')}
                                                {prescription.updatedAt && prescription.updatedAt !== prescription.createdAt && (
                                                    <span className="ml-2 text-gray-400">
                                                        • Updated {format(new Date(prescription.updatedAt), 'MMM d, yyyy')}
                                                    </span>
                                                )}
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