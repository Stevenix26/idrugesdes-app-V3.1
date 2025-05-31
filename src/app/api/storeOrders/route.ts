import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Store Order Schema
const storeOrderSchema = z.object({
  patientId: z.string(),
  storeId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  orderDate: z.string(),
  notes: z.string().optional(),
});

// POST: Create a new store order
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = storeOrderSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }
  // TODO: Save order to database
  return NextResponse.json(
    { message: "Order created", order: validation.data },
    { status: 201 }
  );
}

// GET: List all store orders (for demonstration)
export async function GET() {
  try {
    // TODO: Fetch orders from database
    return NextResponse.json({ orders: [] });
  } catch (error) {
    console.error("Error in storeOrders API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
