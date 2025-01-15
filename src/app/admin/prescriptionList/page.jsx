// pages/prescriptions.js
import React, { FC } from 'react'
import { db } from '../../../lib/db';
import PrescriptionButtonAction from '../../components/PrescriptionButtonAction';


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
                                        {/* <button className="outlined btn btn-errorr" 
                                        // onClick={() => handleDelete(prescription.id)}
                                        >
                                            Delete
                                        </button> */}
                                        <PrescriptionButtonAction/>
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

