import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { prescriptionId: string } }
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const prescription = await prisma.prescription.findUnique({
      where: {
        id: params.prescriptionId,
      },
      include: {
        auditLog: true,
      },
    });

    if (!prescription) {
      return new NextResponse("Prescription not found", { status: 404 });
    }

    return NextResponse.json(prescription.auditLog);
  } catch (error) {
    console.error("[PRESCRIPTION_AUDIT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
