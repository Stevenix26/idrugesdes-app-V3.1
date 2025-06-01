'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/app/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center'>
      <div className='max-w-md mx-auto p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-2xl font-semibold mb-4'>Complete Your Purchase</h1>
        <p className='text-gray-600 mb-4'>
          To ensure the safety and accuracy of your order, please provide your prescription details below for verification.
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
