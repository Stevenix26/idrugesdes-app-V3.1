import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient()


export async function POST(req) {
    try {
        const { params } = context;
        const body = await req.json();

        await prisma.prescription.update({
            where: {
                id: params.postId
            },
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId,

            }
        });


        return NextResponse.json({
            message: 'post'
        },
            { status: 200 })
    }
    catch (error) {
        return NextResponse.json({
            message: 'sorry, could not update post'
        },
            { status: 500 })
    }

}