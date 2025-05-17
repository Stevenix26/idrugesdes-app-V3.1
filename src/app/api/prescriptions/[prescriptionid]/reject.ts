import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

const inputValidation = /^[a-zA-Z0-9\s.,!?]{1,255}$/

export async function PUT(request, { params }) {
    const { prescriptionid } = params;
    let reason;
    try {
        const body = await request.json();
        reason = body.reason;
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const prescriptionIdNumber = Number.parseInt(prescriptionid, 10);
    if (
        !prescriptionid ||
        Number.isNaN(prescriptionIdNumber) ||
        typeof reason !== 'string' ||
        reason.trim().length === 0 ||
        !inputValidation.test(reason)
    ) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    try {
        const prescription = await db.prescription.findUnique({
            where: { id: prescriptionIdNumber },
        });
        if (!prescription) {
            return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
        }
        const updatedPrescription = await db.prescription.update({
            where: { id: prescription.id },
            data: { status: 'declined', declineReason: reason },
        });
        return NextResponse.json(updatedPrescription);
    } catch (error) {
        console.error('Error declining prescription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
// Only allow PUT method for rejection