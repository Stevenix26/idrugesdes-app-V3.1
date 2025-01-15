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


// pages/prescriptions.js
import React from 'react';
import { db } from '../../../lib/db';

const statusColor = {
    approved: "success",
    pending: "warning",
    rejected: "error"
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
            createdAt: 'desc'
        }
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

        <section>
            <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
                <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
                    <div className=" w-full max-w-4xl flex-grow pt-10">
                        <h1 className=' text-4xl font-semibold text-indigo-900  '>Prescriptions</h1>
                        <div className="relative mb-10 mt-6 shadow-md">
                            <table className='table-pin-rows table table-zebra-zebra bg-inherit text-indigo-900 table-zebra border border-l-2 border-r-5  border-r-indigo-500 border-l-indigo-500 shadow-lg table-sm md:table-sm w-full'>
                                <thead className=''>
                                    <tr className=' border-b-0 border font-bold text-md text-white bg-indigo-500'>
                                        <th>Prescription ID</th>
                                        <th>Patient Name</th>
                                        <th>Medication</th>
                                        <th>Phone Number</th>
                                        <th>Doctor Name</th>
                                        <th>Request Date</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {prescriptions.map((prescription) => (
                                        <tr key={prescription.id}>
                                            <td>{prescription.id}</td>
                                            <td>{prescription.patientName}</td>
                                            <td>{prescription.medication}</td>
                                            <td>{prescription.phoneNumber}</td>
                                            <td>{prescription.doctorName}</td>
                                            <td>{prescription.createdAt.toString().slice(3, 15)}</td>

                                            <td>
                                                <span className={`badge text-white badge-${pictures[prescription.status]}  items-center justify-between`}> {prescription.status}</span></td>
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

