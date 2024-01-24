// Import necessary modules
"use client"
// Import necessary modules
// Import necessary modules
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Import your SVG image (replace with your actual SVG)
import PharmacySvg from '/public/pharmacy.svg';

// Import your hero image (replace with your actual image)
import HeroImage from '/public/images/shelf.jpg';



// Custom styles for the overlay section
const overlayStyles = {
  backgroundImage: `url(${HeroImage.src})`,
};

const Page = () => {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
      <div className="relative isolate h-full overflow-hidden pt-14">
        <Image alt='' src={HeroImage} className='fixed inset-0 -z-10 h-full w-full object-cover' />
        <div aria-hidden='true' className='fixed inset-0 -z-10 bg-black/60 bg-blend-multiply' />

        <div className='relative mx-auto max-w-xl px-4 sm:py-8 md:px-6 lg:py-6 xl:px-2'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
            <div className='rounded-full py-1 px-3 text-sm leading-6 text-stone-400 ring-1 ring-white/10 hover:ring-white/20'>
              Exciting News! Announcing the Launch of Our New App{' '}
              <Link href='#' className='font-semibold text-white'>
                <span className='absolute inset-0' aria-hidden='true' />
                Read more <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
          </div>
          <div className='text-center'>
            <div className="flex items-center justify-center">
              <Image
                src={PharmacySvg} // Replace with your actual SVG image
                alt="Pharmacy Store"
                width={400}
                height={400}
              />
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-4xl'>
              Your Health, Our Priority. <br/> We care for you and your family health.
            </h1>
            <p className='mt-4 text-lg leading-8 text-stone-300'>
              Welcome to Idrugdes, your dedicated partner for a healthier life. <br/> Our mission is to simplify your healthcare journey by providing top-notch services that prioritize your well-being.
            </p>
            <p className='mt-4 text-lg leading-8 text-stone-300'>
              Whether it's managing prescriptions, <br/>delivering medications to your doorstep, or offering expert advice, Idrugdes is here to serve you. Explore our app and experience healthcare like never before.
            </p>
            <div className='mt-8 flex items-center justify-center gap-x-6'>
              <Link
                href='/stores'
                className='btn btn-outline rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Visit Our Stores
              </Link>
              <Link
                href='#'
                className='text-sm font-semibold leading-6 text-white'
              >
                Learn More<span aria-hidden='true'>→</span>
              </Link>
              
            </div>
          </div>
        </div>

        {/* <div className="overlay mt-40">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mx-auto align-self-center">
                <div className="site-block-cover-content text-center">
                  <h1 className="mb-0">About <strong className="text-primary">Pharmative</strong></h1>
                  <div className="row justify-content-center mb-5">
                    <div className="col-lg-6 text-center">
                      <p>
                        At Pharmative, we believe that everyone deserves convenient access to quality healthcare. Our dedicated team of professionals works tirelessly to ensure that you receive the care and attention you deserve.
                      </p>

                    </div>
                  </div>
                  <p><a href="#" className="btn btn-primary px-5 py-3">Shop Now</a></p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </motion.section>
  );
};

export default Page;
