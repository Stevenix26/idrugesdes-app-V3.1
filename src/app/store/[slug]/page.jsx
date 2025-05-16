'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import OrderForm from './OrderForm';


const PharmacyDetails = ({ params }) => {
  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      image: "/images/shop1 (1).jpg",
      address: "Block 144, Plot 11, Adebayo Doherty Road, Lekki Phase 1, Lagos",
      phone: 9020993323,
    },
    {
      id: 2,
      name: "Medplus Pharmacy",
      image: "/images/shop1 (2).jpg",
      address: "12, Admiralty Way, Lekki Phase 1, Lagos",
      phone: 9024736789,
    },
    {
      id: 3,
      name: "Swiss Pharma Nigeria Limited",
      image: "/images/shop1 (3).jpg",
      address: "Plot 7, Acme Road, Ogba Industrial Scheme, Ikeja, Lagos",
      phone: 9027099323,
    },
    {
      id: 4,
      name: "Emzor Pharmaceutical Industries Limited",
      image: "/images/shop1 (4).jpg",
      address: "Plot 3C, Block A, Aswani Market Road, Isolo, Lagos",
      phone: 9023456789,
    },
    {
      id: 5,
      name: "May&Baker Nigeria Plc",
      image: "/images/shop1 (5).jpg",
      address: "3/5 Sapara Street, Ikeja Industrial Estate, Ikeja, Lagos",
      phone: 9021234567,
    },
    {
      id: 6,
      name: "Alpha Pharmacy",
      image: "/images/shop1 (6).jpg",
      address: "19, Admiralty Way, Lekki Phase 1, Lagos",
      phone: 9020993323,
    },
    {
      id: 7,
      name: "Greenlife Pharmaceuticals Limited",
      image: "/images/ladycot.jpg", // Replace with the actual image URL
      address: "No. 2, Bank Lane, Off Town Planning Way, Ilupeju, Lagos",
      phone: 9024736789,
    },
    {
      id: 8,
      name: "Emeka Pharmacy",
      image: "/images/shop1 (8).jpg",
      address: "45, Igwe Orizu Road, Otolo Nnewi, Anambra State",
      phone: 9027099323,
    },
    {
      id: 9,
      name: "Good Health Pharmacy",
      image: "/images/shop1 (9).jpg",
      address: "21, Akerele Street, Surulere, Lagos",
      phone: 9023456789,
    },
    {
      id: 10,
      name: "Excel Pharmacy",
      image: "/images/shop1 (10).jpg",
      address: "8, Chief Igwe Street, Umuchu, Aguata, Anambra State",
      phone: 9021234567,
    },


  ]);

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const selectedPharmacy = pharmacies.find((pharmacy) => pharmacy.id === Number(unwrappedParams.slug));

  // Handle case where selectedPharmacy is undefined
  if (!selectedPharmacy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pharmacy Not Found</h2>
          <p className="text-gray-700">The pharmacy you are looking for does not exist.</p>
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
              src={selectedPharmacy.image || "/images/placeholder.jpg"}
              alt={selectedPharmacy.name || "Pharmacy Image"}
              // width={500}
              // height={340}
              className="rounded-none object-cover w-full h-full max-h-[340px] transition-transform duration-300 hover:scale-105"
            // priority
            />
          </div>
          <div className="flex flex-col justify-center p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{selectedPharmacy.name}</h2>
            <p className="text-base text-gray-700 mb-3"><span className="font-semibold text-blue-700">Address:</span> {selectedPharmacy.address}</p>
            <p className="text-base text-gray-700 mb-6"><span className="font-semibold text-blue-700">Phone:</span> {selectedPharmacy.phone}</p>
            <div className="mt-4">
              <SignedIn>
                <Link href="/dashboard/prescription">
                  <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Submit prescription to {selectedPharmacy.name}
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full md:w-auto px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold shadow-md hover:bg-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Submit prescription to {selectedPharmacy.name}
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


