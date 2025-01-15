'use client'
import React from 'react'
import { Prescription, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare, Person  } from '@phosphor-icons/react/dist/ssr'; 
import MenuLink from "./menulinkAdmin/menulinkAdmin"
import Link from 'next/link';
import { UserButton, UserProfile } from '@clerk/nextjs';
// Import Bootstrap CSS




const SidebarAdmin = () => {
  const menuItems = [
   {
     title: "Pages",
     list: [
       {
         title:"Dashboard",
         path: "/admin",
         icon: <House/>
     },
      {
         title:"Prescriptions",
         path: "/admin/prescriptionList",
         icon: <Prescription/>
     },
      {
         title:"Message",
         path: "/admin/Message",
         icon: <ShoppingBag />
     },
       {
         title: "Teams",
         path: "/admin/team",
         icon: <Person />
       },
     {
      title: "Drug Checkout",
       path: "/admin/drugCheckout",
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
     <ul className='px-2 py-0'> 
      {menuItems.map((cat) => (
            <li key={cat.title}>
                <span className=' text-lg'> {cat.title}</span>
                {cat.list.map((item)=>(
                  <MenuLink item={item} key={item.title} />
                ))}
            </li>
          
          
        ))}
      </ul>
      </div>
    </div>
    
  );
}

export default SidebarAdmin
