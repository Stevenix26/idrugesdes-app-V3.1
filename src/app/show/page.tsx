'use client'
import React, { useState, useEffect } from 'react';

const PrescriptionTable: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(0);
  const [reasonForRejection, setReasonForRejection] = useState('');
  const [alternativeMedication, setAlternativeMedication] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('api/prescriptions');
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleModal = (prescriptionId) => {
    setSelectedPrescriptionId(prescriptionId);
    setShowModal(true);
  };

  const handleAccept = (prescriptionId) => {
    // Accept prescription logic here
  };

  const handleReject = () => {
    // Reject prescription logic here, use selectedPrescriptionId and reasonForRejection
    setShowModal(false);
  };

  const handleAlternativeMedication = () => {
    // Send alternative medication logic here, use selectedPrescriptionId and alternativeMedication
    setShowModal(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Medication</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.patientName}</td>
              <td>{prescription.doctorName}</td>
              <td>{prescription.medication}</td>
              <td>
                <button onClick={() => handleAccept(prescription.id)}>Accept</button>
                <button onClick={() => handleModal(prescription.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>×</span>
            {reasonForRejection && (
              <div>
                <h2>Provide Reason for Rejection</h2>
                <input type="text" value={reasonForRejection} onChange={(e) => setReasonForRejection(e.target.value)} />
                <button onClick={handleReject}>Submit</button>
              </div>
            )}
            {alternativeMedication && (
              <div>
                <h2>Provide Drug Alternative</h2>
                <input type="text" value={alternativeMedication} onChange={(e) => setAlternativeMedication(e.target.value)} />
                <button onClick={handleAlternativeMedication}>Submit</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionTable;