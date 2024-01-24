// PrescriptionForm.js

import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const PrescriptionForm = () => {
  const[selectedFile, setSelectedFile] = useState(null);
  const[previewURL, setPreviewURL] = useState("")

  const [formData, setFormData] = useState({
    patientName:"",
    doctorName: "",
    medication: "",
    prescriptionFile:selectedFile,
  });

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleFileInputChange = async (event)=>{
      const file = event.target.files[0]

      console.log(file)
    }

  // const { register, handleSubmit, formState: { errors }, setError } = useForm();
  // const queryClient = useQueryClient();

  // const { mutate: createPrescription } = useMutation({
  //   mutationFn: async (prescriptionData) => {
  //     return axios.post('/api/prescriptions', prescriptionDataform);
  //   },
  //   onError: (error) => {
  //     console.error('Error submitting prescription:', error);
  //   },
  //   onSuccess: (data) => {
  //     console.log('Prescription submitted successfully:', data);
  //     // Invalidate and refetch the prescriptions query
  //     queryClient.invalidateQueries('prescriptions');
  //   },
  // });

   const submitHandler = async event=>{
    event.preventDefault(); 
   }

  // const onSubmit = async (data) => {
  //   try {
  //     await createPrescription.mutate(data);
  //     // Prescription successfully submitted
  //   } catch (error) {
  //     console.error('Error submitting prescription:', error);
  //     setError('submit', { type: 'manual', message: 'Failed to submit prescription.' });
  //   }
  // };

  return (
    <section className='px-5 xl:px-0'>
    <div className="max-w-[1170px] items-center justify-between">
      <div className='grid grid-cols-1 card lg:grid-flow-cols-2 p-6 rounded-md shadow-m'>
        <h2 className="text-2xl font-semibold mb-6 text-center">Prescription Form</h2>
        <form onSubmit={submitHandler} className='space-y-6'>
          <div className='grid grid-cols-1 gap-4'>
            <div className=' mb-2'>
            <label className="text-sm font-semibold">
              Patient Name:
              <input
                type='text'
                value={formData.patientName}
                name='patientName'
                onChange={handleInputChange}
                className='input input-primary w-full text-[16px]'
                // {...register('patientName', { required: true })}
              />
            </label>
              </div>
              
              <div className=' mb-2'>
            <label className="text-sm font-semibold">
              Doctor Name:
              <input
              type='text'
              value={formData.doctorName}
                onChange={handleInputChange}
                name='doctorName'
                    className='input input-primary w-full text-[16px]'
                // {...register('doctorName', { required: true })}
              />
            </label>
            </div>
              
              <div className=' mb-2'>
            <label className="text-sm font-semibold">
              Medication:
              <input
              type='text'
                value={formData.medication}
                onChange={handleInputChange}
                name='medication'
                    className='input input-primary w-full text-[16px]'
                // {...register('medication', { required: true })}
              />
            </label>
            </div>
          
          
          <div >
            <label htmlFor='customFile' className="text-sm font-semibold">
              Upload Prescription:
              <input
                id="customFile"
                type="file"
                name='prescriptionfile'
                accept="image/*,application/pdf"
                onChange={handleFileInputChange}
                    className='file-input file-input-bordered w-full text-[16px]'
                // {...register('prescriptionFile', { required: true })}
              />
            </label>

            {/* {errors.prescriptionFile && (
              <span className="text-sm text-red-500">Please upload a prescription file.</span>
            )}

            {errors.submit && (
              <span className="text-sm text-red-500">{errors.submit.message}</span>
            )} */}
            </div>

            <button
              type="submit"
              className='w-full btn btn-primary'>
              Submit Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
};

export default PrescriptionForm;
