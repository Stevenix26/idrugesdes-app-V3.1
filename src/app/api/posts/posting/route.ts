import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function POST(req: Request ) {
    try{
        const body = await req.json();
        console.log(body);

        const prescribes = await prisma.prescribe.create({
            data: {
                name: body.name,
                description: body.description,
                userId: body.userId
            }
        });

        return NextResponse.json(prescribes, {status: 200})
    }
    catch (error){
        return NextResponse.json({
            message: 'sorry, could not create post'},
            {status:500})
        }

    }