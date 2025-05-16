import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// GET: Fetch all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { orderDate: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update order status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ order: updatedOrder });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
