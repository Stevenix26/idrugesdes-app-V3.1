import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First verify that the user is a pharmacist
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        pharmacistProfile: {
          include: {
            pharmacy: true,
          },
        },
      },
    });

    if (!user || user.role !== "PHARMACIST") {
      return NextResponse.json(
        { error: "Access denied. Only pharmacists can access this endpoint." },
        { status: 403 }
      );
    }

    if (!user.pharmacistProfile) {
      return NextResponse.json(
        {
          error:
            "Pharmacist profile not found. Please complete your profile first.",
        },
        { status: 404 }
      );
    }

    // If pharmacist has no store yet, return null (this is a valid state now)
    if (!user.pharmacistProfile.pharmacy) {
      return NextResponse.json(null);
    }

    return NextResponse.json(user.pharmacistProfile.pharmacy);
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { error: "Failed to fetch store" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First verify that the user is a pharmacist
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        pharmacistProfile: {
          include: {
            pharmacy: true,
          },
        },
      },
    });

    if (!user || user.role !== "PHARMACIST") {
      return NextResponse.json(
        { error: "Access denied. Only pharmacists can access this endpoint." },
        { status: 403 }
      );
    }

    if (!user.pharmacistProfile) {
      return NextResponse.json(
        {
          error:
            "Pharmacist profile not found. Please complete your profile first.",
        },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const description = formData.get("description") as string;
    const pcn = formData.get("pcn") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!name || !address || !phoneNumber || !description || !pcn) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    let imageUrl = user.pharmacistProfile.pharmacy?.image || "";

    // Upload new image if provided
    if (imageFile) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        const result = await cloudinary.uploader.upload(
          `data:${imageFile.type};base64,${base64Image}`,
          {
            folder: "pharmacy-stores",
          }
        );

        imageUrl = result.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Create or update the store
    const store = await prisma.pharmacyStore.upsert({
      where: {
        id: user.pharmacistProfile.pharmacy?.id || "new-store",
      },
      update: {
        name,
        address,
        phoneNumber,
        description,
        pcn,
        ...(imageUrl && { image: imageUrl }),
      },
      create: {
        name,
        address,
        phoneNumber,
        description,
        pcn,
        image: imageUrl || "https://placehold.co/400x300",
        pharmacists: {
          connect: {
            id: user.pharmacistProfile.id,
          },
        },
      },
    });

    // Update the pharmacist's pharmacy relationship if needed
    if (!user.pharmacistProfile.pharmacy) {
      await prisma.pharmacist.update({
        where: { id: user.pharmacistProfile.id },
        data: {
          pharmacy: {
            connect: {
              id: store.id,
            },
          },
        },
      });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.error("Error updating store:", error);
    return NextResponse.json(
      { error: "Failed to update store" },
      { status: 500 }
    );
  }
}
