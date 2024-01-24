'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut} from '@clerk/nextjs';
import Link from 'next/link';


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

  const selectedPharmacy = pharmacies.find((pharmacy) => pharmacy.id === Number(params.slug));

  return (
    <div className="container mx-auto mt-10">
      <div className='card border shadow-md'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="p-3">
            <Image
              isZoomed
              src={selectedPharmacy.image}
              alt={selectedPharmacy.name}
              width={500}
              height={300}
              className="rounded-md hover:cursor-zoom-out object-cover card"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-danger">{selectedPharmacy.name}</h1>
            <p className="text-primary">{selectedPharmacy.address}</p>
            <p className="text-primary">Phone: {selectedPharmacy.phone}</p>
            <div className="mt-4">
              <SignedIn>
                <Link href="/dashboard/prescription">
                  <button className=' btn btn-md btn-outline btn-ghost'>
                    <span className='items-start'>Submits prescription to {selectedPharmacy.name}</span>
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className=' btn btn-md btn-outline btn-ghost'>
                    <span className='items-start' >Submits prescription to {selectedPharmacy.name}</span>
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

