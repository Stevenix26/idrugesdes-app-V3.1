
'use client'
import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { SignInButton, UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Shops",
    "Store",
    "Dashboard",
    "Log Out",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
      
          <Link
              href='/'
              className='navbar-brand  rounded-2' 
            >    
              <img src='/images/logo.png' width="100" height="100" className="d-inline-block"/>

            </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
         <Link
              href='/'
              className='navbar-brand  rounded-2' 
            >    
              <img src='/images/logo.png' width="100" height="100" className="d-inline-block"/>

            </Link>
         
        </NavbarBrand>
        <NavbarItem>
          
            <Link href='/shops' color="foreground">Shops</Link>
          
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            <Link href='/shops'>Shops</Link>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <Link href='/shops'>Shops</Link>
          </Link>
          <SignedIn>
              <Link className='text-sm font-medium uppercase tracking-wider'>
                <Link href='/dashboard'>Dashboard</Link>
              </Link>
            </SignedIn>
        </NavbarItem>
      </NavbarContent>
      

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        
      </NavbarContent>
      

       <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>



  );
}
