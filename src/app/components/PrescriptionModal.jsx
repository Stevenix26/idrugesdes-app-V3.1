'use client';
import React, { useState, useEffect } from 'react';
import { XMarkIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { NotificationsContainer, NotificationTypes } from './Notifications';
import PrescriptionHistory from './PrescriptionHistory';
import { useUser } from '@clerk/nextjs';

const PrescriptionModal = ({ prescription, onClose, addNotification }) => {
    const { user, isLoaded } = useUser();
    const [showDeclineInput, setShowDeclineInput] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [auditLogs, setAuditLogs] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'h' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setShowHistory(prev => !prev);
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && prescription.status === 'PENDING') {
                e.preventDefault();
                if (!showDeclineInput) {
                    handleStatusUpdate('approved');
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, prescription.status, showDeclineInput]);

    useEffect(() => {
        const fetchAuditLogs = async () => {
            setIsLoadingHistory(true);
            try {
                const response = await fetch(`/api/prescriptions/${prescription.id}/audit`);
                if (!response.ok) throw new Error('Failed to fetch audit logs');
                const data = await response.json();
                setAuditLogs(data);
            } catch (error) {
                console.error('Error fetching audit logs:', error);
                addNotification({
                    type: NotificationTypes.ERROR,
                    title: 'Error',
                    message: 'Failed to load prescription history'
                });
            } finally {
                setIsLoadingHistory(false);
            }
        };

        if (showHistory) {
            fetchAuditLogs();
        }
    }, [showHistory, prescription.id]);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    if (!prescription) return null;

    const handleStatusUpdate = async (newStatus) => {
        setIsUpdating(true);
        setError('');

        try {
            const response = await fetch(`/api/prescriptions/${prescription.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    notes: notes.trim()
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update prescription status');
            }

            addNotification({
                type: NotificationTypes.SUCCESS,
                title: 'Success',
                message: `Prescription ${newStatus.toLowerCase()} successfully`
            });

            onClose();
        } catch (error) {
            console.error('Error updating prescription:', error);
            setError(error.message);
            addNotification({
                type: NotificationTypes.ERROR,
                title: 'Error',
                message: error.message
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRejectClick = () => {
        setShowDeclineInput(true);
        setError('');
    };

    const handleDeclineSubmit = (e) => {
        e.preventDefault();
        if (!declineReason.trim()) {
            setError('Please provide a reason for rejection');
            return;
        }
        handleStatusUpdate('rejected');
    };

    const handleCancelDecline = () => {
        setShowDeclineInput(false);
        setDeclineReason('');
        setError('');
    };

    const renderStatusButtons = () => {
        if (!isLoaded || !user) return null;

        return (
            <div className="mt-6 flex flex-col space-y-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Notes
                    </label>
                    <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any notes about this prescription..."
                    />
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => handleStatusUpdate('REJECTED')}
                        disabled={isUpdating}
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => handleStatusUpdate('APPROVED')}
                        disabled={isUpdating}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        Approve
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-md">
                                <div className="flex">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                            Error
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                            {error}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                                        Prescription Details
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowHistory(!showHistory)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        title="Toggle History (Ctrl/⌘ + H)"
                                    >
                                        <ClockIcon className="h-4 w-4 mr-1" />
                                        {showHistory ? 'Hide History' : 'Show History'}
                                    </button>
                                </div>

                                <div className="mt-4 space-y-4">
                                    {showHistory ? (
                                        <PrescriptionHistory
                                            auditLogs={auditLogs}
                                            isLoading={isLoadingHistory}
                                        />
                                    ) : (
                                        <>
                                            <div className="border-b dark:border-gray-700 pb-4">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h4>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${prescription.status === 'PENDING'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : prescription.status === 'APPROVED'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                    {prescription.status || 'PENDING'}
                                                </span>
                                            </div>

                                            <div className="border-b dark:border-gray-700 pb-4">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Patient Information</h4>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{prescription.patientName}</p>
                                            </div>

                                            <div className="border-b dark:border-gray-700 pb-4">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Doctor Information</h4>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{prescription.doctorName}</p>
                                            </div>

                                            <div className="border-b dark:border-gray-700 pb-4">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Medication</h4>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{prescription.medication}</p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Submission Date</h4>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {format(new Date(prescription.createdAt), 'PPpp')}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {showDeclineInput && (
                                        <div className="mt-4">
                                            <form onSubmit={handleDeclineSubmit}>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Reason for Rejection
                                                </label>
                                                <textarea
                                                    value={declineReason}
                                                    onChange={(e) => setDeclineReason(e.target.value)}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    rows="3"
                                                    placeholder="Please provide a reason for rejecting this prescription..."
                                                    required
                                                />
                                                <div className="mt-4 flex justify-end space-x-3">
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelDecline}
                                                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                                    >
                                                        {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {!showDeclineInput && prescription.status === 'PENDING' && (
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {renderStatusButtons()}
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                                onClick={onClose}
                                title="Close (Esc)"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <NotificationsContainer
                notifications={notifications}
                onClose={removeNotification}
            />
        </div>
    );
};

export default PrescriptionModal;