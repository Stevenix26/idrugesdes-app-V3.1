'use client'
import { Chat, Notification } from '@phosphor-icons/react/dist/ssr';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const pathname = usePathname();
  return (
    <div className='container p-2 items-center justify-center'>
    <div className='row'>
      <div className='flex flex-col pb-3 bg-base-content text-base-100 rounded-lg'>
        <div className='px-2 capitalize pt-3'>
            {pathname.split("/").pop()} 
        </div>
        
        </div>
      </div>
    
    </div>
  )
}

export default Navbar