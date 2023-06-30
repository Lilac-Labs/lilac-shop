import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { userName: string } },
) {
  const user = await prisma.userProfile.findUnique({
    where: {
      userName: params.userName,
    },
    include: {
      socialMedias: true,
    },
  })

  return NextResponse.json(user)
}
