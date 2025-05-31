import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the user's role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "PHARMACIST") {
      return NextResponse.json(
        { error: "Access denied. Only pharmacists can access this endpoint." },
        { status: 403 }
      );
    }

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("Error in pharmacist verification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
