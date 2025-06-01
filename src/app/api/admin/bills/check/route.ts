import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [prescriptions, bills, usersWithPrescriptions] = await Promise.all([
      prismadb.prescription.findMany({
        select: {
          id: true,
          patientId: true,
          patientName: true,
          status: true,
          patient: {
            select: {
              email: true,
            },
          },
          bill: {
            select: {
              id: true,
              subtotal: true,
              tax: true,
              total: true,
              status: true,
              dueDate: true,
              items: {
                select: {
                  id: true,
                  medicationName: true,
                  quantity: true,
                  unitPrice: true,
                  total: true,
                },
              },
            },
          },
        },
      }),
      prismadb.prescriptionBill.findMany({
        select: {
          id: true,
          prescriptionId: true,
          subtotal: true,
          tax: true,
          total: true,
          status: true,
          dueDate: true,
          prescription: {
            select: {
              patientId: true,
              patientName: true,
            },
          },
          items: {
            select: {
              id: true,
              medicationName: true,
              quantity: true,
              unitPrice: true,
              total: true,
            },
          },
        },
      }),
      prismadb.user.findMany({
        where: {
          prescriptions: {
            some: {},
          },
        },
        select: {
          id: true,
          email: true,
          prescriptions: {
            select: {
              id: true,
              status: true,
              bill: {
                select: {
                  status: true,
                  total: true,
                },
              },
            },
          },
        },
      }),
    ]);

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
              subtotal: p.bill.subtotal,
              tax: p.bill.tax,
              total: p.bill.total,
              status: p.bill.status,
              dueDate: p.bill.dueDate.toISOString(),
              itemCount: p.bill.items.length,
            }
          : null,
      })),
      bills: bills.map((b) => ({
        id: b.id,
        prescriptionId: b.prescriptionId,
        patientId: b.prescription?.patientId,
        patientName: b.prescription?.patientName,
        subtotal: b.subtotal,
        tax: b.tax,
        total: b.total,
        status: b.status,
        dueDate: b.dueDate.toISOString(),
        itemCount: b.items.length,
        items: b.items.map((item) => ({
          id: item.id,
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
        prescriptions: u.prescriptions.map((p) => ({
          id: p.id,
          status: p.status,
          billStatus: p.bill?.status || null,
          total: p.bill?.total || null,
        })),
      })),
    });
  } catch (error) {
    console.error("[BILLS_CHECK] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
