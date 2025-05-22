import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      clerkId,
      role,
      phoneNumber,
      licenseNumber,
      specialization,
      yearsOfExperience,
    } = body;

    // Update the user with role and phone number
    const user = await prisma.user.update({
      where: { id: clerkId },
      data: {
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
              name: `${user.firstName}'s Pharmacy`,
              address: "TBD",
              phoneNumber,
              description: "New pharmacy",
              pcn: "TBD",
              image: "https://placehold.co/400x300",
            },
          },
        },
      });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user", details: error.message },
      { status: 500 }
    );
  }
}
