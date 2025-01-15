// pages/prescriptions.js
import React, { FC } from 'react';
import { db } from '../../../lib/db';
import PrescriptionButtonAction from '../../components/PrescriptionButtonAction';

interface PageProps{
  params:{
    id: string;
  };
}


async function getPrescription(id: string) {
    const response = await db.prescription.findFirst({
        where:{
            id: id
        },
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




const Prescriptions: FC<PageProps> = async ({params}) => {
    const prescriptions = await getPrescription(params.id);

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
                        
                                <tr >
                                    <td>{prescriptions?.id}</td>
                                    <td>{prescriptions?.patientName}</td>
                                    <td>{prescriptions?.medication}</td>
                                    <td>{prescriptions?.phoneNumber}</td>
                                    <td>{prescriptions?.doctorName}</td>
                                    <td>{prescriptions?.createdAt.toString().slice(3, 15)}</td>
                                    <td>{prescriptions?.createdAt.getUTCHours()}</td>
                                    <td>
                                        <span className=' badge badge-warning items-center justify-between'>{prescriptions?.status}</span></td>
                                    {/* <td>
                                        <modalsList/>
                                    </td> */}
                                    <td className='flex'>
                                        {/* <button className="outlined btn btn-errorr" 
                                        // onClick={() => handleDelete(prescription.id)}
                                        >
                                            Delete
                                        </button> */}
                                        <PrescriptionButtonAction id={params.id}/>
                                    </td>


                                </tr>
                            
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

