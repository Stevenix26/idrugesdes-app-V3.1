import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Disable the default middleware for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET in environment variables");
    return new Response(
      JSON.stringify({
        error: "Webhook secret not configured",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // Get the headers directly from the request
    const svix_id = req.headers.get("svix-id") ?? "";
    const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
    const svix_signature = req.headers.get("svix-signature") ?? "";

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response(
        JSON.stringify({
          error: "Missing required Svix headers",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(WEBHOOK_SECRET);

    // Verify the webhook
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    // Get the event type and data
    const { type, data } = evt;

    console.log(`Webhook received: ${type}`);
    console.log("Webhook data:", data);

    // Handle the event
    switch (type) {
      case "user.created":
        await handleUserCreated(data as ClerkUserData);
        break;
      case "user.updated":
        await handleUserUpdated(data as ClerkUserData);
        break;
      case "user.deleted":
        await handleUserDeleted(data as { id: string });
        break;
      default:
        console.log(`Unhandled event type: ${type}`);
    }

    return new Response(
      JSON.stringify({ message: "Webhook processed successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({
        error: "Error processing webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

interface ClerkUserData {
  id: string;
  email_addresses: Array<{
    email_address: string;
    verification: { status: string };
  }>;
  first_name?: string | null;
  last_name?: string | null;
  phone_numbers?: Array<{ phone_number: string }>;
}

// Handler functions for different webhook events
async function handleUserCreated(data: ClerkUserData) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (existingUser) {
      console.log("User already exists:", data.id);
      return;
    }

    // Get the verified email address
    const verifiedEmail = data.email_addresses.find(
      (email) => email.verification.status === "verified"
    )?.email_address;

    if (!verifiedEmail) {
      console.log("No verified email found for user:", data.id);
      return;
    }

    // Create a new user in your database
    await prisma.user.create({
      data: {
        id: data.id,
        email: verifiedEmail,
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        role: "PATIENT", // Default role
        phoneNumber: data.phone_numbers?.[0]?.phone_number || "",
      },
    });

    console.log("User created successfully:", data.id);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function handleUserUpdated(data: ClerkUserData) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!existingUser) {
      console.log("User not found:", data.id);
      return;
    }

    // Get the verified email address
    const verifiedEmail = data.email_addresses.find(
      (email) => email.verification.status === "verified"
    )?.email_address;

    // Update the user in your database
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: verifiedEmail || existingUser.email, // Keep existing email if no verified email found
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        phoneNumber: data.phone_numbers?.[0]?.phone_number || "",
      },
    });

    console.log("User updated successfully:", data.id);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function handleUserDeleted(data: { id: string }) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!existingUser) {
      console.log("User not found:", data.id);
      return;
    }

    // Delete the user from your database
    await prisma.user.delete({
      where: { id: data.id },
    });

    console.log("User deleted successfully:", data.id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
