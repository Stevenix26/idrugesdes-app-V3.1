import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req) {
    try {
        const data = await req.json();
        const { email, firstName, lastName, role, phoneNumber, pharmacistDetails } = data;

        // Create the user
        const user = await db.user.create({
            data: {
                email,
                firstName,
                lastName,
                role,
                phoneNumber,
            },
        });

        // If the user is a pharmacist, create their pharmacist profile
        if (role === 'PHARMACIST' && pharmacistDetails) {
            const { licenseNumber, specialization, yearsOfExperience, pharmacyId } = pharmacistDetails;

            await db.pharmacist.create({
                data: {
                    userId: user.id,
                    licenseNumber,
                    specialization,
                    yearsOfExperience,
                    pharmacyId,
                },
            });
        }

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { message: 'A user with this email already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: 'Error creating user', error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (email) {
            const user = await db.user.findUnique({
                where: { email },
                include: {
                    pharmacistProfile: true,
                },
            });

            if (!user) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }

            return NextResponse.json(user);
        }

        // If no email is provided, return all users
        const users = await db.user.findMany({
            include: {
                pharmacistProfile: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: 'Error fetching users', error: error.message },
            { status: 500 }
        );
    }
} 