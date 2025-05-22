'use client'
import React, { useState } from 'react';
import { XMarkIcon, CheckIcon, XCircleIcon, DocumentMagnifyingGlassIcon, ArrowPathIcon, ReceiptPercentIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import BillingForm from '../components/BillingForm';

const PrescriptionModal = ({ prescription, isOpen, onClose, onStatusChange }) => {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showBillingForm, setShowBillingForm] = useState(false);

    if (!isOpen || !prescription) return null;

    const handleStatusUpdate = async (newStatus) => {
        try {
            if (newStatus === 'rejected') {
                if (!rejectionReason.trim()) {
                    setError('Please provide a reason for rejection');
                    return;
                }
            }

            setUpdating(true);
            setError(null);

            const response = await fetch(`/api/admin/prescriptions/${prescription.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    declineReason: newStatus === 'rejected' ? rejectionReason : null
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to update prescription status');
            }

            onStatusChange();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleBillSubmit = async (billData) => {
        try {
            const response = await fetch('/api/admin/bills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to create bill');
            }

            onStatusChange();
        } catch (err) {
            throw new Error(err.message || 'Failed to create bill');
        }
    };

    const handleReject = () => {
        setIsRejecting(true);
        setError(null);
    };

    const handleCancelReject = () => {
        setIsRejecting(false);
        setRejectionReason('');
        setError(null);
    };

    const renderStatusBadge = (status) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const ImagePreviewModal = () => {
        if (!showImageModal) return null;

        return (
            <div className="fixed inset-0 z-[60] overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                        onClick={() => setShowImageModal(false)}></div>
                    <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4">
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="relative w-full h-[80vh]">
                            {prescription.prescriptionFilePath ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={prescription.prescriptionFilePath}
                                        alt="Prescription"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        className="rounded-lg"
                                        onError={() => setImageError(true)}
                                        priority
                                    />
                                    {imageError && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                                            <p className="text-gray-500">Failed to load image</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                    <p className="text-gray-500">No prescription image available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-6 transform transition-all">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Prescription Details
                                </h3>
                                {renderStatusBadge(prescription.status)}
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                ID: {prescription.id}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            {/* Prescription Image Section */}
                            {prescription.prescriptionFilePath && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Image</label>
                                    <button
                                        onClick={() => {
                                            setImageError(false);
                                            setShowImageModal(true);
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <DocumentMagnifyingGlassIcon className="h-5 w-5 mr-2 text-gray-500" />
                                        View Prescription Image
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                                    <p className="mt-1 text-gray-900">{prescription.patientName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <p className="mt-1 text-gray-900">{prescription.phoneNumber}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
                                    <p className="mt-1 text-gray-900">{prescription.doctorName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Request Date</label>
                                    <p className="mt-1 text-gray-900">
                                        {prescription.createdAt ? new Date(prescription.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Medication</label>
                                <p className="mt-1 text-gray-900">{prescription.medication}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                                <p className="mt-1 text-gray-900">{prescription.notes || 'No notes provided'}</p>
                            </div>

                            {prescription.status === 'rejected' && prescription.declineReason && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                                    <p className="mt-1 text-gray-900">{prescription.declineReason}</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <div className="flex">
                                        <XCircleIcon className="h-5 w-5 text-red-400" />
                                        <p className="ml-3 text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Status Actions */}
                            <div className="mt-6 space-y-4">
                                {!isRejecting ? (
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {prescription.status !== 'approved' && (
                                            <button
                                                onClick={() => handleStatusUpdate('approved')}
                                                disabled={updating}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <CheckIcon className="h-5 w-5 mr-2" />
                                                Approve Prescription
                                            </button>
                                        )}
                                        {prescription.status !== 'rejected' && (
                                            <button
                                                onClick={handleReject}
                                                disabled={updating}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <XMarkIcon className="h-5 w-5 mr-2" />
                                                Reject Prescription
                                            </button>
                                        )}
                                        {prescription.status !== 'pending' && (
                                            <button
                                                onClick={() => handleStatusUpdate('pending')}
                                                disabled={updating}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ArrowPathIcon className="h-5 w-5 mr-2" />
                                                Reset to Pending
                                            </button>
                                        )}
                                        {prescription.status === 'approved' && !prescription.bill && (
                                            <button
                                                onClick={() => setShowBillingForm(true)}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <ReceiptPercentIcon className="h-5 w-5 mr-2" />
                                                Create Bill
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">
                                                Rejection Reason
                                            </label>
                                            <textarea
                                                id="rejectionReason"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Please provide a reason for rejection..."
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={() => handleStatusUpdate('rejected')}
                                                disabled={updating}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Confirm Rejection
                                            </button>
                                            <button
                                                onClick={handleCancelReject}
                                                disabled={updating}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ImagePreviewModal />
            {showBillingForm && (
                <BillingForm
                    prescription={prescription}
                    onClose={() => setShowBillingForm(false)}
                    onSubmit={handleBillSubmit}
                />
            )}
        </>
    );
};

export default PrescriptionModal; 