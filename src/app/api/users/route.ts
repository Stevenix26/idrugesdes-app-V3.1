import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "../../../lib/prisma";
import { Prisma, User } from "@prisma/client";

type UserSelect = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Use raw SQL for case-insensitive email search
    const user = await prisma.$queryRaw`
      SELECT id, email, firstName, lastName, role, phoneNumber, createdAt, updatedAt
      FROM User
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1
    `;

    if (!user || (Array.isArray(user) && user.length === 0)) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user is an array (from raw query), take the first result
    const userData = Array.isArray(user) ? user[0] : user;

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error in users API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
