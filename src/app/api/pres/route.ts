import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";




const createSchema = z.object({
    name: z.string().min(1).max(255),
    address: z.string().min(1),
    phoneNumber: z.string()
    
})


export async function POST(request:NextRequest) {
    const body = await request.json();
    const validation = createSchema.safeParse(body);
    if (!validation.success)
    return NextResponse.json(validation.error.errors, {status:404})

    const newPrescription = await db.pharmacyStore.create({
        data: { 
            name: body.name,
            address: body.address,
            phoneNumber: body.phoneNumber,
            

        }
    });
    return NextResponse.json(newPrescription, {status: 200} )
    
}