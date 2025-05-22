import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@clerk/nextjs'
import { prisma } from '../../../lib/prisma'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get the user's role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        let prescriptions
        if (user.role === 'ADMIN') {
            // Admin can see all prescriptions
            prescriptions = await prisma.prescription.findMany({
                include: {
                    patient: true,
                    pharmacist: true,
                    medications: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        } else if (user.role === 'PHARMACIST') {
            // Pharmacists can see prescriptions assigned to them
            prescriptions = await prisma.prescription.findMany({
                where: {
                    pharmacistId: userId
                },
                include: {
                    patient: true,
                    pharmacist: true,
                    medications: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        } else {
            // Patients can only see their own prescriptions
            prescriptions = await prisma.prescription.findMany({
                where: {
                    patientId: userId
                },
                include: {
                    patient: true,
                    pharmacist: true,
                    medications: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }

        return NextResponse.json(prescriptions)
    } catch (error) {
        console.error('Error fetching prescriptions:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const medication = formData.get('medication');
        const doctorName = formData.get('doctorName');
        const dosage = formData.get('dosage');
        const frequency = formData.get('frequency');
        const duration = formData.get('duration');
        const notes = formData.get('notes');
        const file = formData.get('uploadedPrescription');

        // Get the current user's data
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, name: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (!medication || !doctorName || !file) {
            return NextResponse.json({
                error: 'Missing required fields',
                received: {
                    medication: !!medication,
                    doctorName: !!doctorName,
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

        // Create the prescription with the new schema
        const prescription = await prisma.prescription.create({
            data: {
                patient: {
                    connect: { id: userId }
                },
                doctorName,
                status: 'PENDING',
                prescriptionFilePath: uploadResult.secure_url,
                dosage,
                frequency,
                duration,
                notes,
                medications: {
                    create: [
                        {
                            name: medication,
                            dosage,
                            frequency,
                            duration
                        }
                    ]
                }
            },
            include: {
                patient: true,
                medications: true
            }
        });

        return NextResponse.json({
            message: 'Prescription created successfully',
            prescription
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating prescription:', error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Duplicate prescription' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Remove unused/duplicate handlers