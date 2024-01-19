'use client'
import React from 'react'
import { Prescription, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare } from '@phosphor-icons/react/dist/ssr'; 
import MenuLink from "./menulinkAdmin/menulinkAdmin"
import Link from 'next/link';
import { Avatar,image} from '@nextui-org/react';
import { UserButton, UserProfile } from '@clerk/nextjs';
// Import Bootstrap CSS




const SidebarAdmin = () => {
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
         title:"Message",
         path: "/dashboard/Message",
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
     title: "Admin",
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
       
     ]
  }
];

  return (
    <div className="flex flex-1 justify-betweeen item-center"> 
     <div className='grid mt-2 text-[16px] '>
     <UserButton/>
     {/* <div className="text-cyan-200">Josh</div> */}
     <ol> 
      {menuItems.map((cat) => (
            <li key={cat.title}>
                <span className=' text-lg'> {cat.title}</span>
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

export default SidebarAdmin
