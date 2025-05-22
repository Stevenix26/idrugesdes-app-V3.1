import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function PUT(request, { params }) {
    const { prescriptionid } = params;

    // Validate prescription ID
    if (!prescriptionid) {
        return NextResponse.json({ error: 'Invalid prescription ID' }, { status: 400 });
    }

    try {
        // Parse and validate the prescription ID
        const prescriptionIdNumber = Number.parseInt(prescriptionid, 10);
        if (isNaN(prescriptionIdNumber)) {
            return NextResponse.json({ error: 'Invalid prescription ID format' }, { status: 400 });
        }

        // Find the prescription
        const prescription = await db.prescription.findUnique({
            where: { id: prescriptionIdNumber },
        });

        if (!prescription) {
            return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
        }

        // Check if already approved
        if (prescription.status === 'approved') {
            return NextResponse.json({ error: 'Prescription is already approved' }, { status: 400 });
        }

        // Update the prescription status
        const updatedPrescription = await db.prescription.update({
            where: { id: prescription.id },
            data: {
                status: 'approved',
                updatedAt: new Date()
            },
        });

        return NextResponse.json({
            message: 'Prescription approved successfully',
            prescription: updatedPrescription
        });
    } catch (error) {
        console.error('Error approving prescription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}

// Only allow PUT method for approval