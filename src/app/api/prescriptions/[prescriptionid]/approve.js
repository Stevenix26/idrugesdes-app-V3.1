// pages/api/prescriptions/[prescriptionId]/approve.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { prescriptionId } = req.query;

    try {
        // Fetch the prescription by ID
        const prescription = await prisma.prescription.findUnique({
            where: { id: parseInt(prescriptionId, 10) },
        });

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        // Update the prescription status to "approved"
        const updatedPrescription = await prisma.prescription.update({
            where: { id: prescription.id },
            data: { status: 'approved' },
        });

        res.status(200).json(updatedPrescription);
    } catch (error) {
        console.error('Error approving prescription:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
