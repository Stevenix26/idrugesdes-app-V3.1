// api/createStore.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { patientname, medication, doctorName } = req.body;

        // Use Prisma Client to create a store in the database
        const prescriptions = await prisma.prescription.create({
            data: {
                patientname,
                medication,
                doctorName,
            },
        });

        console.log('Store created:', prescriptions);

        return res.status(201).json({ message: 'precription created successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
