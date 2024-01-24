// pages/prescriptions.js
'use client'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../../../lib/db';



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
    

    return (
        <div className=' overflow-x-auto'>
            <h1>Prescriptions</h1>
            <table className='table table-xs'>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Medication</th>
                        <th>Phone Number</th>
                        <th>Doctor Name</th>
                        <th>Prescription Date</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((prescription) => (
                        <tr key={prescription.id}>
                            <td>{prescription.patientName}</td>
                            <td>{prescription.medication}</td>
                            <td>{prescription.phoneNumber}</td>
                            <td>{prescription.doctorName}</td>
                            <td>{prescription.prescriptionDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Prescriptions;
