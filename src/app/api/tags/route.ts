import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await db.tag.findMany();
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error in tags API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
