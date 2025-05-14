import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      clerkId,
      email,
      firstName,
      lastName,
      role,
      phoneNumber,
      licenseNumber,
      specialization,
      yearsOfExperience,
    } = body;

    // Create the user
    const user = await prisma.user.create({
      data: {
        id: clerkId,
        email,
        firstName,
        lastName,
        role,
        phoneNumber,
      },
    });

    // If the user is a pharmacist, create their pharmacist profile
    if (role === "PHARMACIST") {
      await prisma.pharmacist.create({
        data: {
          userId: user.id,
          licenseNumber,
          specialization,
          yearsOfExperience: parseInt(yearsOfExperience),
          // For now, assign to the first pharmacy in the system
          // TODO: Implement pharmacy selection or creation during signup
          pharmacy: {
            create: {
              name: `${firstName}'s Pharmacy`,
              address: "TBD",
              phoneNumber,
            },
          },
        },
      });
    }

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user", details: error.message },
      { status: 500 }
    );
  }
}
