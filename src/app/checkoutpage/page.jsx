// CheckoutPage.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../checkoutform/page';

const stripePromise = loadStripe('pk_test_51OFv06KpLwlpQmGqLTkbR3loULsbz1vUpyLEZJH0VslKnG1DFRbF5XfvDlxpKQMLmgycaJwVfVczJFyqSJUvCKbV00MjlU9D8Q');

const CheckoutPage = () => {
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
};

export default CheckoutPage;
