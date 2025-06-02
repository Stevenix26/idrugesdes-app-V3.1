"use client";

import { Suspense } from "react";
import Link from "next/link";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <Suspense
          fallback={
            <div className="animate-pulse">
              <div className="mb-6">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-200" />
              </div>
              <div className="h-8 bg-gray-200 rounded mb-4" />
              <div className="h-20 bg-gray-200 rounded mb-8" />
              <div className="h-10 w-40 bg-gray-200 rounded mx-auto" />
            </div>
          }
        >
          <PaymentSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
