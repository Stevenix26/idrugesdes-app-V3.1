import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    console.log("[BILLS_POST] Admin userId:", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log("[BILLS_POST] Request body:", body);

    const { prescriptionId, subtotal, tax, total, dueDate, items } = body;

    // Validate required fields
    if (!prescriptionId) {
      return new NextResponse("Prescription ID is required", { status: 400 });
    }

    if (!items || !items.length) {
      return new NextResponse("Bill items are required", { status: 400 });
    }

    if (typeof subtotal !== "number" || subtotal < 0) {
      return new NextResponse("Valid subtotal is required", { status: 400 });
    }

    if (typeof tax !== "number" || tax < 0) {
      return new NextResponse("Valid tax amount is required", { status: 400 });
    }

    if (typeof total !== "number" || total < 0) {
      return new NextResponse("Valid total amount is required", {
        status: 400,
      });
    }

    if (!dueDate) {
      return new NextResponse("Due date is required", { status: 400 });
    }

    // Verify the prescription exists and get its details
    const prescription = await prismadb.prescription.findUnique({
      where: { id: prescriptionId },
      include: { patient: true },
    });
    console.log("[BILLS_POST] Found prescription:", prescription);

    if (!prescription) {
      return new NextResponse("Prescription not found", { status: 404 });
    }

    // Create the bill with its items
    const bill = await prismadb.prescriptionBill.create({
      data: {
        prescriptionId: prescriptionId,
        subtotal: subtotal,
        tax: tax,
        total: total,
        dueDate: new Date(dueDate),
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            medicationName: item.medicationName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          })),
        },
      },
      include: {
        items: true,
        prescription: {
          include: {
            patient: true,
          },
        },
      },
    });
    console.log("[BILLS_POST] Created bill:", bill);

    return NextResponse.json(bill);
  } catch (error) {
    console.error("[BILLS_POST] Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      { status: 500 }
    );
  }
}
