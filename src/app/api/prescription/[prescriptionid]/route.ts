import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface contextProps {
  params: {
    prescriptionId: string;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    await prisma.prescription.delete({
      where: {
        id: params.prescriptionId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "sorry, could not delete prescription",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();

    await prisma.prescription.update({
      where: {
        id: params.prescriptionId,
      },
      data: {
        id: body.id,
        patientName: body.patientName,
        medication: body.medication,
        doctorName: body.doctorName,
        phoneNumber: body.phoneNumber,
        prescriptionDate: body.prescriptionDate,
        prescriptionFilePath: body.prescriptionFilePath,
        status: body.status,
        declineReason: body.declineReason,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
      },
    });

    return NextResponse.json(
      {
        message: "update",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "sorry, could not update prescription",
      },
      { status: 500 }
    );
  }
}
