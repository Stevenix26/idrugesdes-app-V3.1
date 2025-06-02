import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request, context) {
    try {
        const { params } = context;
        const { slug } = params;

        // Ensure slug is available
        if (!slug) {
            return NextResponse.json(
                { error: 'Store ID is required' },
                { status: 400 }
            );
        }

        const pharmacy = await prisma.pharmacyStore.findUnique({
            where: {
                id: slug
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