'use client'
import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import Link from "next/link"
import Image from 'next/image';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Basket } from '@phosphor-icons/react/dist/ssr';
import CartsDisplay from "../../components/carts"
// import useSWR from 'swr';
// import CartSlider from '../cart-slider';



const Navnew = () => {

  const changesUI = [
    {
      name: "Default",
      values: "default"
    },
    {
      name: "Lofi",
      values: "lofi"
    }, {
      name: "Dark",
      values: "dark"
    },
    {
      name: "Valentine",
      values: "valentine"
    }, {
      name: "Aqua",
      values: "aqua"
    }];

  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState(1);

  function ChangingUI() {
    const changes = changesUI;
    return (
      <>
        {
          changes.map((change) => (
            <Little ui={change} key={change.values} />
          )
          )
        }
      </>
    )


  }

  function Little({ ui }) {
    return (
      <input type="radio" name="theme-dropdown"
        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={ui.name} value={ui.values} />
    )

  }

  function cartUpdate() {
    if (cart > 0) setCart(cart + 1);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      if (scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      if (scrollX > 0) {
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
    <>
      <div className={`shadow-inner bg-inherit  md:flex flex items-center justify-center ${isScrolled ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
        {/* <div className=' xl:flex-row h-16 p-4 z-10 mb-3 shadow-md'>middle items
        left items      
        </div> */}
        {/* top items */}
        <nav className="navbar bg-inherit w-full xl:flex-row h-16 p-4 z-10 shadow-md">
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
            <div className='flex items-center gap-3'>
              <div className="relative">
                <input type="text" placeholder="Search medicines..." className="input input-bordered input-sm w-48 pl-8" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="btn btn-ghost btn-circle btn-sm relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">{cart}</span>
              </button>
            </div>
            <div className='hidden md:flex gap-2 items-center justify-end'>
              <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer-4" className="drawer-button btn bg-gradient-to-tr from-indigo-400 to-orange-200 btn-sm">

                    <Basket />
                    <span onClick={cartUpdate}> cart</span>
                  </label>
                </div>
                <div className="drawer-side z-20">
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                  <ul className="menu  p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {/* <CartsDisplay/> */}

                  </ul>
                </div>
              </div>

              {/* <Link href="/cart" className='text-orange-400 hover:text-indigo-400 flex items-center justify-between gap-1 '>
              <Basket />
              <span> cart(0)</span>
            </Link> */}

              <details className="dropdown dropdown-end">
                <summary tabIndex={0} role="button" className="btn btn-sm bg-white border-gray-200 hover:bg-gray-50 text-gray-700 gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Theme
                </summary>
                <ul tabIndex={0} className="bg-gradient-to-tr from-indigo-200 to-orange-100 dropdown-content dropdown-left z-[1] p-2 shadow-2xl text-indigo-900 rounded-box w-52">
                  <li><ChangingUI /></li>
                </ul>
              </details>
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
        </nav>

      </div>
    </>
  )
}

export default Navnew;