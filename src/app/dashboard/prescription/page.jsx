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

    // Required fields validation
    const requiredFields = ['patientName', 'medication', 'doctorName', 'dosage', 'frequency', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !values[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Append all fields to formData
    Object.keys(values).forEach(key => {
      if (values[key]) {
        if (key === 'uploadedPrescription') {
          if (values[key][0]) {
            formData.append(key, values[key][0]);
          }
        } else {
          formData.append(key, values[key]);
        }
      }
    });

    // Validate file upload
    if (!values.uploadedPrescription?.[0]) {
      toast.error("Please upload a prescription file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    createPrescription(formData);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        e.target.value = ''; // Clear the file input
        setPreview(null);
        return;
      }

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
                    <span className="label-text font-semibold">Patient Name *</span>
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
                    <span className="label-text font-semibold">Medication *</span>
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
                <div className="form-control">
                  <label htmlFor="dosage" className="label">
                    <span className="label-text font-semibold">Dosage *</span>
                  </label>
                  <input
                    {...register("dosage", { required: "Dosage is required" })}
                    type="text"
                    placeholder="Enter medication dosage (e.g., 500mg)"
                    className={`input input-bordered w-full ${errors.dosage ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.dosage && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.dosage.message}</span>
                    </label>
                  )}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-control">
                  <label htmlFor="frequency" className="label">
                    <span className="label-text font-semibold">Frequency *</span>
                  </label>
                  <input
                    {...register("frequency", { required: "Frequency is required" })}
                    type="text"
                    placeholder="How often to take (e.g., twice daily)"
                    className={`input input-bordered w-full ${errors.frequency ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.frequency && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.frequency.message}</span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="doctorName" className="label">
                    <span className="label-text font-semibold">Doctor Name *</span>
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
                  <label htmlFor="quantity" className="label">
                    <span className="label-text font-semibold">Quantity</span>
                  </label>
                  <input
                    {...register("quantity", {
                      min: { value: 1, message: "Quantity must be at least 1" },
                      pattern: { value: /^[0-9]+$/, message: "Please enter a valid number" }
                    })}
                    type="number"
                    placeholder="Number of units prescribed"
                    className={`input input-bordered w-full ${errors.quantity ? 'input-error' : 'input-primary'}`}
                  />
                  {errors.quantity && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.quantity.message}</span>
                    </label>
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-control">
                  <label htmlFor="instructions" className="label">
                    <span className="label-text font-semibold">Instructions</span>
                  </label>
                  <textarea
                    {...register("instructions")}
                    placeholder="Special instructions for taking the medication"
                    className={`textarea textarea-bordered w-full h-24 ${errors.instructions ? 'textarea-error' : 'textarea-primary'}`}
                  />
                  {errors.instructions && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.instructions.message}</span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text font-semibold">Phone Number *</span>
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message: "Please enter a valid phone number"
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
                <div className="form-control">
                  <label htmlFor="prescriptionDate" className="label">
                    <span className="label-text font-semibold">Prescription Date</span>
                  </label>
                  <input
                    {...register("prescriptionDate")}
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
                    <span className="label-text font-semibold">Upload Prescription *</span>
                    <span className="label-text-alt text-gray-500">(Max size: 5MB, Formats: PDF, JPG, PNG)</span>
                  </label>
                  <input
                    {...register("uploadedPrescription", {
                      required: "Prescription file is required",
                      validate: {
                        fileSize: (files) => {
                          if (!files?.[0]) return true;
                          const maxSize = 5 * 1024 * 1024; // 5MB
                          return files[0].size <= maxSize || 'File size must be less than 5MB';
                        },
                        fileType: (files) => {
                          if (!files?.[0]) return true;
                          const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
                          return allowedTypes.includes(files[0].type) || 'Only PDF, JPG, and PNG files are allowed';
                        }
                      }
                    })}
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    className={`file-input file-input-bordered w-full ${errors.uploadedPrescription ? 'file-input-error' : 'file-input-primary'}`}
                  />
                  {errors.uploadedPrescription && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.uploadedPrescription.message}</span>
                    </label>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Please ensure your prescription file is clear and readable. Supported formats: PDF, JPG, PNG. Maximum file size: 5MB.
                  </p>
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
                <button
                  type="submit"
                  className="btn btn-primary gap-2 ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Prescription <DocumentIcon className="w-5 h-5" />
                    </>
                  )}
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
        </form>
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
      </motion.div>
    </div>
  );
};

export default PrescriptionPage;
