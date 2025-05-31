import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createSchema = z.object({
  patientName: z.string().min(1).max(255),
  medication: z.string(),
  phoneNumber: z.string(),
  doctorName: z.string(),
  prescriptionDate: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    let body;
    let imageUrl = null;
    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        patientName: formData.get("patientName"),
        medication: formData.get("medication"),
        phoneNumber: formData.get("phoneNumber"),
        doctorName: formData.get("doctorName"),
        prescriptionDate: formData.get("prescriptionDate"),
      };
      const file = formData.get("uploadedPrescription");
      if (file && typeof file === "object" && file.arrayBuffer) {
        const buffer = Buffer.from(await file.arrayBuffer());
        let uploadResult;
        try {
          uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "prescriptions" }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
              })
              .end(buffer);
          });
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return NextResponse.json(
            { error: "Failed to upload prescription image" },
            { status: 500 }
          );
        }
        imageUrl = uploadResult.secure_url;
      }
    } else {
      body = await request.json();
    }
    const validation = createSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const newPrescription = await db.$transaction(async (tx) => {
      return await tx.prescription.create({
        data: {
          patientName: body.patientName,
          medication: body.medication,
          phoneNumber: body.phoneNumber,
          doctorName: body.doctorName,
          prescriptionDate: body.prescriptionDate,
          prescriptionFilePath: imageUrl,
        },
      });
    });
    return NextResponse.json(newPrescription, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
