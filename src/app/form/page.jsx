"use client"

import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'

const PrescriptionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Inside your React component
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
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center text-black bg-light'>
        <div className='col-md-6 container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <h1>CREATE YOUR Prescription</h1>
          <div className='card flex flex-4 bg-orange-500 shadow-lg'>
            <form className='container flex flex-col gap-3 pt-4 pb-3 px-6' onSubmit={handleSubmit(submit)}>
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

    </>
  )
}

export default PrescriptionForm
