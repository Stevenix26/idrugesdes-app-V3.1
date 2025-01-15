// "use client"

// import { MouseEventHandler, useCallback, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"

// export default function Modal({ children }: { children: React.ReactNode }) {
//     const overlay = useRef(null)
//     const wrapper = useRef(null)
//     const router = useRouter()

//     const onDismiss = useCallback(() => {
//         router.back()
//     }, [router])

//     const onClick: MouseEventHandler = useCallback(
//         (e) => {
//             if (e.target === overlay.current || e.target === wrapper.current) {
//                 if (onDismiss) onDismiss()
//             }
//         },
//         [onDismiss, overlay, wrapper]
//     )

//     const onKeyDown = useCallback(
//         (e: KeyboardEvent) => {
//             if (e.key === "Escape") onDismiss()
//         },
//         [onDismiss]
//     )

//     useEffect(() => {
//         document.addEventListener("keydown", onKeyDown)
//         return () => document.removeEventListener("keydown", onKeyDown)
//     }, [onKeyDown])

//     return (
//         <div
//             ref={overlay}
//             className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60"
//             onClick={onClick}
//         >
//             <div
//                 ref={wrapper}
//                 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2"
//             >
//                 {children}
//             </div>
//         </div>
//     )
// }

'use client'
import Link from 'next/link';
import React,{FC} from 'react';
import { Prescription } from '@prisma/client';
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface CardProps{
prescribed:{
  id: string;  
  presc: Prescription;
};
}
const Modals: FC<CardProps> = ({prescribed}) => {
  const {presc} = prescribed; 
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
    <div className='container' >
        <div className="card w-full bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title">{presc.id}</h2>
                <p>{presc.patientName}</p>
                <p>{presc.doctorName}</p>

            <div className="card-actions justify-end">
              <span className='badge badge-neutral mb-3'>{presc.phoneNumber}</span>
                   {/* <Link href ={`/Bloom/${id}`} className="hover:underline btn btn-xs " >
                   Read More...</Link> */}
                </div>
            </div>
        </div>
        
       
     </div>
    <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

     {/* <AnimatePresence>
      {open() && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30" />

          <Dialog.Panel>
            <Dialog.Title>Deactivate account</Dialog.Title>

             
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence> 
    */}
    </>
  )}
  export default Modals