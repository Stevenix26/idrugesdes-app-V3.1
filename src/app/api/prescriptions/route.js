// pages/api/prescriptions.js
import { PrismaClient } from '@prisma/client';
import uploadMiddleware from '../../middleware/uploadMiddleware';

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false, // Disable the default bodyParser as we will handle it ourselves
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            uploadMiddleware(req, res, async () => {
                const prescription = await prisma.prescription.create({
                    data: {
                        patientName: req.body.patientName,
                        doctorName: req.body.doctorName,
                        medication: req.body.medication,
                        prescriptionFilePath: req.file ? `/uploads/${req.file.filename}` : null,
                    },
                });

                res.status(201).json(prescription);
            });
        } catch (error) {
            console.error('Error creating prescription:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
