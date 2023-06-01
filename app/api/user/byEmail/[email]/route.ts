import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { email: string } },
) {
  console.log('params', params.email)
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  })

  return NextResponse.json(user)
}
