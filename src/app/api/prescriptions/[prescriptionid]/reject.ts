// pages/api/prescriptions/[prescriptionId]/decline.
import { db } from '../../../../lib/db'

import type { NextApiRequest, NextApiResponse } from 'next'



async function updatePrescriptionStatus(prescriptionId: number, reason: string) {
    try {
        // Fetch the prescription by ID
        const prescription = await db.prescription.findUnique({
            where: { id: prescriptionId },
        })

        if (!prescription) {
            throw new Error('Prescription not found')
        }

        // Update the prescription status to "declined" and store the decline reason
        const updatedPrescription = await db.prescription.update({
            where: { id: prescription.id },
            data: { status: 'declined', declineReason: reason },
        })

        return updatedPrescription
    } catch (error) {
        console.error('Error declining prescription:', error)
        throw new Error('Internal Server Error')
    }
}

const inputValidation = /^[a-zA-Z0-9\s.,!?]{1,255}$/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prescriptionId } = req.query
    const { reason } = req.body

    if (typeof prescriptionId !== 'string' || !inputValidation.test(reason)) {
        res.status(400).json({ error: 'Invalid input' })
        return
    }

    try {
        const updatedPrescription = await updatePrescriptionStatus(
            parseInt(prescriptionId, 10),
            reason
        )

        console.log('Prescription updated:', updatedPrescription)
        res.status(200).json(updatedPrescription)
    } catch (error) {
        console.error('Error:', error)
        res.status(error.statusCode || 500).json({ error: error.message })
    }
}