import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@clerk/nextjs'
import { prisma } from '../../../lib/prisma'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Validate file type and size
const validateFile = (file) => {
    if (!file) return { valid: false, error: 'No file provided' };

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Only JPEG, PNG, and PDF files are allowed'
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'File size too large. Maximum size is 5MB'
        };
    }

    return { valid: true };
};

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
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        let prescriptions;
        try {
            if (user.role === 'ADMIN') {
                // Admin can see all prescriptions
                prescriptions = await prisma.prescription.findMany({
                    include: {
                        patient: true,
                        pharmacist: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            } else if (user.role === 'PHARMACIST') {
                // Pharmacists can see prescriptions assigned to them
                prescriptions = await prisma.prescription.findMany({
                    where: {
                        pharmacistId: userId
                    },
                    include: {
                        patient: true,
                        pharmacist: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            } else {
                // Patients can only see their own prescriptions
                prescriptions = await prisma.prescription.findMany({
                    where: {
                        patientId: userId
                    },
                    include: {
                        patient: true,
                        pharmacist: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }

            return NextResponse.json(prescriptions);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            return NextResponse.json({
                error: 'Failed to fetch prescriptions',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in prescriptions GET:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();

        // Extract and trim all form fields
        const fields = {
            patientName: formData.get('patientName')?.toString().trim(),
            medication: formData.get('medication')?.toString().trim(),
            doctorName: formData.get('doctorName')?.toString().trim(),
            dosage: formData.get('dosage')?.toString().trim(),
            frequency: formData.get('frequency')?.toString().trim(),
            quantity: formData.get('quantity')?.toString().trim(),
            instructions: formData.get('instructions')?.toString().trim(),
            phoneNumber: formData.get('phoneNumber')?.toString().trim(),
            prescriptionDate: formData.get('prescriptionDate')?.toString().trim()
        };

        const file = formData.get('uploadedPrescription');

        // Validate required fields
        const requiredFields = ['patientName', 'medication', 'doctorName', 'dosage', 'frequency', 'phoneNumber'];
        const missingFields = requiredFields.filter(field => !fields[field]);

        if (missingFields.length > 0) {
            return NextResponse.json({
                error: 'Missing required fields',
                missingFields,
                message: `Please provide the following required fields: ${missingFields.join(', ')}`,
                received: fields
            }, { status: 400 });
        }

        // Validate file
        if (!file) {
            return NextResponse.json({
                error: 'Missing prescription file',
                message: 'Please upload a prescription file'
            }, { status: 400 });
        }

        const fileValidation = validateFile(file);
        if (!fileValidation.valid) {
            return NextResponse.json({
                error: 'Invalid file',
                message: fileValidation.error
            }, { status: 400 });
        }

        // Upload image to Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());
        let uploadResult;
        try {
            uploadResult = await new Promise((resolve, reject) => {
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
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return NextResponse.json({
                error: 'Failed to upload prescription file',
                details: process.env.NODE_ENV === 'development' ? uploadError.message : undefined
            }, { status: 500 });
        }

        // Create prescription in database
        try {
            const prescription = await prisma.prescription.create({
                data: {
                    patientId: userId,
                    patientName: fields.patientName,
                    doctorName: fields.doctorName,
                    medication: fields.medication,
                    dosage: fields.dosage,
                    frequency: fields.frequency,
                    quantity: fields.quantity ? parseInt(fields.quantity) : 1,
                    instructions: fields.instructions || null,
                    phoneNumber: fields.phoneNumber,
                    prescriptionDate: fields.prescriptionDate || new Date().toISOString(),
                    prescriptionFilePath: uploadResult.secure_url,
                    status: 'pending'
                }
            });

            return NextResponse.json(prescription);
        } catch (dbError) {
            console.error('Database error:', dbError);
            // If database creation fails, try to delete the uploaded file
            try {
                await cloudinary.uploader.destroy(uploadResult.public_id);
            } catch (deleteError) {
                console.error('Failed to delete uploaded file:', deleteError);
            }
            return NextResponse.json({
                error: 'Failed to create prescription',
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in prescriptions POST:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}

// Remove unused/duplicate handlers