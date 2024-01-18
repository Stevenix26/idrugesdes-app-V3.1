'use client'
// pages/index.js
// pages/index.js

import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { SubmitHandler, useForm } from "react-hook-form";
import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/navigation';


const prisma = new PrismaClient();


const PrescriptionPage = () => {

  const {
  register,
  handleSubmit,
  formState: { errors } } = useForm();
// on form submit
const handleFormSubmit = (values) => {
  console.log(values);
};


  // const [patientName, setPatientName] = useState('');
  // const [medication, setMedication] = useState('');
  // const [doctorName, setDoctorName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [prescriptionDate, setPrescriptionDate] = useState('');
  // const [uploadedPrescription, setUploadedPrescription] = useState(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  
  //   try {
  //     // Save the form data to the database using Prisma
  //     await db.prescription.create({
  //       data: {
  //         patientName,
  //         medication,
  //         doctorName,
  //         phoneNumber,
  //         prescriptionDate: new Date(prescriptionDate),
  //         uploadedPrescription: uploadedPrescription?.name || null,
  //       },
  //     });

  //     // Reset the form fields after successful submission
  //     setPatientName('');
  //     setMedication('');
  //     setDoctorName('');
  //     setPhoneNumber('');
  //     setPrescriptionDate('');
  //     setUploadedPrescription(null);


      //usingMutation Post

       const { mutate: createPost, isLoading} = useMutation({
      mutationFn:async (newPost) =>{
        return axios.post('/api/posts/creates', newPost);
      },
      onError:(error)=>{
        console.error(error);
      },
      onSuccess: ()=> {
        router.push('/dashboad');
        router.refresh();
        
      },
    });

      // Open the modal
      // openModal();
    
    // catch (error) {
    //   console.error('Error submitting prescription:', error);
    // }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-base-200">
      <div  className="w-full shadow-md card max-w-md p-8">
        <h2 className="mb-4 text-2xl font-bold text-center text-primary">Prescription Submission</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-sm font-semibold mb-2">Patient Name:</label>
            <input
            {...register("patientName", { required: true })}
            aria-invalid={errors.patientName ? "true" : "false"}
            type="text"
            placeholder="Type here"
            className="input input-primary w-full max-w-lg border" />
          {errors.patientName?.type === 'required' && <p className='text-red-600' role="alert">patient name is required</p>}
           
          </div>
          <div className="mb-4">
            <label htmlFor="medication" className="block text-sm font-semibold mb-2">Medication:</label>
                  <input
            {...register("medication", { required: true })}
            aria-invalid={errors.medication ? "true" : "false"}
            type="text"
            placeholder="Type here"
            className="input input-primary w-full max-w-lg border" />
          {errors.medication?.type === 'required' && <p className='text-red-600' role="alert">Title name is required</p>}
            {/* <input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            /> */}
          </div>
          <div className="mb-4">
            <label htmlFor="doctorName" className="block text-sm font-semibold mb-2">Doctor Name:</label>
                  <input
            {...register("doctorName", { required: true })}
            aria-invalid={errors.doctorName ? "true" : "false"}
            type="text"
            placeholder="Type here"
            className="input input-primary w-full max-w-lg border" />
          {errors.doctorName?.type === 'required' && <p className='text-red-600' role="alert">Title name is required</p>}
            {/* <input
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            /> */}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-2">Phone Number:</label>
                  <input
            {...register("phoneNumber", { required: true })}
            aria-invalid={errors.phoneNumber ? "true" : "false"}
            type="text"
            placeholder="Type here"
            className="input input-primary w-full max-w-lg border" />
          {errors.phoneNumber?.type === 'required' && <p className='text-red-600' role="alert">phoneNumber is required</p>}
            {/* <input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            /> */}
          </div>
          <div className="mb-4">
            <label htmlFor="prescriptionDate" className="block text-sm font-semibold mb-2">Prescription Date:</label>
                  <input
            {...register("prescriptionDate", { required: true })}
            aria-invalid={errors.prescriptionDate ? "true" : "false"}
            type="date"
            // placeholder="Type here"
            className="input input-primary w-full max-w-lg border" />
          {errors.title?.type === 'required' && <p className='text-red-600' role="alert">Title name is required</p>}
            {/* <input
              type="date"
              id="prescriptionDate"
              value={prescriptionDate}
              onChange={(e) => setPrescriptionDate(e.target.value)}
            /> */}
          </div>
          <div className="mb-4">
            <label htmlFor="uploadedPrescription" className="block text-sm font-semibold mb-2">Upload Prescription:</label>
                 <input
            {...register("uploadedPrescription", { required: true })}
            aria-invalid={errors.uploadedPrescription ? "true" : "false"}
            type="file"
            accept=".pdf, .jpg, .png"
            className="file-input file-input-bordered w-full max-w-lg border" />
          {errors.uploadedPrescription?.type === 'required' && <p className='text-red-600' role="alert">uploadedPrescription is required</p>}
            {/* <input
              type="file"
              id="uploadedPrescription"
              accept=".pdf, .jpg, .png"
              onChange={(e) => setUploadedPrescription(e.target.files[0])}
            /> */}
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Submit Prescription
          </button>
        </form>

        {/* NextUI Modal */}
        {/* <div open={isModalOpen} onClose={closeModal} className='modal' title="Prescription Submitted Successfully">
          <span>Your prescription has been successfully submitted.</span>
          <button onClick={closeModal} color="success">Close</button>
        </div> */}
      </div>
    </div>
  );
};

export default PrescriptionPage;
