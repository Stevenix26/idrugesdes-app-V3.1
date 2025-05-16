'use client'
import React, { useState, useEffect } from 'react';
import PrescriptionModal from '../../components/PrescriptionModal';

const fetchPrescriptions = async () => {
    const response = await fetch('/api/prescriptions');
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

    if (loading) return <div className="p-8 text-center">Loading prescriptions...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div>
            <section>
                <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
                    <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
                        <div className="w-full max-w-6xl flex-grow pt-10">
                            <h1 className="text-3xl font-bold mb-6">Prescriptions</h1>
                            <div className="relative mb-10 mt-6 shadow-xl rounded-lg overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr className="bg-base-300 border-b-0 font-bold">
                                            <th>Prescription ID</th>
                                            <th>Patient Name</th>
                                            <th>Medication</th>
                                            <th>Phone Number</th>
                                            <th>Doctor Name</th>
                                            <th>Request Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptions.map((prescription) => (
                                            <tr key={prescription.id} className="hover:bg-base-200 transition">
                                                <td>{prescription.id}</td>
                                                <td>{prescription.patientName}</td>
                                                <td>{prescription.medication}</td>
                                                <td>{prescription.phoneNumber}</td>
                                                <td>{prescription.doctorName}</td>
                                                <td>{prescription.createdAt ? prescription.createdAt.toString().slice(0, 10) : ''}</td>
                                                <td>
                                                    <span className={`badge ${prescription.status === 'approved' ? 'badge-success' : prescription.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>{prescription.status}</span>
                                                </td>
                                                <td className="flex gap-2">
                                                    <button className="btn btn-info btn-xs" onClick={() => handleOpenModal(prescription)}>
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
        </div>
    );
};

export default Prescriptions;

