'use client'
// pages/index.js

import { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();

const Page = () => {
  const [patientName, setPatientName] = useState('');
  const [medication, setMedication] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [uploadedPrescription, setUploadedPrescription] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the form data to the database using Prisma
      await prisma.prescription.create({
        data: {
          patientName,
          medication,
          doctorName,
          prescriptionDate: new Date(prescriptionDate),
          uploadedPrescription: uploadedPrescription?.name || null, // Save the file name or null if no file
        },
      });

      // Reset the form fields after successful submission
      setPatientName('');
      setMedication('');
      setDoctorName('');
      setPrescriptionDate('');
      setUploadedPrescription(null);

      // Handle success or navigation to a success page
      console.log('Prescription submitted successfully!');
    } catch (error) {
      // Handle error, show a message, or perform error logging
      console.error('Error submitting prescription:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className='card bg-rose-400  text-teal-900 p-8 rounded-lg shadow-lg'>
        <div className=" mb-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="animate-spin h-12 w-12 mx-auto"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4a7.963 7.963 0 01-5.657-2.343zm16-4.582A7.963 7.963 0 0120 12h4c0-6.627-5.373-12-12-12v4a7.963 7.963 0 015.657 2.343z"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-bold  text-center">Prescription Submission</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-sm font-semibold mb-2">Patient Name:</label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="medication" className="block  text-sm font-semibold mb-2">Medication:</label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="doctorName" className="block  text-sm font-semibold mb-2">Doctor Name:</label>
            <Input
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prescriptionDate" className="block  text-sm font-semibold mb-2">Prescription Date:</label>
            <Input
              type="date"
              id="prescriptionDate"
              value={prescriptionDate}
              onChange={(e) => setPrescriptionDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="uploadedPrescription" className="block  text-sm font-semibold mb-2">Upload Prescription:</label>
            <Input
              type="file"
              id="uploadedPrescription"
              accept=".pdf, .jpg, .png"
              onChange={(e) => setUploadedPrescription(e.target.files[0])}
            />
          </div>
           <Button color="white" variant="outlined" className="w-full bg-stone-300" as="button" type="submit">
            Submit Prescription
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
