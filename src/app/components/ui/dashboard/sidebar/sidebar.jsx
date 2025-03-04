'use client'
import React, { useState } from 'react'
import { Prescription, CaretLineLeft, CaretLineRight, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare } from '@phosphor-icons/react/dist/ssr';
import MenuLink from "./menulink/menulink"
import Link from 'next/link';
import { UserButton, UserProfile } from '@clerk/nextjs';
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
          title: "Prescription",
          path: "/dashboard/prescription",
          icon: <Prescription />
        },
        {
          title: "Orders",
          path: "/dashboard/orders",
          icon: <ShoppingBag />
        },
        {
          title: "Submitted",
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
    <div className="flex flex-1 justify-betweeen item-center">
      <div className='grid mt-2 text-[16px] '>
        {/* <UserButton/> */}
        <div className=" justify-end items-end flex">
          {!toSide ? (
            <CaretLineLeft weight='light' size={16} className=' h-5 w-5' onClick={() => setToSide((toSide) => (!toSide))} />
          ) : (
            <CaretLineRight size={16} className=' h-6 w-6' onClick={() => setToSide((toSide) => (!toSide))} />
          )
          }
        </div>

        <div>


          {
            toSide ? (
              <ol>
                {menuItems.map((cat) => (
                  <li key={cat.title}>
                    <span className=' text-lg'></span>
                    {cat.list.map((item) => (
                      <MenuLink side={toSide} item={item} key={item.title} />
                    ))}
                  </li>


                ))}
              </ol>
            ) : (
              <ol>
                {menuItems.map((cat) => (
                  <li key={cat.title}>
                    <span className=' text-lg'>{cat.title}</span>
                    {cat.list.map((item) => (
                      <MenuLink side={toSide} item={item} key={item.title} />
                    ))}
                  </li>


                ))}
              </ol>
            )
          }
        </div>



      </div>
    </div>

  );
}

export default Sidebar
