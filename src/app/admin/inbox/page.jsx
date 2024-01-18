import React from 'react'
import Link from 'next/link'
import { db } from '../../../lib/db'


async function getPrescription() {
    const response = await db.prescription.findMany({
        select: {
            id: true,
            patientName: true,
            doctorName: true,
            medication: true,
            createdAt: true,


        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return response;
}

const InboxPage = async () => {

    const prescriptions = await getPrescription();
    console.log(prescriptions)



    return (
        <div className="container" style={{ padding: "30px" }}>
            <div className='grid items-center justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
                {prescriptions.map(item => (
                    <div className="overflow-x-auto">
                        <table  className="table table-zebra">
                            {/* head */}
                            <thead >
                                <tr key={item.id} item={item}>
                                    <th>id</th>
                                    <th>Patient Name</th>
                                    <th>Doctor Name</th>
                                    <th>Medication</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>{item.id}</th>
                                    <td>{item.patientName}</td>
                                    <td>{item.doctorName}</td>
                                    <td>{item.medication}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                ))}
            </div>

           



            
        </div>





    )
}

export default InboxPage