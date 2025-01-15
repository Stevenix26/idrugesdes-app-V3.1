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
    // <div key={i} className="mb-4 sm:w-1/2 md:w-1/2 lg:w-1/3 px-4 container grad ">
    //   <div
    //     style={{ borderRadius: "12px", overflow: "hidden", height: "100%" }}
    //     className="card bordered shadow-md grid grid-flow-row"
    //   >
    //     <div className=' mb-2'>
    //       <Image
    //         src={pharmacy.image}
    //         width={500}
    //         height={300}
    //         alt={pharmacy.name}
    //         layout="responsive"
    //         objectFit="cover"
    //       />
    //     </div>



    //     <div className="card div-body p-3">
    //       <div>
    //         <h2 className="text-2xl font-bold text-danger">{pharmacy.name}</h2>
    //         <p className=" text-gray-600">{pharmacy.address}</p>
    //         <p className="text-gray-600">Phone: {pharmacy.phone}</p>
    //       </div>
    //       <a>
    //         <Link href={`/store/${pharmacy.id}`} className="btn btn-outline w-full ">
    //           Visit Store
    //         </Link>
    //       </a>

    //     </div>

    //   </div>
    // </div>
    <div key={i} className="group relative card bordered shadow-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={pharmacy.image}
          alt={pharmacy.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 p-2 text-lg card-body">
        <div>
        <p className="mt-1 font-black text-bold text-inherit">{pharmacy.name}</p>
        <p className="font-medium text-current">{pharmacy.address}</p>
        <p className="font-medium text-pretty ">{pharmacy.phone}</p>
        </div>
      </div>
      <div className=" card-actions items-end justify-end p-3">
        <h3 className="text-sm text-gray-700">
          <a href={`/store/${pharmacy.id}`} className="btn btn-sm btn-outline w-full mt-1 justify-between">
            <span aria-hidden="true" className="absolute inset-0" />
            Visit Store
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
            </span>
          </a>

        </h3>
      </div>
    </div>
  ));

  // Return the improved Store component
  return (
    <main className="p-4">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="mb-3 ">
          <BackButton />
        </div>   
        <h2 className="text-2xl font-bold tracking-tight text-inherit">Pharmaceutical Stores</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {mapPharmacies}
        </div>
      </div>
      {/* Adding Some New Stuffs */}
      {/* <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={i} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/store/${pharmacy.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        Visit Store
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default Store;
