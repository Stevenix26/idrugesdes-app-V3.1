'use client'
import { Chat, Notification } from '@phosphor-icons/react/dist/ssr';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const pathname = usePathname();
  return (
    <div className='container'>
    <div className='row'>
      <div className='flex text-blue-300 bg-secondary-foreground rounded-lg'>
        <div className='px-2'>
        {pathname.split("/").pop()}
          <div className='items-end'>
            <Notification size={32}/>
            <Chat size={32}/>
          </div>
        </div>
        
        </div>
      </div>
    
    </div>
  )
}

export default Navbar