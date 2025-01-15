"use client"
import React from 'react';
import { useMutation } from '@tanstack/react-query'; 
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const PrescriptionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // Define your mutation
  const { mutate: createPrescription, isLoading } = useMutation({
    mutationFn:  async (newPrescription) => {
      // Send a POST request to your backend API
      const response = await axios.post('../../api/prescription', newPrescription);
      return response.data; // Assuming your API returns data upon successful creation
    },
      onError: (error) => {
        console.error('Error:', error);
      },
      onSuccess: () => {
        router.push('/dashboard');
        router.refresh();
      },
});

  const handleFormSubmit = (values) => {
    console.log(values);

    // Call the mutation to post data to the backend
    createPrescription(values);
  };

  const notify = () => {
    toast.success('Prescription Submitted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      
    });
  };


  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-base-200">
      <div className="w-full shadow-md card max-w-md p-8">
        <h2 className="mb-4 text-2xl font-bold text-center text-primary">Prescription Submission</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* ... Your form fields ... */}
          
            <div className="mb-4">
              <label htmlFor="patientName" className="block text-sm font-semibold mb-2">Patient Name:</label>
              <input
                {...register("patientName", { required: true })}
                aria-invalid={errors.patientName ? "true" : "false"}
                type="text"
                placeholder="Type Your Full Name"
                className="input input-primary w-full max-w-lg border"
              />
              {errors.patientName?.type === 'required' && <p className='text-red-600' role="alert">Patient name is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="medication" className="block text-sm font-semibold mb-2">Medication:</label>
              <input
                {...register("medication", { required: true })}
                aria-invalid={errors.medication ? "true" : "false"}
                type="text"
                placeholder="Type here"
                className="input input-primary w-full max-w-lg border"
              />
              {errors.medication?.type === 'required' && <p className='text-red-600' role="alert">Medication is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="doctorName" className="block text-sm font-semibold mb-2">Doctor Name:</label>
              <input
                {...register("doctorName", { required: true })}
                aria-invalid={errors.doctorName ? "true" : "false"}
                type="text"
                placeholder="Type here"
                className="input input-primary w-full max-w-lg border"
              />
              {errors.doctorName?.type === 'required' && <p className='text-red-600' role="alert">Doctor name is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-2">Phone Number:</label>
              <input
                {...register("phoneNumber", { required: true })}
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                type="text"
                placeholder="Type your personal number"
                className="input input-primary w-full max-w-lg border"
              />
              {errors.phoneNumber?.type === 'required' && <p className='text-red-600' role="alert">Phone number is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="prescriptionDate" className="block text-sm font-semibold mb-2">Prescription Date:</label>
              <input
                {...register("prescriptionDate", { required: true })}
                aria-invalid={errors.prescriptionDate ? "true" : "false"}
                type="date"
                className="input input-primary w-full max-w-lg border"
              />
              {errors.prescriptionDate?.type === 'required' && <p className='text-red-600' role="alert">Prescription date is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="uploadedPrescription" className="block text-sm font-semibold mb-2">Upload Prescription:</label>
              <input
                {...register("uploadedPrescription", { required: true })}
                aria-invalid={errors.uploadedPrescription ? "true" : "false"}
                type="file"
                accept=".pdf, .jpg, .png"
                className="file-input file-input-bordered w-full max-w-lg border"
              />
              {errors.uploadedPrescription?.type === 'required' && <p className='text-red-600' role="alert">Uploaded prescription is required</p>}
            </div>
            <button type="submit" onClick={notify} className="w-full btn btn-primary">
              Submit Prescription
            </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}

            />
        </form>
      </div>
    </div>
  );
};

export default PrescriptionPage;
