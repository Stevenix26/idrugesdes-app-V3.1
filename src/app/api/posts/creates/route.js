import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function POST(request) {
  try {
    const { name, address, pnumber } = await request.json()
    const pharmacyStoreCategory = await prisma.pharmacyStore.create({
      data: {
        name,
        address,
        phoneNumber: pnumber,
      },
    })

    return NextResponse.json(pharmacyStoreCategory)
  } catch (error) {
    console.error('Error in POST:', error)
    return NextResponse.json(
      {
        message: 'Sorry, could not create post',
      },
      { status: 500 }
    )
  }
}