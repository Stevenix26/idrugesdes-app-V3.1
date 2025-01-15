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

export default FormPost