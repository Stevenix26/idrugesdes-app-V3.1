'use client'
// CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [prescription, setPrescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setPaymentError(error.message);
    } else {
      // Send token and prescription to your server for processing
      console.log(token);
      console.log('Prescription:', prescription);

      // Simulate a successful payment for demonstration purposes
      // In a real scenario, you would send the token and prescription to your backend for processing
      setPaymentError(null);
      alert('Payment successful! Prescription received for verification.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card details</label>
          <div className="mt-1">
            <CardElement className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prescription</label>
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Enter prescription details here..."
            className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {paymentError && <div className="text-red-500">{paymentError}</div>}
        <button
          type="submit"
          disabled={!stripe}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
