"use client"

import { Card, Button } from '@nextui-org/react'
import React from 'react'
import { useForm } from "react-hook-form";






const SellerStore = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = formsData => { console.log("you submitted this data",{formsData}); };
  return (
    <>
      <head>
        <title>Store Detials</title>
        <meta name="description" content="Pharmacy Store" />
        <link rel="icon" href="favicon.ico" />
      </head>
      <main className='flex min-h-screen flex-col items-center justify-center text-black bg-light'>
        <div className='col-md-6 container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <h1>CREATE YOUR STORE</h1>
          <Card className='container flex flex-4 bg-orange-500 shadow-lg'>
            <form className='container flex flex-col gap-3 pt-4 pb-3 px-6' onSubmit={handleSubmit(onSubmit)}>
              <div >
                <label for="Pharmacy_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Store</label>
                {/* include validation with required or other standard HTML validation rules */}
                <input type="text" id="first_name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Enter Your pharmacy Store" required
                  {...register("name", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.nameRequired && <span>This field is required</span>}
              </div>
              <div>
                <label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                {/* include validation with required or other standard HTML validation rules */}
                <input type="text" id="Address" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder="" required
                  {...register("address", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.addressRequired && <span>This field is required</span>}
              </div>
              <div>
                <label for="phoneNum" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                {/* include validation with required or other standard HTML validation rules */}
                <input type="tel" id="phoneNum" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder="" required
                  {...register("phone number", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.addressRequired && <span>This field is required</span>}
              </div>

              <Button type="submit" className='bg-orange-100' size="lg" variant="shadow">
                <input type='submit' />
              </Button>

            </form>
          </Card>
        </div>

      </main>

    </>
  )
}

export default SellerStore
