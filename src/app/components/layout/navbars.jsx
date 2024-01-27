'use client'
import React,{useEffect, useState} from 'react'
import Menu from './Menu'
import Link from "next/link"
import Image from 'next/image';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Basket } from '@phosphor-icons/react/dist/ssr';


const Navnew = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`shadow-inner md:flex bg-base-300 flex w-full items-center justify-center ${isScrolled ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
      {/* <div className=' xl:flex-row h-16 p-4 z-10 mb-3 shadow-md'>

middle items
        

        left items
        
        </div> */}

        {/* top items */}
      <div className="navbar  xl:flex-row h-16 p-4 z-10 shadow-md">
        <div className="navbar-start">
          {/* top items */}
          <div className="dropdown">
            {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul> */}
            <div className='items-end justify-end md:hidden'>
              <Menu />
            </div>
          </div>

          {/* LOGO ICON */}
          <div className='hidden md:flex'>
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
        </div>
        <div className="navbar-center">
          <div className='md:hidden'>
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
          <div className='hidden md:flex gap-4 text-orange-400'>
            <Link href='/store' className='hover:text-indigo-400 text-md'>Store</Link>
            <Link href='/sellerstore' className='hover:text-indigo-400 text-md' >Become a seller</Link>
            <SignedIn>
              <Link href='/dashboard' className='hover:text-indigo-400 text-md' >Dashboard</Link>
            </SignedIn>

          </div>
        </div>
        <div className="navbar-end">
        <div>
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          </div>
          <div className='hidden md:flex gap-2 items-center justify-end'>
            <Link href="/cart" className='text-orange-400 hover:text-indigo-400 flex items-center justify-between gap-1 '>
              <Basket />
              <span> cart(0)</span>
            </Link>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-sm bg-base-content text-base-300 ndigo-600 m-1">
                Theme
                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Lofi" value="lofi" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine" /></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua" /></li>
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
        </div>
      </div>
        
    </div>
  )
}

export default Navnew;