import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { db } from "../../../lib/db";


const createSchema = z.object({
    patientName: z.string().min(1).max(255),
    medication: z.string(),
    phoneNumber: z.string(),
    doctorName: z.string(),
    prescriptionDate: z.string(),
});

export async function POST(request: NextRequest) {
    try {        
        const body = await request.json(); // Use await to get the JSON body

        // console.log(body, 'logg');
        const validation = createSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        const newPrescription = await db.prescription.create({
            data: {
                patientName: body.patientName,
                medication: body.medication,
                phoneNumber: body.phoneNumber,
                doctorName: body.doctorName,
                prescriptionDate: body.prescriptionDate, // Use the validated date
            },
        });

        return NextResponse.json(newPrescription, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
