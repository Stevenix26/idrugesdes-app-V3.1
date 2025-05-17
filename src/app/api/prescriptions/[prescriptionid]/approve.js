import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function PUT(request, { params }) {
    const { prescriptionid } = params;
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
        if (prescription.status === 'approved') {
            return NextResponse.json({ error: 'Prescription is already approved' }, { status: 400 });
        }
        const updatedPrescription = await db.prescription.update({
            where: { id: prescription.id },
            data: { status: 'approved' },
        });
        return NextResponse.json(updatedPrescription);
    } catch (error) {
        console.error('Error approving prescription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
// Only allow PUT method for approval