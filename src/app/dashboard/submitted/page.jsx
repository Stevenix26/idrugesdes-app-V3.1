// pages/submitted.js
'use client'
import { useEffect, useState } from 'react';
import { db } from '../../../lib/db';
// import { Modal } from '@mui/material';
// Update the path based on your project structure

async function getPrescription() {
  const response = await db.prescription.findMany({
    select: {
      id: true,
      patientName: true,
      medication: true,
      doctorName: true,
      phoneNumber: true,
      prescriptionDate: true,
      prescriptionFilePath: true,
      status: true,
      declineReason: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return response;
}


const Submitted = () => {
  const prescriptioning = getPrescription();
  const [prescriptions, setPrescriptions] = useState(prescriptioning);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
 

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Fetch all prescriptions from the database using Db
        const data = await db.prescription.findMany(
        );
        setPrescriptions(data);
      } catch (error) {
        // Handle error, show a message, or perform error logging
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handlePreview = (prescription) => {
    setSelectedPrescription(prescription);
    setIsPreviewModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      // Delete the selected prescription from the database using Db
      await db.prescription.delete({
        where: { id },
      });

      // Update the prescriptions list after deletion
      const updatedPrescriptions = prescriptions.filter((prescription) => prescription.id !== id);
      setPrescriptions(updatedPrescriptions);

      console.log('Prescription deleted successfully!');
    } catch (error) {
      // Handle error, show a message, or perform error logging
      console.error('Error deleting prescription:', error);
    }
  };

  return (
    <div className="min-h-screen p-3 flex items-center bg-stripe-gradient justify-center">
      <div className="card bg-pharmacy-primary-800 p-8 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-dark text-center">Submitted Prescriptions</h2>
        {prescriptions.length > 0 ? (
          <table className=' bordered hover responsive striped' >
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Medication</th>
                <th>Doctor Name</th>
                <th>Prescription Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.id}>
                  <td>{prescription.patientName}</td>
                  <td>{prescription.medication}</td>
                  <td>{prescription.doctorName}</td>
                  <td>{prescription.prescriptionDate.toDateString()}</td>
                  <td>
                    <button color="success" variant="outlined" className="mr-2 btn btn-success" onClick={() => handlePreview(prescription)}>
                      Preview
                    </button>
                    <button color="error" variant="outlined btn btn-danger" onClick={() => handleDelete(prescription.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-dark text-center">No prescriptions submitted yet.</p>
        )}
        <button  className="mt-4 btn btn-sm btn-outline " href="/dashboard/prescription">
          Back to Submission Page
        </button>
      </div>
      
      <div className='modal modal-action' visible={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
        {selectedPrescription && (
          <div className="p-3">
            <h2 className="mb-4 text-2xl font-bold">Prescription Preview</h2>
            <p><strong>Patient Name:</strong> {selectedPrescription.patientName}</p>
            <p><strong>Medication:</strong> {selectedPrescription.medication}</p>
            <p><strong>Doctor Name:</strong> {selectedPrescription.doctorName}</p>
            <p><strong>Prescription Date:</strong> {selectedPrescription.prescriptionDate.toDateString()}</p>
            {selectedPrescription.uploadedPrescription && (
              <p><strong>Uploaded Prescription:</strong> {selectedPrescription.uploadedPrescription}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



// export async function getServerSideProps() {
//   try {
//     // Fetch prescriptions data on the server side
//     const prescriptions = await getPrescription();
//     return {
//       props: { prescriptions }
//     };
//   } catch (error) {
//     console.error('Error fetching prescriptions:', error);
//     return {
//       props: { prescriptions: [] }
//     };
//   }
// }



export default Submitted;


