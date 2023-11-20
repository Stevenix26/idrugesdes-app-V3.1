'use client'
import { useState } from 'react';
 // Import Bootstrap CSS


const PrescriptionPage = () => {
  const [patientName, setPatientName] = useState('');
  const [medication, setMedication] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [uploadedPrescription, setUploadedPrescription] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission...

    // Reset the form fields after submission
    setPatientName('');
    setMedication('');
    setDoctorName('');
    setPrescriptionDate('');
    setUploadedPrescription(null);
  };

  return (
    <div className="container mt-5 ">
    <div className='card'>
    <div className='card-body needs-validatio'>
      <h2 className="mb-4 font">Prescription Submission</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientName"  className="form-label">Patient Name:</label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="medication" className="form-label">Medication:</label>
          <input
            type="text"
            className="form-control"
            id="medication"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="doctorName" className="form-label">Doctor Name:</label>
          <input
            type="text"
            className="form-control"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prescriptionDate" className="form-label">Prescription Date:</label>
          <input
            type="date"
            className="form-control"
            id="prescriptionDate"
            value={prescriptionDate}
            onChange={(e) => setPrescriptionDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="uploadedPrescription" className="form-label">Upload Prescription:</label>
          <input
            type="file"
            className="form-control"
            id="uploadedPrescription"
            accept=".pdf, .jpg, .png"
            onChange={(e) => setUploadedPrescription(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-outline-light">Submit Prescription</button>
      </form>
      
      </div>
      </div>
    </div>
  );
};

export default PrescriptionPage


