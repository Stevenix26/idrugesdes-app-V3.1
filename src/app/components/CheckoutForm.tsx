"use client";

import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
  amount?: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount = 2000 }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [prescription, setPrescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        prescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setPaymentError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((err) => {
        setPaymentError(err.message);
      });
  }, [amount, prescription]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setIsProcessing(false);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: "Customer Name", // You might want to collect this
            },
          },
        },
        redirect: "if_required",
      });

      if (result.error) {
        setPaymentError(result.error.message || "An error occurred");
      } else {
        // Payment successful or requires further action
        setPaymentError(null);
        setPrescription("");
        if (result.paymentIntent?.status === "succeeded") {
          alert("Payment successful! Prescription received for verification.");
        } else {
          // Handle other statuses or redirect if needed
          window.location.href = `${window.location.origin}/payment-success`;
        }
      }
    } catch (error) {
      setPaymentError(
        error instanceof Error ? error.message : "Payment processing failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!clientSecret) {
    return <div>Loading payment form...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card details
          </label>
          <div className="mt-1">
            <PaymentElement
              options={{
                layout: "tabs",
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prescription
          </label>
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Enter prescription details here..."
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
            required
          />
        </div>
        {paymentError && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
            {paymentError}
          </div>
        )}
        <button
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
          className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
            !stripe || !clientSecret || isProcessing
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default function CheckoutFormWrapper({ amount }: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
