// // pages/index.js
// 'use client'
// import Image from "next/image";
// import PrescriptionList from "./prescriptionList/page";

// export default function Home() {
//   return (
//     <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
//       <div 
//         // className="grid gap-1 items-center justify-between"
//         className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
      
//         <div className="flex flex-col gap-4 py-1 ">
//         <div 
//         // className=" col-span-5 row-start-2 flex flex-col gap-8 xl:col-span-2 xl:row-start-1">
//             className="bg-base-300 rounded-b-box rounded-se-box relative overflow-x-auto">
//           <div 
//           // className="w-full col-span-5 items-center justify-center row-start-1 flex flex-col gap-6 xl:col-span-3 xl:row-start-1"
//             className="preview border-base-300 bg-base-100 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
          
          
//             <a>
//             <Image className="bg-contain object-fill aspect-[4/3]" width={200} height={200} src="/images/drug1.jpg" />
//             </a>
//           </div>
//           </div>
//           {/* You can open the modal using document.getElementById('ID').showModal() method */}
//           <button className="btn btn-secondary" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
//           <dialog id="my_modal_3" className="modal">
//             <div className="modal-box">
//               <form method="dialog">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//               </form>
//               <h3 className="font-bold text-lg">Hello!</h3>
//               <p className="py-4">Press ESC key or click on ✕ button to close</p>
//               <button className="btn">
//                 submit
//               </button>
//             </div>
//           </dialog>
//             <div className="modal-toggle modal modal-box">
//                 Hello Boys

//             </div>
//         </div>
//         <div className="drawer drawer-end">
//           <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//           <div className="drawer-content">
//             {/* Page content here */}
//             <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
//           </div>
//           <div className="drawer-side">
//             <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//             <ul className="menu p-4 w-50 min-h-full bg-base-200 text-base-content">
//               {/* Sidebar content here */}
//               <li><a>Sidebar Item 1</a></li>
//               <li><a>Sidebar Item 2</a></li>
//             </ul>
//           </div>
//         </div>
//         <div>
//           1
//         </div>
//       {/* <h1 className="text-2xl font-bold mb-4">Prescription List</h1> */}
//       {/* <PrescriptionList /> */}
//       </div>
//     </div>
//   );
// }

// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'
// import { db } from '../../lib/db';



// async function getPrescription() {
//   const response = await db.prescription.findMany({
//     select: {
//       id: true,
//       patientName: true,
//       medication: true,
//       doctorName: true,
//       phoneNumber: true,
//       prescriptionDate: true,
//       prescriptionFilePath: true,
//       status: true,
//       declineReason: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   });
//   return response;
// }


// export default async function UserPrescriptions() {

//   const prescriptions = await getPrescription();


//   let [isOpen, setIsOpen] = useState(true)

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

//   return (
//     <>
//       <section>
//         <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
//           <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
//             <div className=" w-full max-w-4xl flex-grow pt-10">
//               <h1>Prescriptions</h1>
//               <div className="relative mb-10 mt-6 shadow-md">
//                 <table className='table-xs md:table-sm table-pin-rows table w-full'>
//                   <thead>
//                     <tr className='bg-base-300 border-b-0 font-bold'>
//                       <th>Prescription ID</th>
//                       <th>Patient Name</th>
//                       <th>Medication</th>
//                       <th>Phone Number</th>
//                       <th>Doctor Name</th>
//                       <th>Request Date</th>
//                       <th>posted</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {prescriptions.map((prescription) => (
//                       <tr key={prescription.id}>
//                         <td>{prescription.id}</td>
//                         <td>{prescription.patientName}</td>
//                         <td>{prescription.medication}</td>
//                         <td>{prescription.phoneNumber}</td>
//                         <td>{prescription.doctorName}</td>
//                         <td>{prescription.createdAt.toString().slice(3, 15)}</td>
//                         <td>{prescription.createdAt.getUTCHours()}</td>
//                         <td>
//                           <span className=' badge badge-warning items-center justify-between'>{prescription.status}</span></td>
//                         {/* <td>
//                                         <modalsList/>
//                                     </td> */}
//                         <td className='flex'>
//                           {/* <button className="mr-2 btn btn-success" onClick={() => handlePreview(prescription)}>
//                             Preview
//                           </button>
//                           <button className="outlined btn btn-errorr" onClick={() => handleDelete(prescription.id)}>
//                             Delete
//                           </button> */}
//                           <div className="inset-0 flex items-center justify-center">
//                             <button
//                               type="button"
//                               onClick={openModal}
//                               className=" btn btn-primary rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
//                             >
//                               Preview
//                             </button>
//                           </div>
//                         </td>


//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//               </div>
//             </div>
//           </div>
//         </div>
//       </section>  
      

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Payment successful
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Your payment has been successfully submitted. We’ve sent
//                       you an email with all of the details of your order.
//                     </p>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       Got it, thanks!
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }

'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { db } from '../../lib/db';

export default function UserPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await getPrescription();
        setPrescriptions(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array means this effect runs once after initial render

  async function getPrescription() {
    const response = await db.prescription.findMany({
      select: {
        id: true,
        patientName: true,
        medication: true,
        doctorName: true,
        phoneNumber: true,
        prescriptionDate: true,
        prescriptionFilePath: true,
        status: true,
        declineReason: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return response;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <section>
        <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
          <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            <div className=" w-full max-w-4xl flex-grow pt-10">
              <h1>Prescriptions</h1>
              <div className="relative mb-10 mt-6 shadow-md">
                <table className='table-xs md:table-sm table-pin-rows table w-full'>
                  <thead>
                    <tr className='bg-base-300 border-b-0 font-bold'>
                      <th>Prescription ID</th>
                      <th>Patient Name</th>
                      <th>Medication</th>
                      <th>Phone Number</th>
                      <th>Doctor Name</th>
                      <th>Request Date</th>
                      <th>posted</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id}>
                        <td>john</td>
                        <td>{prescription.id}</td>
                        <td>{prescription.patientName}</td>
                        <td>{prescription.medication}</td>
                        <td>{prescription.phoneNumber}</td>
                        <td>{prescription.doctorName}</td>
                        <td>{prescription.createdAt.toString().slice(3, 15)}</td>
                        <td>{prescription.createdAt.getUTCHours()}</td>
                        <td>
                          <span className=' badge badge-warning items-center justify-between'>{prescription.status}</span></td>
                        {/* <td>
                                        <modalsList/>
                                    </td> */}
                        <td className='flex'>
                          {/* <button className="mr-2 btn btn-success" onClick={() => handlePreview(prescription)}>
                            Preview
                          </button>
                          <button className="outlined btn btn-errorr" onClick={() => handleDelete(prescription.id)}>
                            Delete
                          </button> */}
                          <div className="inset-0 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={openModal}
                              className=" btn btn-primary rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                              Preview
                            </button>
                          </div>
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </section> 

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


      {/* <!-- Modal toggle --> */}
      <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button>

      {/* <!-- Main modal --> */}
      <div id="default-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
              <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

