import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the pharmacist profile
    const pharmacist = await prisma.pharmacist.findUnique({
      where: { userId },
      include: {
        pharmacy: true,
      },
    });

    if (!pharmacist) {
      return NextResponse.json(
        { error: "Pharmacist profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pharmacist.pharmacy);
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { error: "Failed to fetch store information" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the pharmacist profile
    const pharmacist = await prisma.pharmacist.findUnique({
      where: { userId },
      include: {
        pharmacy: true,
      },
    });

    if (!pharmacist) {
      return NextResponse.json(
        { error: "Pharmacist profile not found" },
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

    let image = pharmacist.pharmacy.image;

    // Upload new image if provided
    if (imageFile) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "pharmacy-stores",
                allowed_formats: ["jpg", "png", "jpeg", "webp"],
                transformation: [
                  { width: 800, height: 600, crop: "fill" },
                  { quality: "auto" },
                ],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        if (
          uploadResult &&
          typeof uploadResult === "object" &&
          "secure_url" in uploadResult
        ) {
          image = uploadResult.secure_url;
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Update store information
    const updatedStore = await prisma.pharmacyStore.update({
      where: { id: pharmacist.pharmacy.id },
      data: {
        name,
        address,
        phoneNumber,
        description,
        pcn,
        image,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error("Error updating store:", error);
    return NextResponse.json(
      { error: "Failed to update store information" },
      { status: 500 }
    );
  }
}
