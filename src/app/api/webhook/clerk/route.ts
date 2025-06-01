import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

// Use the new route segment config
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
    return new NextResponse("Please add CLERK_WEBHOOK_SECRET to .env", {
      status: 500,
    });
  }

  // Get the headers we need to verify the webhook
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    // Verify the payload with the headers
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occurred", { status: 400 });
  }

  // Get the type
  const eventType = evt.type;

  console.log(`Webhook with type ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, public_metadata } =
      evt.data;

    const primaryEmail = email_addresses?.[0]?.email_address;

    if (!primaryEmail) {
      return new NextResponse("No email address found", { status: 400 });
    }

    try {
      // Upsert the user in your database
      await prisma.user.upsert({
        where: { id: id as string },
        create: {
          id: id as string,
          email: primaryEmail,
          firstName: first_name || "",
          lastName: last_name || "",
          role: (public_metadata?.role as UserRole) || UserRole.PATIENT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        update: {
          email: primaryEmail,
          firstName: first_name || "",
          lastName: last_name || "",
          role: (public_metadata?.role as UserRole) || UserRole.PATIENT,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ message: "User synchronized successfully" });
    } catch (error) {
      console.error("Error syncing user:", error);
      return new NextResponse("Error synchronizing user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({
        where: { id: evt.data.id as string },
      });

      return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new NextResponse("Error deleting user", { status: 500 });
    }
  }

  return NextResponse.json({ message: "Webhook processed successfully" });
}
