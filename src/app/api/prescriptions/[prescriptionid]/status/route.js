import { db } from '../../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    const { prescriptionid } = params;
    const { status, declineReason } = await request.json();

    if (!prescriptionid) {
        return NextResponse.json({ error: 'Invalid prescription ID' }, { status: 400 });
    }

    try {
        const prescriptionIdNumber = Number.parseInt(prescriptionid, 10);
        const prescription = await db.prescription.findUnique({
            where: { id: prescriptionIdNumber },
        });

        if (!prescription) {
            return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
        }

        const updatedPrescription = await db.prescription.update({
            where: { id: prescriptionIdNumber },
            data: {
                status,
                ...(status === 'rejected' && { declineReason }),
            },
        });

        return NextResponse.json(updatedPrescription);
    } catch (error) {
        console.error('Error updating prescription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}