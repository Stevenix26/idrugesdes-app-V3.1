'use client'
// Import required modules
import Link from "next/link";
import Image from "next/image"
import React, { useState } from "react";

import BackButton from "../components/BackButton";

// Store component
const Store = () => {
 
  // const [isLoaded, setIsLoaded] = React.useState(false);

  // const toggleLoad = () => {
  //   setIsLoaded(!isLoaded);
  // };

  // Sample data for pharmacies
const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      image: "/images/shop1 (1).jpg",
      address: "Block 144, Plot 11, Adebayo Doherty Road, Lekki Phase 1, Lagos",
      phone: `09020993323`,
    },
    {
      id: 2,
      name: "Medplus Pharmacy",
      image: "/images/shop1 (2).jpg", 
      address: "12, Admiralty Way, Lekki Phase 1, Lagos",
      phone: `09024736789`,
    },
    {
      id: 3,
      name: "Swiss Pharma Nigeria Limited",
      image: "/images/shop1 (3).jpg", 
      address: "Plot 7, Acme Road, Ogba Industrial Scheme, Ikeja, Lagos",
      phone: `09027099323`,
    },
    {
      id: 4,
      name: "Emzor Pharmaceutical Industries Limited",
      image: "/images/shop1 (4).jpg", 
      address: "Plot 3C, Block A, Aswani Market Road, Isolo, Lagos",
      phone: `09023456789`,
    },
    {
      id: 5,
      name: "May&Baker Nigeria Plc",
      image: "/images/shop1 (5).jpg", 
      address: "3/5 Sapara Street, Ikeja Industrial Estate, Ikeja, Lagos",
      phone: `09021234567`,
    },
    {
      id: 6,
      name: "Alpha Pharmacy",
      image: "/images/shop1 (6).jpg", 
      address: "19, Admiralty Way, Lekki Phase 1, Lagos",
      phone: `09020993323`,
    },
    {
      id: 7,
      name: "Greenlife Pharmaceuticals Limited",
      image: "/images/ladycot.jpg", // Replace with the actual image URL
      address: "No. 2, Bank Lane, Off Town Planning Way, Ilupeju, Lagos",
      phone: `09024736789`,
    },
    {
      id: 8,
      name: "Emeka Pharmacy",
      image: "/images/shop1 (8).jpg", 
      address: "45, Igwe Orizu Road, Otolo Nnewi, Anambra State",
      phone: `09027099323`,
    },
    {
      id: 9,
      name: "Good Health Pharmacy",
      image: "/images/shop1 (9).jpg",
      address: "21, Akerele Street, Surulere, Lagos",
      phone: `09023456789`,
    },
    {
      id: 10,
      name: "Excel Pharmacy",
      image: "/images/shop1 (10).jpg", 
      address: "8, Chief Igwe Street, Umuchu, Aguata, Anambra State",
      phone: `09021234567`,
    },


   ]);


  // Map pharmacies to cards
  const mapPharmacies = pharmacies.map((pharmacy, i) => (
    <div key={i} className="mb-4 sm:w-1/2 md:w-1/2 lg:w-1/3 px-4 container grad ">
      <div
        style={{ borderRadius: "12px", overflow: "hidden", height: "100%" }}
        className = "card bordered shadow-md grid grid-flow-row"
      >
      <div className=' mb-2'>
          <Image
            src={pharmacy.image}
            width={500}
            height={300}
            alt={pharmacy.name}
            layout="responsive"
            objectFit="cover"
            isZoomed
          />
      </div>
        
        
        
        <div className="card div-body p-3">
          <div>
          <h2 className="text-2xl font-bold text-danger">{pharmacy.name}</h2>
          <p className=" text-gray-600">{pharmacy.address}</p>
            <p className="text-gray-600">Phone: {pharmacy.phone}</p>
          </div>
          <a>
            <Link href={`/store/${pharmacy.id}`} className="btn btn-outline w-full ">
              Visit Store
          </Link>
          </a>

        </div>
       
      </div>
    </div>
  ));

  // Return the improved Store component
  return (
    <section className="py-10 p-12">
      <div className="container mx-auto justify-between items-center">
        <div className="mb-3">
          <BackButton />
        </div>   
        <div className="flex flex-1 flex-wrap mx-4">{mapPharmacies}</div>
      </div>
    </section>
  );
};

export default Store;
