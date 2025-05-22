import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    const storeCount = await prisma.pharmacyStore.count();
    const medicationCount = await prisma.medication.count();

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      counts: {
        users: userCount,
        stores: storeCount,
        medications: medicationCount,
      },
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
