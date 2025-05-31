import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '../../../../lib/prisma';

export async function PATCH(req, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the user's role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user || user.role !== 'PHARMACIST') {
            return NextResponse.json({ error: 'Only pharmacists can update prescription status' }, { status: 403 });
        }

        const { prescriptionId } = params;
        const { status, notes } = await req.json();

        if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        // Update the prescription
        const updatedPrescription = await prisma.prescription.update({
            where: { id: prescriptionId },
            data: {
                status,
                pharmacist: {
                    connect: { id: userId }
                },
                pharmacistNotes: notes,
                updatedAt: new Date()
            },
            include: {
                patient: true,
                pharmacist: true,
                medications: true
            }
        });

        return NextResponse.json(updatedPrescription);
    } catch (error) {
        console.error('Error updating prescription:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { prescriptionId } = params;

        // Get the user's role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get the prescription
        const prescription = await prisma.prescription.findUnique({
            where: { id: prescriptionId },
            include: {
                patient: true,
                pharmacist: true,
                medications: true
            }
        });

        if (!prescription) {
            return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
        }

        // Check if user has access to this prescription
        if (user.role === 'PATIENT' && prescription.patientId !== userId) {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }

        return NextResponse.json(prescription);
    } catch (error) {
        console.error('Error fetching prescription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 