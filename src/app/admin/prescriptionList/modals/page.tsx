'use client'
import React from 'react'
import { useForm } from 'react-hook-form';


const modalsList = () => {

  return (
    <div>
      hello
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Check Patient Prescription
        </button>
        <dialog id="my_modal_3" className="modal w-full">
          <div className="modal-box grid w-38/40 sm:max-w-sm md:max-w-md max-w-3xl">
            <form method="dialog" className="mb-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg">#GR0483808</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
            <div className="mt-8 flex justify-between items-start">
              <div className="grid">
                <span className="font-bold text-slate-400 text-sm">
                  Drug Name
                </span>
                <p>Paracetamol Tablet 500mg</p>
              </div>
              <div className="grid">
                <span className="font-bold text-slate-400  text-sm">
                  Quantity
                </span>
                <p>1</p>
              </div>
            </div>
            <div className="mt-7">
              <p>Attached Photo</p>
            </div>
            <div className="flex flex-1 gap-2 items-end justify-end">
              {/* Modal For Cancel Order */}
              <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn btn-md btn-error"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  ✕ cancel
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">CANCEL ORDER</h3>
                    <textarea
                      name="Reason"
                      className=" textarea textarea-bordered textarea-primary"
                      id=""
                      cols="40"
                      rows="5"
                      placeholder="Reason"
                    ></textarea>
                   {/* Drug alternative*/}
                    <section className='gap-3 mt-5'>
                      <h2>Provide Drug Alternative</h2>
                      <input
                        type="text"
                        className='input input-bordered input-priamry'
                        />
                      <button type='submit' className='ml-4 gap-1 btn shadow-blue-950'>
                        Submit
                      </button>
                    </section>
                    <div className="modal-action">
                      <button type="submit" className="btn btn-md btn-success">
                        confirm
                      </button>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>

              {/* Process Presxription*/}
              <button className="btn btn-md btn-info">
                process prescription
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}

export default modalsList



{
  /*
'use client'
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {FormInputPost} from '../../types'
import { Tag } from '@prisma/client';

interface FormPostProps{
  submit:  SubmitHandler<FormInputPost>;
  isEditing: boolean
}


const FormPost: FC<FormPostProps>= ({submit, isEditing }) => {

  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm<FormInputPost>();
  // on form submit
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // fetch list of tags
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      try {
        const response = await axios.get('../../api/tags'); // Replace with your actual apI
        return response.data;
      } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;

      }
    }
  });




  return (
    <div className='container'>
      <div className='card'>
        <form
          onSubmit={handleSubmit(submit)}
          className='p-4 flex flex-col items-center justify-center gap-3 mt-5'>
          <input
            {...register("title", { required: true })}
            aria-invalid={errors.title ? "true" : "false"}
            type="text"
            placeholder="Type here"
            className="input input-primary w-full max-w-lg border" />
          {errors.title?.type === 'required' && <p className='text-red-600' role="alert">Title name is required</p>}
          
          <textarea
            {...register("content", { required: "content required" })}

            className="textarea textarea-secondary border border-blue-900 w-full max-w-lg"
            placeholder="Bio"></textarea>
          {errors.content && <p className='text-red-600' role="alert">
          {errors.content.message}</p>}

          {isLoadingTags ?
            <span className="loading loading-ring loading-sm"></span> :
            (
              <select
                {...register("tags", { required: "Tag is required" })}
                className="select border select-info w-full max-w-lg"
                defaultValue={""}>
                <option disabled value="">Pick a pizza</option>
                {dataTags?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>

                ))}
              </select>

            )
          }
          {errors.tags && <p className='text-red-600 start-4'
           role="alert">{errors.tags.message}</p>}
          <button 
          type='submit'
          className='w-full btn btn-circle btn-secondary max-w-lg'>
               {isEditing ? 'Update' : 'Create'}
          </button>

        </form>
      </div>

    </div>
  )

}

export default FormPost*/
}