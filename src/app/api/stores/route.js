import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export async function GET() {
    const stores = await prisma.pharmacyStore.findMany();
    return NextResponse.json(stores);
}

export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const pcn = formData.get('pcn');
    // For image, you may want to handle file upload to a storage service and save the URL
    // Here, we'll just save the filename as a placeholder
    const imageFile = formData.get('image');
    let image = '';
    if (imageFile && typeof imageFile.name === 'string') {
        image = imageFile.name;
    }
    const newStore = await prisma.pharmacyStore.create({
        data: {
            name,
            description,
            address,
            phoneNumber: phone,
            pcn,
            image
        }
    });
    return NextResponse.json(newStore, { status: 201 });
}