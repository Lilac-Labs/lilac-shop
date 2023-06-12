import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { userName: string } },
) {
  console.log('params', params.userName)
  const user = await prisma.userProfile.findUnique({
    where: {
      userName: params.userName,
    },
    include: {
      socialMedias: true,
    },
  })
  console.log('user', user)
  return NextResponse.json(user)
}
