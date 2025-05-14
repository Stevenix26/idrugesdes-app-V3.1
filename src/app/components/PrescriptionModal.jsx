'use client';
import React from 'react';

const PrescriptionModal = ({ prescription, isOpen, onClose, onStatusChange }) => {
    if (!isOpen || !prescription) return null;

    const handleStatusChange = async (newStatus, declineReason = '') => {
        try {
            const response = await fetch(`/api/prescriptions/${prescription.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    declineReason: declineReason,
                }),
            });

            if (!response.ok) throw new Error('Failed to update status');
            onStatusChange(newStatus);
            onClose();
        } catch (error) {
            console.error('Error updating prescription status:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-indigo-900">Prescription Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="font-semibold">Patient Name:</p>
                        <p>{prescription.patientName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Doctor Name:</p>
                        <p>{prescription.doctorName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Medication:</p>
                        <p>{prescription.medication}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Phone Number:</p>
                        <p>{prescription.phoneNumber}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Request Date:</p>
                        <p>{prescription.createdAt.toString().slice(0, 10)}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Current Status:</p>
                        <p className={`badge badge-${prescription.status === 'approved' ? 'success' : prescription.status === 'rejected' ? 'error' : 'warning'}`}>
                            {prescription.status}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={() => handleStatusChange('approved')}
                        className="btn btn-success"
                        disabled={prescription.status === 'approved'}
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleStatusChange('rejected')}
                        className="btn btn-error"
                        disabled={prescription.status === 'rejected'}
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionModal;