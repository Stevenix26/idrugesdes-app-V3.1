import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { prescriptionId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { status, declineReason } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    if (status === "rejected" && !declineReason) {
      return new NextResponse("Rejection reason is required", { status: 400 });
    }

    if (!params.prescriptionId) {
      return new NextResponse("Prescription ID is required", { status: 400 });
    }

    // Update the prescription status
    const prescription = await prismadb.prescription.update({
      where: {
        id: params.prescriptionId,
      },
      data: {
        status,
        declineReason: status === "rejected" ? declineReason : null,
      },
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
    });

    // Transform the data to match the frontend requirements
    const transformedPrescription = {
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
      declineReason: prescription.declineReason,
      prescriptionFilePath: prescription.prescriptionFilePath,
    };

    return NextResponse.json(transformedPrescription);
  } catch (error) {
    console.error("[PRESCRIPTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
