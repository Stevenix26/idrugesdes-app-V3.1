'use client'
import React, { useState } from 'react'
import { Prescription, CaretLineLeft, CaretLineRight, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare } from '@phosphor-icons/react/dist/ssr';
import MenuLink from "./menulink/menulink"
import Link from 'next/link';
//import { UserButton, UserProfile } from '@clerk/nextjs';
// Import Bootstrap CSS




const Sidebar = () => {
  const menuItems = [
    {
      title: "Menus",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <House />
        },
        {
          title: "Make a prescription",
          path: "/dashboard/prescription",
          icon: <Prescription />
        },
        {
          title: "Make Order",
          path: "/dashboard/orders",
          icon: <ShoppingBag />
        },
        {
          title: "Submitted prescriptions",
          path: "/dashboard/submitted",
          icon: <SubtractSquare />

        }
      ]
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <Gear />
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <Info />
        },
        {
          title: "Contact Us",
          path: "/dashboard/contact_us",
          icon: <AddressBook />
        },
      ]
    }
  ];

  const [toSide, setToSide] = useState(false)

  return (
    <div className="flex flex-1 justify-between items-center transition-all duration-300 ease-in-out">
      <div className={`grid mt-2 text-[16px] bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4 ${toSide ? 'w-16' : 'w-64'} transition-all duration-300`}>
       
        <div className="flex justify-end items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
          {!toSide ? (
            <CaretLineLeft weight='light' size={20} className='text-gray-600 hover:text-indigo-600 transition-colors' onClick={() => setToSide((toSide) => (!toSide))} />
          ) : (
            <CaretLineRight size={20} className='text-gray-600 hover:text-indigo-600 transition-colors' onClick={() => setToSide((toSide) => (!toSide))} />
          )}
        </div>

        <div className="mt-6">
          <nav>
            {menuItems.map((cat) => (
              <div key={cat.title} className="mb-6">
                {!toSide && (
                  <h3 className="mb-2 px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {cat.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {cat.list.map((item) => (
                    <li key={item.title}>
                      <MenuLink side={toSide} item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>



      </div>
    </div>

  );
}

export default Sidebar
