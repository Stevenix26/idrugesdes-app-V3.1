'use client'
import React from 'react'
import { Prescription, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare } from '@phosphor-icons/react/dist/ssr'; 
import MenuLink from "./menulink/menulink"
import Link from 'next/link';
import { Avatar,image} from '@nextui-org/react';
import { UserButton, UserProfile } from '@clerk/nextjs';
// Import Bootstrap CSS




const Sidebar = () => {
  const menuItems = [
   {
     title: "Pages",
     list: [
       {
         title:"Dashboard",
         path: "/dashboard",
         icon: <House/>
     },
      {
         title:"Prescription",
         path: "/dashboard/prescription",
         icon: <Prescription/>
     },
      {
         title:"Orders",
         path: "/dashboard/orders",
         icon: <ShoppingBag />
     },
     {
      title: "Submitted",
      path: "/dashboard/submitted",
      icon: <SubtractSquare/>

     }
     ]
   },
    {
     title: "User",
     list: [
       {
         title:"Settings",
         path: "/dashboard/settings",
         icon: <Gear/>
     },
      {
         title:"Help",
         path: "/dashboard/help",
         icon: <Info/>
     },
      {
         title:"Contact Us",
         path: "/dashboard/contact",
         icon: <AddressBook />
     },
     ]
  }
];

  return (
    <div className="flex justify-center"> 
     <div className='row'>
     <UserButton/>
     {/* <div className="text-cyan-200">Josh</div> */}
     <ol> 
      {menuItems.map((cat) => (
            <li key={cat.title}>
                <span className=''> {cat.title}</span>
                {cat.list.map((item)=>(
                  <MenuLink item={item} key={item.title} />
                ))}
            </li>
          
          
        ))}
      </ol>
      </div>
    </div>
    
  );
}

export default Sidebar
