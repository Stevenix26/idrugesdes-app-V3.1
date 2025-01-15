"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const PrescriptionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);

  const submit = async (formData) => {
    try {
      const response = await fetch('../api/prescriptions/route.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Prescription created successfully:', formData);
        setShowModal(true);
        // You can add any additional logic here after successful submission
      } else {
        console.error('Failed to create Prescription:', response.statusText);
        // Handle error cases, show an error message, etc.
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle unexpected errors
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center text-black bg-light'>
        <div className='col-md-6 container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <h1>CREATE YOUR Prescription</h1>
          <div className='card flex flex-4 bg-orange-500 shadow-lg'>
            <form className='container flex flex-col gap-3 pt-4 pb-3 px-6' onSubmit={handleSubmit(submit)}>
              {/* Form fields go here */}
                <div >
                  <label for="patientName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Pharmacy</label>
                  {/* include validation with required or other standard HTML validation rules */}
                  <input type="text" id="patientName" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Enter Your pharmacy Store" required
                    {...register("patientName", { required: true })} />
                  {/* errors will return when field validation fails  */}
                  {/* {errors.nameRequired && <span>This field is required</span>} */}
                </div>
                <div>
                  <label for="medication" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter ur medication</label>
                  {/* include validation with required or other standard HTML validation rules */}
                  <input type="text" id="medication" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder="" required
                    {...register("medication", { required: true })} />
                  {/* errors will return when field validation fails  */}
                  {/* {errors.addressRequired && <span>This field is required</span>} */}
                </div>
                <div>
                  <label for="doctorName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter doctorName</label>
                  {/* include validation with required or other standard HTML validation rules */}
                  <input type="text" id="doctorName" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder="" required
                    {...register("doctorName", { required: true })} />
                  {/* errors will return when field validation fails  */}
                  {/* {errors.addressRequired && <span>This field is required</span>} */}
                </div>

                <button type="submit" className='btn btn-square w-full bg-orange-100'>
                  submit
                </button>

              </form>

          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
              <div className="bg-white">
                {/* Modal content goes here */}
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* Checkmark or success icon goes here */}

                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Submission Successful!</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your prescription has been successfully submitted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrescriptionForm;
