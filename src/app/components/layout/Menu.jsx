'use client'
import { Basket, List,XCircle} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import React, { useState } from 'react'
import {  SignInButton, SignOutButton, SignedIn, SignedOut} from '@clerk/nextjs';



const links = [
    {id:1, title: "Store", url:"/store"},
    {id:2, title: "About", url:"/about"},
  { id: 3, title: "Become a Seller", url:"/sellerstore"}


]


const Menu = () => {
    const [Open, setOpen] = useState(false)
  return (
    <div className=' text-indigo-900'>
        {!Open? (
            <List className='h-7 w-7' onClick={()=> setOpen(true)}/>
            ) : (
                <XCircle className='h-7 w-7' onClick={()=> setOpen(false)}/>)}
      {Open && (         
         <div className='drawer text-white absolute left-200 top-24 w-full z-10 flex flex-col gap-2 items-start justify-between text-lg'>
          <ul className='menu menu-vertical bg-neutral rounded-xl w-80 min-h-full'> {links.map((item) =>(
              
            <li>
               <a> <Link href={item.url} key={item.id}>
                {item.title}
              </Link></a>
            </li>
              
            ))}
            
              <li><a><Link href="/cart" className='flex items-center justify-between'>
                <Basket/>
                 cart(0)
              </Link>
            </a>
            </li>
              <li>  
              <SignedIn className="items-center">
                <a><Link href='/dashboard'>
                    Dashboard
                  </Link>
              </a>
                </SignedIn>
            
            </li>
        
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-sm m-1">
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

              <li>
              <SignedOut>
                  <SignInButton mode='modal'>
                    <a>
                      Sign In
                    </a>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <SignOutButton/>
                </SignedIn>
            </li>
          </ul>
         </div>
         
      )}

    </div>
   
    
  )
}

export default Menu