"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get(
    "payment_intent_client_secret"
  );

  useEffect(() => {
    if (payment_intent && payment_intent_client_secret) {
      // You can verify the payment status here if needed
      console.log("Payment Intent:", payment_intent);
    }
  }, [payment_intent, payment_intent_client_secret]);

  return (
    <>
      <div className="mb-6">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-8">
        Thank you for your payment. Your prescription has been received and will
        be processed shortly.
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Return to Dashboard
      </Link>
    </>
  );
}
