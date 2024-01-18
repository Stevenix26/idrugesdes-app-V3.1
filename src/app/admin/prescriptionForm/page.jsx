// PrescriptionForm.js
'use client'
import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PrescriptionForm = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate: createPrescription} = useMutation({
    mutationFn:async (prescriptionData) => {
      return axios.post('/api/prescriptions', prescriptionData);
    } ,
    onError:(error)=>{
        console.error(error);
      },
      onSuccess: () => {
        // Invalidate and refetch the prescriptions query
        queryClient.invalidateQueries('prescriptions');
      },
    });

  const onSubmit = async (data) => {
    try {
      await createPrescription.mutateAsync(data);
      // Prescription successfully submitted
    } catch (error) {
      console.error('Error submitting prescription:', error);
    }
  };

  return (
    <div className="min-h-screen grid items-center justify-center mx-auto p-6">
    <div className='w-full shadow-md card max-w-md p-8'>
    <form onSubmit={handleSubmit(onSubmit)}>
    
      {/* ... (Same form structure as before) */}
      <div className='grid card'>
      <label  htmlFor="patientName" className="block text-sm font-semibold mb-2">
        Patient Name:
        <input 
          className='input input-primary'
        {...register('patientName', { required: true })} />
      </label>

      <label className="block text-sm font-semibold mb-2">
        Doctor Name:
        <input 
          className='input input-primary'
        {...register('doctorName', { required: true })} />
      </label>

      <label className="block text-sm font-semibold mb-2">
        Medication:
        <input
          className='input input-primary'
         {...register('medication', { required: true })} />
      </label>

      <label className="block text-sm font-semibold mb-2">
        Upload Prescription:
        <input
          type="file"
          accept="image/*,application/pdf"
          className='file-input file-input-bordered'
          {...register('prescriptionFile', { required: true })}
        />
      </label>

      <button 
      type="submit"
      className='w-full btn btn-circle btn-primary max-w-lg'>
      Submit Prescription</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default PrescriptionForm;
