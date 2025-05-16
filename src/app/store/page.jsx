'use client'
// Import required modules
import Link from "next/link";
import Image from "next/image"
import React, { useState, useEffect } from "react";

import BackButton from "../components/BackButton";

// Store component
const Store = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/stores");
        if (!res.ok) throw new Error("Failed to fetch stores");
        const data = await res.json();
        setPharmacies(data);
      } catch (err) {
        setPharmacies([]);
      }
      setLoading(false);
    };
    fetchStores();
  }, []);
  // Filter pharmacies by search
  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(search.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(search.toLowerCase())
  );

  // Map pharmacies to cards
  const mapPharmacies = filteredPharmacies.map((pharmacy, i) => (
    <div key={i} className="group relative card bordered shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 group-hover:opacity-90 lg:h-56">
        <img
          src={pharmacy.image && (pharmacy.image.startsWith('http') || pharmacy.image.startsWith('/')) ? pharmacy.image : "/images/placeholder.jpg"}
          alt={pharmacy.name || "Pharmacy Image"}
          // width={200}
          // height={200}
          // layout="responsive"
          // quality={100}
          // priority
          // sizes="100vw"
          // placeholder="blur"
          // blurDataURL={pharmacy.image && (pharmacy.image.startsWith('http') || pharmacy.image.startsWith('/')) ? pharmacy.image : "/images/placeholder.jpg"}
          // style={{ objectFit: "cover" }}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="font-bold text-lg text-blue-900 mb-1">{pharmacy.name}</p>
          <p className="text-gray-600 text-sm mb-1">{pharmacy.address}</p>
          <p className="text-gray-500 text-xs">Phone: {pharmacy.phone}</p>
        </div>
        <div className="mt-4">
          <Link href={`/store/${pharmacy.id}`} className="btn btn-outline w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
            Visit Store
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" /></svg></span>
          </Link>
        </div>
      </div>
    </div>
  ));

  // Return the improved Store component
  return (
    <main className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Banner/Call-to-Action */}
      <div className="w-full mb-8 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Find Your Trusted Pharmacy</h2>
          <p className="text-sm md:text-base">Browse, search, and connect with top pharmaceutical stores. Special offers available this month!</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/prescription" className="bg-white text-orange-600 font-bold px-6 py-2 rounded-lg shadow hover:bg-orange-50 transition-all">Order Prescription</Link>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="mb-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BackButton />
          <div className="w-full sm:w-1/2 flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search by name or address..."
              className="w-full outline-none bg-transparent text-gray-700"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-blue-900 mb-4">Pharmaceutical Stores</h2>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-lg text-gray-500 animate-pulse">Loading stores...</span>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {mapPharmacies.length > 0 ? mapPharmacies : (
              <div className="col-span-full text-center text-gray-500 py-10">No pharmacies found.</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Store;

// - CDN-4829-ABCD
// - CDN-1938-XZPQ
// - CDN-5721-LKJM
// - CDN-9043-TRWE
// - CDN-2387-QWER
// - CDN-6712-PLMN
// - CDN-8456-BVCX
// - CDN-1209-HJKL
// - CDN-3345-UIOP
// - CDN-7782-ASDF
// - CDN-5567-ZXCV
// - CDN-9910-ERTY
// - CDN-6634-MNBV
// - CDN-4421-POIU
// - CDN-2876-GHJK
// - CDN-3598-DFGH
// - CDN-7102-QAZX
// - CDN-8245-WSXC
// - CDN-1357-EDCV
// - CDN-2468-RFVT