import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function getPrescriptions(req, res) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not uyuyuyuy Allowed' }, { status: 405 })
    }

    try {
        const { patientname, medication, doctorName, phoneNumber, prescriptionDate } = req.body

        if (!patientname || !medication || !doctorName || !phoneNumber || !prescriptionDate) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
        }

        const prescription = await db.prescription.create({
            data: {
                patientname,
                medication,
                doctorName,
                phoneNumber,
                prescriptionDate,
            },
        })

        console.log('Prescription created:', prescription)

        return NextResponse.json({ message: 'Prescription created successfully' }, { status: 201 })

    } catch (error) {
        console.error('Error:', error)

        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'Duplicate prescription' }, { status: 409 })
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    } finally {
        await db.$disconnect()
    }
}

export async function postPrescriptions(req, res) {
    try {
        // Your logic for handling the POST request
        // ...

        // Send a response
        res.status(201).json({ message: 'POST request handled successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}