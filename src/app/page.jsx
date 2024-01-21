// import Image from 'next/image'
// import heroImage from '/public/images/shelf.jpg'
// import Link from 'next/link'
// i


// const Page = () => {

//   return (
//     <section className='h-full'>
//       <div className='relative isolate h-full overflow-hidden pt-14'>
//         <Image
//           alt=''
//           src={heroImage}
//           className='fixed inset-0 -z-10 h-full w-full object-cover'
//         />

//         <div
//           aria-hidden='true'
//           className='fixed inset-0 -z-10 bg-black/60 bg-blend-multiply'
//         />
        
//         <div className= 'relative mx-auto max-w-xl px-4 sm:py-8 md:px-6 lg:py-6 xl:px-2'>
//           <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
//             <div className='rounded-full py-1 px-3 text-sm leading-6 text-stone-400 ring-1 ring-white/10 hover:ring-white/20'>
//               Announcing Lauching of app{' '}
//               <Link href='#' className='font-semibold text-white'>
//                 <span className='absolute inset-0' aria-hidden='true' />
//                 Read more <span aria-hidden='true'>&rarr;</span>
//               </Link>
//             </div>
//           </div>
//           <div className='text-center'>
//             <div className="flex items-center justify-center">
//               <Image
//                 src="/pharmacy.svg" // Replace with your actual SVG image
//                 alt="Pharmacy Store"
//                 width={400}
//                 height={400}
//               />
//             </div>
//             <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
//               We care for you and your family health.
//             </h1>
//             <p className='mt-6 text-lg leading-8 text-stone-300'>
//               Let handle your prescription and deliver at the swift of time, 
//               Check out, Our stores to submit prescription
//             </p>
//             <div className='mt-10 flex items-center justify-center gap-x-6'>
//               <Link
//                 href='/'
//                 className='btn btn-outline rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
//               >
//                 Visit stores
//               </Link>
//               <Link
//                 href='#'
//                 className='text-sm font-semibold leading-6 text-white'
//               >
//                 Learn more<span aria-hidden='true'>→</span>
//               </Link>
//             </div>
//           </div>

//           <div className="overlay pt-6" style={{backgroundImage: 'url(artimage)'}}>
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-12 mx-auto align-self-center">
//                   {/* <div
//                     style={{
//                       position: 'relative',
//                       height: '60vh',
//                       width: '100%',
//                       clipPath: 'inset(0 0 0 0)',
//                     }}
//                   >
//                     <div
//                       style={{
//                         position: 'fixed',
//                         height: '100%',
//                         width: '100%',
//                         left: '0',
//                         top: '0',
//                       }}
//                     >
//                       <Image
//                         src={artimage}
//                         layout="fill"
//                         objectFit="cover"
//                         sizes="100vw"
//                       />
//                     </div>
//                   </div> */}
//                   <div className="site-block-cover-content text-center">
//                     <h1 className="mb-0">About <strong className="text-primary">Pharmative</strong></h1>
//                     <div className="row justify-content-center mb-5">
//                       <div className="col-lg-6 text-center">
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex perspiciatis non quibusdam vel quidem.</p>
//                       </div>
//                     </div>
//                     <p><a href="#" className="btn btn-primary px-5 py-3">Shop Now</a></p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default Page

// pages/index.js

import React from 'react';
import Image from 'next/image';
import PrescriptionImage from '/public/images/shelf.jpg' // Replace with your actual image
import { motion } from 'framer-motion';
import heroImage from '/public/images/shelf.jpg'
// import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-primary text-white p-8">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Your Trusted Online Pharmacy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-2"
          >
            Convenient, Reliable, and Fast Prescription Services
          </motion.p>
        </div>
      </header>

      {/* Featured Services */}
      <div className="container mx-auto mt-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold mb-4">Service {index}</h2>
              <p>
                Description of the service. Highlighting key features and benefits for the users.
              </p>
            </motion.div>
          ))}
        </section>
      </div>

      {/* Prescription Image Section */}
      <div className="container mx-auto mt-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 rounded-lg shadow-md overflow-hidden"
        >
          <Image
            src={PrescriptionImage}
            alt="Prescription"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold"
          >
            Your Health, Our Priority
          </motion.h2>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto mt-8">
        <section>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold mb-4"
          >
            Featured Products
          </motion.h2>
          {/* Include your featured products here, e.g., product cards or carousel */}
        </section>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto mt-8">
        <section>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">{index}. Step Title</h3>
                <p>Step description. Additional details about how this step contributes to the user experience.</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-12 text-center">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-4"
          >
            Take Control of Your Health Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            Experience the convenience of online prescription services. Start your journey with us.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="btn btn-white"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default page;

