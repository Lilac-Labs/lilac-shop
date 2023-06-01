import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const user = await prisma.user.findUnique({
    where: {
      email: 't.kam@berkeley.edu',
    },
  })
  return NextResponse.json(user)
}
