import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function GET(request, { params }) {
    try {
        const pharmacy = await prisma.pharmacyStore.findUnique({
            where: {
                id: params.slug
            }
        });

        if (!pharmacy) {
            return NextResponse.json(
                { error: 'Pharmacy not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(pharmacy);
    } catch (error) {
        console.error('Error fetching pharmacy:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 