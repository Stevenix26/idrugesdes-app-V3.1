import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const imageFile = formData.get('image');
    let image = '';
    if (imageFile && typeof imageFile === 'object' && imageFile.arrayBuffer) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        // Upload to sellerstore folder
        const uploadSellerStore = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'sellerstore' }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }).end(buffer);
        });
        // Upload to store folder
        const uploadStore = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'store' }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }).end(buffer);
        });
        // Use the URL from one of the uploads (e.g., sellerstore)
        image = uploadSellerStore.secure_url;
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