'use client'
import React, { useState, useEffect } from 'react';
import PrescriptionModal from '../modals/PrescriptionModal';

const fetchPrescriptions = async () => {
    const response = await fetch('/api/admin/prescriptions');
    if (!response.ok) throw new Error('Failed to fetch prescriptions');
    return response.json();
};

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const loadPrescriptions = () => {
        setLoading(true);
        fetchPrescriptions()
            .then(setPrescriptions)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadPrescriptions();
    }, []);

    const handleOpenModal = (prescription) => {
        setSelectedPrescription(prescription);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setSelectedPrescription(null);
        setModalOpen(false);
    };
    const handleStatusChange = () => {
        loadPrescriptions();
    };

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-bl from-slate-50 to-indigo-100 p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gradient-to-bl from-slate-50 to-indigo-100 p-6 flex items-center justify-center">
            <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-700 font-semibold">Error</p>
                <p className="text-red-600">{error}</p>
                <button
                    onClick={loadPrescriptions}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <section className="min-h-screen bg-gradient-to-bl from-slate-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-3 md:gap-4">
                        <h1 className="text-2xl md:text-4xl font-extrabold text-indigo-900 tracking-tight">Prescription Analytics</h1>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            <div className="bg-indigo-100 rounded-xl p-2 md:p-4 flex flex-col items-center shadow-md min-w-[90px]">
                                <span className="text-lg md:text-2xl font-bold text-indigo-700">{prescriptions.length}</span>
                                <span className="text-indigo-500 text-xs md:text-sm">Total Prescriptions</span>
                            </div>
                            <div className="bg-green-100 rounded-xl p-2 md:p-4 flex flex-col items-center shadow-md min-w-[90px]">
                                <span className="text-lg md:text-2xl font-bold text-green-700">{prescriptions.filter(p => p.status === 'approved').length}</span>
                                <span className="text-green-500 text-xs md:text-sm">Approved</span>
                            </div>
                            <div className="bg-yellow-100 rounded-xl p-2 md:p-4 flex flex-col items-center shadow-md min-w-[90px]">
                                <span className="text-lg md:text-2xl font-bold text-yellow-700">{prescriptions.filter(p => p.status === 'pending').length}</span>
                                <span className="text-yellow-500 text-xs md:text-sm">Pending</span>
                            </div>
                            <div className="bg-red-100 rounded-xl p-2 md:p-4 flex flex-col items-center shadow-md min-w-[90px]">
                                <span className="text-lg md:text-2xl font-bold text-red-700">{prescriptions.filter(p => p.status === 'rejected').length}</span>
                                <span className="text-red-500 text-xs md:text-sm">Rejected</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        {prescriptions.length === 0 ? (
                            <div className="text-center py-12 md:py-16 text-gray-400">No prescriptions found.</div>
                        ) : (
                            <table className="w-full min-w-[700px] table-auto text-xs md:text-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Prescription ID</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Patient Name</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Medication</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Phone Number</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Doctor Name</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Request Date</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Status</th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {prescriptions.map((prescription) => (
                                        <tr key={prescription.id} className="hover:bg-indigo-50 cursor-pointer transition">
                                            <td className="px-2 md:px-4 py-2 md:py-3 font-medium text-gray-900">{prescription.id}</td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">{prescription.patientName}</td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">{prescription.medication}</td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">{prescription.phoneNumber}</td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">{prescription.doctorName}</td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">{prescription.createdAt ? prescription.createdAt.toString().slice(0, 10) : ''}</td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${prescription.status === 'approved' ? 'bg-green-100 text-green-800' : prescription.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'} capitalize`}>
                                                    {prescription.status}
                                                </span>
                                            </td>
                                            <td className="px-2 md:px-4 py-2 md:py-3">
                                                <button
                                                    onClick={() => handleOpenModal(prescription)}
                                                    className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <PrescriptionModal
                prescription={selectedPrescription}
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onStatusChange={handleStatusChange}
            />
        </section>
    );
};

export default Prescriptions;

