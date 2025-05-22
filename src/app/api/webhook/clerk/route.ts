import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Disable the default middleware for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, phone_numbers } =
      evt.data;

    const primaryEmail = email_addresses?.[0]?.email_address;
    const primaryPhone = phone_numbers?.[0]?.phone_number;

    if (!primaryEmail) {
      return new Response("No email found", { status: 400 });
    }

    try {
      await prisma.user.upsert({
        where: { email: primaryEmail },
        create: {
          id: id,
          email: primaryEmail,
          firstName: first_name || "",
          lastName: last_name || "",
          phoneNumber: primaryPhone || null,
          role: "PATIENT", // Default role
        },
        update: {
          firstName: first_name || "",
          lastName: last_name || "",
          phoneNumber: primaryPhone || null,
        },
      });

      return new Response("User synchronized", { status: 200 });
    } catch (error) {
      console.error("Error syncing user:", error);
      return new Response("Error syncing user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({
        where: { id: evt.data.id },
      });

      return new Response("User deleted", { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("Webhook processed", { status: 200 });
}
