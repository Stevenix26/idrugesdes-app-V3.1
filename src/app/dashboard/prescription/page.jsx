"use client"
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, DocumentIcon } from '@heroicons/react/24/outline';

const PrescriptionPage = () => {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchedFields = watch();

  const router = useRouter();

  // Define your mutation
  const { mutate: createPrescription, isLoading } = useMutation({
    mutationFn: async (newPrescription) => {
      try {
        const response = await axios.post('/api/prescriptions', newPrescription, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(error.response.data.message || 'Failed to submit prescription');
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error('No response from server. Please try again.');
        } else {
          // Something happened in setting up the request
          throw new Error('Error submitting prescription. Please try again.');
        }
      }
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      toast.error(error.message || 'Failed to submit prescription', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    },
    onSuccess: (data) => {
      toast.success('Prescription submitted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      router.push('/dashboard');
      router.refresh();
    },
  });

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("patientName", values.patientName);
    formData.append("medication", values.medication);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("doctorName", values.doctorName);
    formData.append("prescriptionDate", values.prescriptionDate);
    if (values.uploadedPrescription && values.uploadedPrescription[0]) {
      formData.append("uploadedPrescription", values.uploadedPrescription[0]);
    }
    createPrescription(formData);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-primary/5 to-base-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full shadow-lg card max-w-4xl p-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Prescription Submission</h2>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${step === i ? 'bg-primary' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">

            {step === 1 && (
              <>
                <div className="form-control">
                  <label htmlFor="patientName" className="label">
                    <span className="label-text font-semibold">Patient Name</span>
                  </label>
                  <input
                    {...register("patientName", { required: "Patient name is required" })}
                    type="text"
                    placeholder="Enter your full name"
                    className={`input input-bordered w-full ${errors.patientName ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.patientName && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.patientName.message}</span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="medication" className="label">
                    <span className="label-text font-semibold">Medication</span>
                  </label>
                  <input
                    {...register("medication", { required: "Medication is required" })}
                    type="text"
                    placeholder="Enter prescribed medication"
                    className={`input input-bordered w-full ${errors.medication ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.medication && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.medication.message}</span>
                    </label>
                  )}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-control">
                  <label htmlFor="doctorName" className="label">
                    <span className="label-text font-semibold">Doctor Name</span>
                  </label>
                  <input
                    {...register("doctorName", { required: "Doctor name is required" })}
                    type="text"
                    placeholder="Enter doctor's name"
                    className={`input input-bordered w-full ${errors.doctorName ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.doctorName && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.doctorName.message}</span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text font-semibold">Phone Number</span>
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                      }
                    })}
                    type="tel"
                    placeholder="Enter your phone number"
                    className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.phoneNumber && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.phoneNumber.message}</span>
                    </label>
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-control">
                  <label htmlFor="prescriptionDate" className="label">
                    <span className="label-text font-semibold">Prescription Date</span>
                  </label>
                  <input
                    {...register("prescriptionDate", { required: "Prescription date is required" })}
                    type="date"
                    className={`input input-bordered w-full ${errors.prescriptionDate ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.prescriptionDate && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.prescriptionDate.message}</span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="uploadedPrescription" className="label">
                    <span className="label-text font-semibold">Upload Prescription</span>
                  </label>
                  <input
                    {...register("uploadedPrescription", { required: "Prescription file is required" })}
                    type="file"
                    accept=".pdf, .jpg, .png"
                    onChange={handleFileChange}
                    className={`file-input file-input-bordered w-full ${errors.uploadedPrescription ? 'file-input-error' : 'file-input-primary'}`}
                  />
                  {errors.uploadedPrescription && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.uploadedPrescription.message}</span>
                    </label>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="btn btn-outline btn-primary gap-2">
                  <ChevronLeftIcon className="w-5 h-5" /> Previous
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="btn btn-primary gap-2 ml-auto">
                  Next <ChevronRightIcon className="w-5 h-5" />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary gap-2 ml-auto">
                  Submit Prescription <DocumentIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Preview Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-medium">{watchedFields.patientName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Medication</p>
                <p className="font-medium">{watchedFields.medication || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor Name</p>
                <p className="font-medium">{watchedFields.doctorName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{watchedFields.phoneNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prescription Date</p>
                <p className="font-medium">{watchedFields.prescriptionDate || 'Not provided'}</p>
              </div>
              {preview && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Uploaded Prescription Preview</p>
                  <img src={preview} alt="Prescription Preview" className="max-w-full h-auto rounded-lg" />
                </div>
              )}
            </div>
          </div>
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
        <ToastContainer position="top-right" theme="colored" transition={Bounce} />
      </motion.div>
    </div>
  );
};

export default PrescriptionPage;
