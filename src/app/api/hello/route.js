import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

export async function GET() {
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: "You are not logged in." }, { status: 401 });
  }

  return NextResponse.json({ name: user.firstName })
}
