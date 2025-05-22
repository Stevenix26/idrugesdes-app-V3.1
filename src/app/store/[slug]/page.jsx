'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

const PharmacyDetails = ({ params }) => {
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const response = await fetch(`/api/stores/${params.slug}`);
        if (!response.ok) {
          throw new Error('Pharmacy not found');
        }
        const data = await response.json();
        setPharmacy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Loading...</h2>
          <p className="text-gray-700">Please wait while we fetch the pharmacy details.</p>
        </div>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pharmacy Not Found</h2>
          <p className="text-gray-700">The pharmacy you are looking for does not exist.</p>
          <Link href="/store" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Return to Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow-sm">Pharmacy Details</h1>
          <p className="text-lg text-blue-700">Find all the information you need about this pharmacy below.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
          <div className="relative min-h-[260px] md:min-h-[340px] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <img
              src={pharmacy.image || "/images/placeholder.jpg"}
              alt={pharmacy.name || "Pharmacy Image"}
              className="rounded-none object-cover w-full h-full max-h-[340px] transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{pharmacy.name}</h2>
            <p className="text-base text-gray-700 mb-3"><span className="font-semibold text-blue-700">Address:</span> {pharmacy.address}</p>
            <p className="text-base text-gray-700 mb-6"><span className="font-semibold text-blue-700">Phone:</span> {pharmacy.phoneNumber}</p>
            {pharmacy.description && (
              <p className="text-base text-gray-700 mb-6"><span className="font-semibold text-blue-700">Description:</span> {pharmacy.description}</p>
            )}
            <div className="mt-4">
              <SignedIn>
                <Link href="/dashboard/prescription">
                  <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Submit prescription to {pharmacy.name}
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full md:w-auto px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold shadow-md hover:bg-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Sign in to submit prescription
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetails;


