import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(req) {
    try {
        const prescriptions = await db.prescription.findMany({
            select: {
                id: true,
                patientName: true,
                medication: true,
                doctorName: true,
                phoneNumber: true,
                prescriptionDate: true,
                prescriptionFilePath: true,
                status: true,
                declineReason: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
        const file = formData.get('file');

        if (!patientName || !medication || !doctorName || !phoneNumber || !prescriptionDate || !file) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Upload image to Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'prescriptions' }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
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