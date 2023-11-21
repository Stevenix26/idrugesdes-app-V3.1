'use client'
import { Chat, Notification } from '@phosphor-icons/react/dist/ssr';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const pathname = usePathname();
  return (
    <div className='container'>
    <div className='row'>
      <div className='flex flex-col bg-cyan-950 text-white rounded-lg'>
        <div className='px-2 capitalize'>
        {pathname.split("/").pop()}
          {/* <div className='items-end'>
            {/* <Notification size={32}/>
            <Chat size={32}/>
          </div> */}
        </div>
        
        </div>
      </div>
    
    </div>
  )
}

export default Navbar