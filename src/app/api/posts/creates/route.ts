import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request ) {
    try{
        const body = await req.json();
        console.log(body);

        const posts = await db.post.create({
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tag,
            }
        });

        return NextResponse.json(posts, {status: 200})
    }
    catch (error){
        return NextResponse.json({
            message: 'sorry, could not create post'},
            {status:500})
        }

    }