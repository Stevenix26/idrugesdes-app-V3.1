'use client';
import React, { useState, useEffect } from "react";

const statusColor = {
  approved: "success",
  pending: "warning",
  rejected: "error",
};

const statusBadgeStyles = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

const fetchPrescriptions = async () => {
  const response = await fetch("/api/prescriptions");
  if (!response.ok) throw new Error("Failed to fetch prescriptions");
  return response.json();
};

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    async function loadPrescriptions() {
      setLoading(true);
      try {
        const data = await fetchPrescriptions();
        setPrescriptions(data);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    loadPrescriptions();
  }, []);

  const handleRowClick = (prescription) => {
    setSelectedPrescription(prescription);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || prescription.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="w-full min-h-screen bg-gradient-to-bl from-orange-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-900">Prescriptions</h1>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Medication</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Doctor</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Decline Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="hover:bg-indigo-50 cursor-pointer" onClick={() => handleRowClick(prescription)}>
                      <td className="px-4 py-3">{prescription.id}</td>
                      <td className="px-4 py-3">{prescription.patientName}</td>
                      <td className="px-4 py-3">{prescription.medication}</td>
                      <td className="px-4 py-3">{prescription.phoneNumber}</td>
                      <td className="px-4 py-3">{prescription.doctorName}</td>
                      <td className="px-4 py-3">{typeof prescription.createdAt === 'string' ? prescription.createdAt.slice(0, 10) : new Date(prescription.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeStyles[statusColor[prescription.status]]}`}>{prescription.status}</span>
                      </td>
                      <td className="px-4 py-3">{prescription.declineReason || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {modalOpen && selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none">&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Prescription Details</h2>
            <div className="space-y-2">
              <div><span className="font-semibold text-gray-700">Patient:</span> {selectedPrescription.patientName}</div>
              <div><span className="font-semibold text-gray-700">Doctor:</span> {selectedPrescription.doctorName}</div>
              <div><span className="font-semibold text-gray-700">Medication:</span> {selectedPrescription.medication}</div>
              <div><span className="font-semibold text-gray-700">Phone:</span> {selectedPrescription.phoneNumber}</div>
              <div><span className="font-semibold text-gray-700">Date:</span> {typeof selectedPrescription.createdAt === 'string' ? selectedPrescription.createdAt.slice(0, 10) : new Date(selectedPrescription.createdAt).toLocaleDateString()}</div>
              <div><span className="font-semibold text-gray-700">Status:</span> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeStyles[statusColor[selectedPrescription.status]]}`}>{selectedPrescription.status}</span></div>
              <div><span className="font-semibold text-gray-700">Decline Reason:</span> {selectedPrescription.declineReason || '-'}</div>
              {selectedPrescription.prescriptionFilePath && (
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Prescription Image:</span>
                  <div className="mt-2">
                    <img src={selectedPrescription.prescriptionFilePath} alt="Prescription" className="max-w-full max-h-60 rounded shadow" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={closeModal} className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Prescriptions;

