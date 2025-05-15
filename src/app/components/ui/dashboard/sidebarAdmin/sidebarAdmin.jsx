'use client'
import React, { useState } from 'react'
import { Prescription, ShoppingBag, House, Gear, Info, AddressBook, SubtractSquare, Person, Users, ChartBar, CaretLineLeft, CaretLineRight } from '@phosphor-icons/react/dist/ssr';
import MenuLink from "./menulinkAdmin/menulinkAdmin"
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
// Import Bootstrap CSS




const SidebarAdmin = () => {
  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/admin",
          icon: <House />
        },
        {
          title: "Prescriptions",
          path: "/admin/prescriptionList",
          icon: <Prescription />
        },
        {
          title: "Orders",
          path: "/admin/orders",
          icon: <ShoppingBag />
        },
        {
          title: "Users",
          path: "/admin/users",
          icon: <Users />
        },
        {
          title: "Reports",
          path: "/admin/reports",
          icon: <ChartBar />
        },
        {
          title: "Teams",
          path: "/admin/team",
          icon: <Person />
        },
        {
          title: "Drug Checkout",
          path: "/admin/drugCheckout",
          icon: <SubtractSquare />
        }
      ]
    },
    {
      title: "Admin",
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

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-1 justify-between items-center transition-all duration-300 ease-in-out">
      <div className={`grid mt-2 text-[16px] bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4 ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
        <div className="flex justify-end items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
          {!collapsed ? (
            <CaretLineLeft weight='light' size={20} className='text-gray-600 hover:text-indigo-600 transition-colors' onClick={() => setCollapsed((c) => (!c))} />
          ) : (
            <CaretLineRight size={20} className='text-gray-600 hover:text-indigo-600 transition-colors' onClick={() => setCollapsed((c) => (!c))} />
          )}
        </div>
        <div className="flex items-center gap-2 px-4 mt-2 mb-4">
          <UserButton afterSignOutUrl="/" />
          {!collapsed && <span className="font-bold text-indigo-700 text-lg">Admin Panel</span>}
        </div>
        <div className="mt-6">
          <nav>
            {menuItems.map((cat) => (
              <div key={cat.title} className="mb-6">
                {!collapsed && (
                  <h3 className="mb-2 px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {cat.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {cat.list.map((item) => (
                    <li key={item.title}>
                      <MenuLink side={collapsed} item={item} />
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

export default SidebarAdmin
