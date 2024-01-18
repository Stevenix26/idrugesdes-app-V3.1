
'use client'
import React,{useState} from 'react'
import Menu from './Menu'
import Link from "next/link"
import Image from 'next/image';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Navbar } from '@nextui-org/react';
import { Basket } from '@phosphor-icons/react/dist/ssr';



const Navnew = () => {
  return (
    <div className='md:flex items-center justify-center '>
      <Navbar className='xl:flex-row h-16 p-4 z-10 mb-3 shadow-md'>

      {/* LOGO ICON */}
       <div className='flex-col'>
            <Link href='/'>
                  <div className='reletive w-100 h-100'>   
                        <Image src='/images/logo.png'
                            alt='Logo'
                            width={100}
                            height={100}
                            //   layout="fixed"  // Use responsive layout
                            //   objectFit="contain"  // Keep the image contained within its container
                        />
                  </div>
            </Link>      
        </div>

      {/* middle items */}
        <div className='hidden md:flex gap-4 items-center justify-between text-orange-400'>
          <Link href='/store' className='hover:text-indigo-400'>Store</Link>
          <Link href='/sellerstore' className='hover:text-indigo-400' >Become a seller</Link>
          <SignedIn>
          <Link href='/dashboard'className='hover:text-indigo-400' >Dashboard</Link>
          </SignedIn>

        </div>

        {/* left items */}
        
        <div className='items-end justify-end md:hidden'>
          <Menu/>
        </div>
       
        <div className='hidden md:flex gap-2 items-center justify-end '>
          <Link href="/cart" className='text-orange-400 hover:text-indigo-400 flex items-center justify-between gap-1 '>
                <Basket/>
                <span> cart(0)</span>
          </Link>
          <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-sm bg-base-content text-base-300 ndigo-600 m-1">
                  Theme
                  <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                  <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
                  <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Lofi" value="lofi"/></li>
                  <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark"/></li>
                  <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
                  <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
                </ul>
        </div>
        <div>
          <SignedIn>
              <UserButton />
             </SignedIn>
             <SignedOut>
               <SignInButton mode='modal'>
                 <button className='btn btn-sm hover:bg-indigo-800 hover:text-white'>
                   Sign In
                 </button>
               </SignInButton>
             </SignedOut>
          </div>
        </div>
        
        </Navbar>
        
    </div>
  )
}

export default Navnew;