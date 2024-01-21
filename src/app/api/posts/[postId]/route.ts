
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

interface contextProps{
    params:{
        postId: string
    }
}


export async function DELETE(req: Request, context: contextProps ) {
    try{
        const{params} = context;
       
         await prisma.post.delete({
           where:{
            id: params.postId
           }
        });

        return new Response(null,{ status:204})
    }
    catch (error){
        return NextResponse.json({
            message: 'sorry, could not delete post'},
            {status:500})
        }

    }

    export async function PATCH(req: Request, context: contextProps ) {
    try{
        const{params} =context;
        const body = await req.json();
       
         await prisma.post.update({
           where:{
            id: params.postId
           },
           data: {
            title: body.title,
            content: body.content,
            tagId: body.tagId,

           }
        });


         return NextResponse.json({
            message: 'update'},
            {status:200})
    }
    catch (error){
        return NextResponse.json({
            message: 'sorry, could not update post'},
            {status:500})
        }

    }