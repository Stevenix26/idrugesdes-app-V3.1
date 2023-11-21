import { user } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();


export default async(req: NextApiRequest,res: NextApiResponse)=>{
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowwed'});
    }
   const userData = JSON.parse(req.body);

   const savedUser = await prisma.user.create({
    data: userData
   })


   res.json(savedUser);

}