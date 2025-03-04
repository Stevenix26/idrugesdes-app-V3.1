// pages/prescriptions.js
import React from "react";
import { db } from "../../../lib/db";

const statusColor = {
  approved: "success",
  pending: "warning",
  rejected: "error",
};

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
      createdAt: "desc",
    },
  });
  return response;
}

const Prescriptions = async () => {
  const prescriptions = await getPrescription();
  const pictures = statusColor;

  // const handlePreview = (prescription) => {
  //     setSelectedPrescription(prescription);
  //     setIsPreviewModalOpen(true);
  // };

  // const handleDelete = async (id) => {
  //     try {
  //         // Delete the selected prescription from the database using Db
  //         await db.prescription.delete({
  //             where: { id },
  //         });

  //         // Update the prescriptions list after deletion
  //         const updatedPrescriptions = prescriptions.filter((prescription) => prescription.id !== id);
  //         setPrescriptions(updatedPrescriptions);

  //         console.log('Prescription deleted successfully!');
  //     } catch (error) {
  //         // Handle error, show a message, or perform error logging
  //         console.error('Error deleting prescription:', error);
  //     }
  // };

  return (
    <>
      <section className="w-full bg-gradient-to-bl from-orange-50 to-slate-100  ">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-orange-400 shadow-2xl "
            fill="#0099ff"
            fill-opacity="0.15"
            d="M0,32L14.1,32C28.2,32,56,32,85,64C112.9,96,141,160,169,202.7C197.6,245,226,267,254,277.3C282.4,288,311,288,339,250.7C367.1,213,395,139,424,117.3C451.8,96,480,128,508,128C536.5,128,565,96,593,80C621.2,64,649,64,678,90.7C705.9,117,734,171,762,202.7C790.6,235,819,245,847,234.7C875.3,224,904,192,932,176C960,160,988,160,1016,186.7C1044.7,213,1073,267,1101,245.3C1129.4,224,1158,128,1186,96C1214.1,64,1242,96,1271,106.7C1298.8,117,1327,107,1355,96C1383.5,85,1412,75,1426,69.3L1440,64L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"
          ></path>
        </svg> */}
        <div className="max-w-[60vw] lg:max-w-[100vw] md:max-w-[300px] px-3 pb-16 xl:pr-2">
          <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row bg">
            <div className="  w-full max-w-4xl flex-grow pt-10">
              <h1 className=" text-4xl justify-center uppercase  font-semibold text-indigo-900  ">
                Prescriptions
              </h1>
              <div className="rounded-2xl overflow-scroll overflow-y-hidden mb-10 mt-3 shadow-md">
                <table className="table-pin-rows table-pin-cols table-zebra-zebra bg-inherit text-indigo-900 table-zebra border border-l-2 border-r-5  shadow-inner table-sm md:table-md sm:table-sm ">
                  <thead className="">
                    <tr className=" tabs-bordered border-b-0 border font-bold text-md text-white bg-gradient-to-tr from-indigo-300 to-orange-200 ">
                      <th>Prescription ID</th>
                      <th>Patient Name</th>
                      <th>Medication</th>
                      <th>Phone Number</th>
                      <th>Doctor Name</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id} className="">
                        <td>{prescription.id}</td>
                        <td>{prescription.patientName}</td>
                        <td>{prescription.medication}</td>
                        <td>{prescription.phoneNumber}</td>
                        <td>{prescription.doctorName}</td>
                        <td>
                          {prescription.createdAt.toString().slice(3, 15)}
                        </td>

                        <td>
                          <span
                            className={`badge-${pictures[prescription.status]} badge  items-center justify-between`}
                          >
                            {" "}
                            {prescription.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            actions
                            <div
                              tabIndex={0}
                              role="button"
                              className="  z-[1] btn btn-outline dropdown-content dropdown-top drop-shadow-xl shadow-inner shadow-indigo-600 btn-primary"
                            ></div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                            >
                              <li>
                                <a href="">jdnjwndjw</a>
                              </li>
                              <li>
                                <a href="">dwdhbdhwbd</a>
                              </li>
                            </ul>
                          </div>
                        </td>
                        {/* <td>
                                        <modalsList/>
                                    </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prescriptions;

// 'use client'
// // pages/prescriptions.js
// import React, { useState, useEffect } from 'react';
// import { db } from '../../../lib/db';

// // Modal Component
// const Modal = ({ prescription, onClose, onAccept, onDecline }) => {
//     return (
//         <dialog className="modal" open>
//             <div className="modal-box">
//                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
//                 <h3 className="font-bold text-lg">{prescription.patientName}</h3>
//                 <p className="py-4">{prescription.medication}</p>
//                 <button className="btn" onClick={onDecline}>Decline</button>
//                 <button className="btn" onClick={onAccept}>Accept</button>
//             </div>
//         </dialog>
//     );
// };

// const Prescriptions = () => {
//     const [prescriptions, setPrescriptions] = useState([]);
//     const [selectedPrescription, setSelectedPrescription] = useState(null);

//     useEffect(() => {
//         async function fetchPrescriptions() {
//             try {
//                 const response = await getPrescription();
//                 setPrescriptions(response);
//             } catch (error) {
//                 console.error("Error fetching prescriptions: ", error);
//             }
//         }
//         fetchPrescriptions();
//     }, []);

//     async function getPrescription() {
//         const response = await db.prescription.findMany({
//             select: {
//                 id: true,
//                 patientName: true,
//                 medication: true,
//                 doctorName: true,
//                 phoneNumber: true,
//                 prescriptionDate: true,
//                 prescriptionFilePath: true,
//                 status: true,
//                 declineReason: true,
//                 createdAt: true,
//                 updatedAt: true,
//             },
//             orderBy: {
//                 createdAt: 'desc'
//             }
//         });
//         return response;
//     }

//     const handleModalClose = () => {
//         setSelectedPrescription(null);
//     };

//     const handleAccept = async () => {
//         // Implement accept functionality here
//         // You can update the status of the prescription in the database
//         // Example: await db.prescription.update({...});
//         handleModalClose();
//     };

//     const handleDecline = async () => {
//         // Implement decline functionality here
//         // You can update the status of the prescription in the database
//         // Example: await db.prescription.update({...});
//         handleModalClose();
//     };

//     return (
//         <div className='overflow-x-auto'>
//             <h1>Prescriptions</h1>
//             <table className='table table-xs'>
//                 <thead>
//                     <tr>
//                         <th>Patient Name</th>
//                         <th>Medication</th>
//                         <th>Phone Number</th>
//                         <th>Doctor Name</th>
//                         <th>Prescription Date</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {prescriptions.map((prescription) => (
//                         <tr key={prescription.id}>
//                             <td>{prescription.patientName}</td>
//                             <td>{prescription.medication}</td>
//                             <td>{prescription.phoneNumber}</td>
//                             <td>{prescription.doctorName}</td>
//                             <td>{prescription.prescriptionDate}</td>
//                             <td>
//                                 <button className="btn" onClick={() => setSelectedPrescription(prescription)}>Open Modal</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {selectedPrescription && (
//                 <Modal
//                     prescription={selectedPrescription}
//                     onClose={handleModalClose}
//                     onAccept={handleAccept}
//                     onDecline={handleDecline}
//                 />
//             )}
//         </div>
//     );
// };

// export default Prescriptions;

// // pages/submitted.js
// 'use client'
// import { useEffect, useState } from 'react';
// import { db } from '../../../lib/db';
// // import {useQuery} from '@tanstack/react-query'

// // import { Modal } from '@mui/material';
// // Update the path based on your project structure

// const Submitted = () => {
//   // const prescriptioning = getPrescription();
//   const [prescriptions, setPrescriptions] = useState(null);
//   const [selectedPrescription, setSelectedPrescription] = useState(null);
//   const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

//   // const {isloading, error, data} = useQuery({
//   //   queryKey: ["prescriptions"],
//   //   queryFn: ()=>
//   //     fetch("http://localhost:300/api/prescription").then((res)=> res.json()),

//   // });

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         // Fetch all prescriptions from the database using Db
//         const data = await db.prescription.findMany({
//           select: {
//           id: true,
//           patientName: true,
//           medication: true,
//           doctorName: true,
//           phoneNumber: true,
//           prescriptionDate: true,
//           prescriptionFilePath: true,
//           status: true,
//           declineReason: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//           orderBy: {
//           createdAt: 'desc'
//         }
//       }

//         );
//         setPrescriptions(data);
//       } catch (error) {
//         // Handle error, show a message, or perform error logging
//         console.error('Error fetching prescriptions:', error);
//       }
//     };

//     fetchPrescriptions();
//   }, []);

//   const handlePreview = (prescription) => {
//     setSelectedPrescription(prescription);
//     setIsPreviewModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Delete the selected prescription from the database using Db
//       await db.prescription.delete({
//         where: { id },
//       });

//       // Update the prescriptions list after deletion
//       const updatedPrescriptions = prescriptions.filter((prescription) => prescription.id !== id);
//       setPrescriptions(updatedPrescriptions);

//       console.log('Prescription deleted successfully!');
//     } catch (error) {
//       // Handle error, show a message, or perform error logging
//       console.error('Error deleting prescription:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen p-3 flex items-center bg-stripe-gradient justify-center">
//       <div className="card bg-pharmacy-primary-800 p-8 rounded-lg shadow-lg">
//         <h2 className="mb-4 text-2xl font-bold text-dark text-center">Submitted Prescriptions</h2>
//         {prescriptions? (
//           <table className=' bordered hover responsive striped' >
//             <thead>
//               <tr>
//                 <th>Patient Name</th>
//                 <th>Medication</th>
//                 <th>Doctor Name</th>
//                 <th>Prescription Date</th>
//                 <th>Actions</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {prescriptions.map((prescription) => (
//                 <tr key={prescription.id}>
//                   <td>{prescription.patientName}</td>
//                   <td>{prescription.medication}</td>
//                   <td>{prescription.doctorName}</td>
//                   <td>{prescription.prescriptionDate}</td>
//                   <td>{prescription.createdAt.toString().slice(0,10)}</td>
//                   <td>
//                     <button color="success" variant="outlined" className="mr-2 btn btn-success" onClick={() => handlePreview(prescription)}>
//                       Preview
//                     </button>
//                     <button color="error" variant="outlined btn btn-danger" onClick={() => handleDelete(prescription.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-dark text-center">No prescriptions submitted yet.</p>
//         )}
//         <button  className="mt-4 btn btn-sm btn-outline " href="/dashboard/prescription">
//           Back to Submission Page
//         </button>
//       </div>

//       <div className='modal modal-action' visible={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
//         {selectedPrescription && (
//           <div className="p-3">
//             <h2 className="mb-4 text-2xl font-bold">Prescription Preview</h2>
//             <p><strong>Patient Name:</strong> {selectedPrescription.patientName}</p>
//             <p><strong>Medication:</strong> {selectedPrescription.medication}</p>
//             <p><strong>Doctor Name:</strong> {selectedPrescription.doctorName}</p>
//             <p><strong>Prescription Date:</strong> {selectedPrescription.prescriptionDate}</p>
//             {selectedPrescription.uploadedPrescription && (
//               <p><strong>Uploaded Prescription:</strong> {selectedPrescription.uploadedPrescription}</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // export async function getServerSideProps() {
// //   try {
// //     // Fetch prescriptions data on the server side
// //     const prescriptions = await getPrescription();
// //     return {
// //       props: { prescriptions }
// //     };
// //   } catch (error) {
// //     console.error('Error fetching prescriptions:', error);
// //     return {
// //       props: { prescriptions: [] }
// //     };
// //   }
// // }

// export default Submitted;
