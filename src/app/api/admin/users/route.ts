import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET: Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { pharmacistProfile: true, prescriptions: true },
    });
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update user role or deactivate
export async function PATCH(req: NextRequest) {
  try {
    const { id, role, deactivate } = await req.json();
    let updatedUser;
    if (typeof deactivate === "boolean") {
      updatedUser = await prisma.user.update({
        where: { id },
        data: { role: deactivate ? "PATIENT" : role },
      });
    } else if (role) {
      updatedUser = await prisma.user.update({
        where: { id },
        data: { role },
      });
    }
    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
