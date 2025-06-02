import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch all prescriptions with related data
    const prescriptions = await prismadb.prescription.findMany({
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        pharmacist: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data to match the frontend requirements
    const transformedPrescriptions = prescriptions.map((prescription) => ({
      id: prescription.id,
      patientName: prescription.patient
        ? `${prescription.patient.firstName} ${prescription.patient.lastName}`
        : prescription.patientName,
      medication: prescription.medication,
      phoneNumber:
        prescription.patient?.phoneNumber || prescription.phoneNumber,
      doctorName: prescription.doctorName,
      createdAt: prescription.createdAt,
      status: prescription.status,
      dosage: prescription.dosage || "",
      frequency: prescription.frequency || "",
      duration: prescription.prescriptionDate,
      notes: prescription.instructions || "",
      prescriptionFilePath: prescription.prescriptionFilePath || "",
      declineReason: prescription.declineReason || "",
    }));

    return NextResponse.json(transformedPrescriptions);
  } catch (error) {
    console.error("[ADMIN_PRESCRIPTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
