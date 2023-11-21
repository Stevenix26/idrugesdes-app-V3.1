'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import CartSlider from '../cart-slider';
import { getCart } from '../../../../lib/swell/cart';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const Header = () => {
  const { data: cart, isLoading } = useSWR('cart', getCart);
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <header className='z-10 pb-3 text-stone-400'>
        {/* Navbar */}
        <Navbar fixed shadow>
          <NavbarBrand>
            <Link href='/'>
              <a>
                <Image src='/images/logo.png' alt='Logo' width={100} height={100} />
              </a>
            </Link>
          </NavbarBrand>

          {/* Nav links */}
          <NavbarContent>
            <NavbarItem>
              <Link href='/shops' color='warning'>
                Shops
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href='/store' color='warning'>
                Store
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                color='warning'
                variant='text'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                More
              </Button>
              {dropdownOpen && (
                <div className='absolute mt-2 py-2 w-40 bg-white rounded-md shadow-lg'>
                  <Link href='/sellerstore'>
                    <a className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                      Become a seller
                    </a>
                  </Link>
                  <div>
                  <SignedIn>
                    <Link href='/dashboard'>
                      <a className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Dashboard</a>
                    </Link>
                  </SignedIn>
                </div>
                </div>
                
              )}
            </NavbarItem>
          </NavbarContent>

          {/* Shopping cart and user actions */}
          <div className='flex items-center justify-between gap-6'>
            <Button
              variant='flat'
              color='transparent'
              onClick={() => setCartSliderIsOpen(!cartSliderIsOpen)}
            >
              <ShoppingCartIcon className='h-7 w-7' />
              {cart?.item_quantity ? (
                <span className='flex h-5 w-5 items-center justify-center rounded bg-sky-600 text-xs font-medium text-white'>
                  {cart?.item_quantity}
                </span>
              ) : null}
            </Button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode='modal'>
                <Button color='success' variant='outline'>
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </Navbar>
      </header>

      {/* Cart Slider */}
      <CartSlider
        cart={cart}
        cartIsLoading={isLoading}
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
    </>
  );
};

export default Header;
