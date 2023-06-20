import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.uuid,
    },
    include: {
      userProfile: true,
    },
  })

  return NextResponse.json(user)
}
