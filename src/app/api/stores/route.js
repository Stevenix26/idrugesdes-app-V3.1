import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
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
        let uploadSellerStore, uploadStore;
        try {
            // Upload to sellerstore folder
            uploadSellerStore = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: 'sellerstore' }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).end(buffer);
            });
            // Upload to store folder
            uploadStore = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: 'store' }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).end(buffer);
            });
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload store image' }, { status: 500 });
        }
        // Use the URL from one of the uploads (e.g., sellerstore)
        image = uploadSellerStore.secure_url;
    }
    const newStore = await prisma.$transaction(async (tx) => {
        return await tx.pharmacyStore.create({
            data: {
                name,
                description,
                address,
                phoneNumber: phone,
                pcn,
                image
            }
        });
    });
    return NextResponse.json(newStore, { status: 201 });
}