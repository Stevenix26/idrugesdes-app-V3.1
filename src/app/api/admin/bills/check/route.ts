import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    // Get all prescriptions with their bills
    const prescriptions = await prismadb.prescription.findMany({
      include: {
        patient: true,
        bill: {
          include: {
            items: true,
          },
        },
      },
    });

    // Get all bills directly
    const bills = await prismadb.prescriptionBill.findMany({
      include: {
        items: true,
        prescription: {
          include: {
            patient: true,
          },
        },
      },
    });

    // Get all users who have prescriptions
    const usersWithPrescriptions = await prismadb.user.findMany({
      where: {
        prescriptions: {
          some: {},
        },
      },
      include: {
        prescriptions: {
          include: {
            bill: true,
          },
        },
      },
    });

    return NextResponse.json({
      debug: {
        totalPrescriptions: prescriptions.length,
        totalBills: bills.length,
        totalUsersWithPrescriptions: usersWithPrescriptions.length,
      },
      prescriptions: prescriptions.map((p) => ({
        id: p.id,
        patientId: p.patientId,
        patientEmail: p.patient?.email,
        patientName: p.patientName,
        status: p.status,
        hasBill: !!p.bill,
        billDetails: p.bill
          ? {
              id: p.bill.id,
              total: p.bill.total,
              itemCount: p.bill.items.length,
            }
          : null,
      })),
      bills: bills.map((b) => ({
        id: b.id,
        prescriptionId: b.prescriptionId,
        patientId: b.prescription?.patientId,
        patientName: b.prescription?.patientName,
        total: b.total,
        status: b.status,
        itemCount: b.items.length,
        items: b.items.map((item) => ({
          medicationName: item.medicationName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
        })),
      })),
      users: usersWithPrescriptions.map((u) => ({
        id: u.id,
        email: u.email,
        prescriptionCount: u.prescriptions.length,
        prescriptionsWithBills: u.prescriptions.filter((p) => p.bill).length,
      })),
    });
  } catch (error) {
    console.error("[BILLS_CHECK] Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      { status: 500 }
    );
  }
}
