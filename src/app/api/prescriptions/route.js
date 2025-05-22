import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@clerk/nextjs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get the user's role
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })

        // Check if user has permission to view prescriptions
        if (!user || (user.role !== 'ADMIN' && user.role !== 'PHARMACIST')) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Fetch all prescriptions with related data
        const prescriptions = await db.prescription.findMany({
            orderBy: [
                { status: 'asc' }, // PENDING first, then APPROVED, then REJECTED
                { createdAt: 'desc' } // Most recent first
            ],
            include: {
                patient: {
                    select: {
                        name: true
                    }
                },
                doctor: {
                    select: {
                        name: true
                    }
                }
            }
        })

        // Format the prescriptions for the frontend
        const formattedPrescriptions = prescriptions.map(prescription => ({
            id: prescription.id,
            patientName: prescription.patient.name,
            doctorName: prescription.doctor.name,
            medication: prescription.medication,
            status: prescription.status,
            createdAt: prescription.createdAt,
            updatedAt: prescription.updatedAt,
            declineReason: prescription.declineReason
        }))

        return NextResponse.json(formattedPrescriptions)
    } catch (error) {
        console.error('Error fetching prescriptions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch prescriptions' },
            { status: 500 }
        )
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const patientName = formData.get('patientName');
        const medication = formData.get('medication');
        const doctorName = formData.get('doctorName');
        const phoneNumber = formData.get('phoneNumber');
        const prescriptionDate = formData.get('prescriptionDate');
        const file = formData.get('uploadedPrescription');

        if (!patientName || !medication || !doctorName || !phoneNumber || !prescriptionDate || !file) {
            return NextResponse.json({
                message: 'Missing required fields',
                received: {
                    patientName: !!patientName,
                    medication: !!medication,
                    doctorName: !!doctorName,
                    phoneNumber: !!phoneNumber,
                    prescriptionDate: !!prescriptionDate,
                    file: !!file
                }
            }, { status: 400 });
        }

        // Upload image to Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'prescriptions',
                    allowed_formats: ['jpg', 'png', 'pdf'],
                    resource_type: 'auto'
                },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        const prescription = await db.prescription.create({
            data: {
                patientName,
                medication,
                doctorName,
                phoneNumber,
                prescriptionDate,
                prescriptionFilePath: uploadResult.secure_url,
            },
        });

        return NextResponse.json({ message: 'Prescription created successfully', prescription }, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'Duplicate prescription' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Remove unused/duplicate handlers