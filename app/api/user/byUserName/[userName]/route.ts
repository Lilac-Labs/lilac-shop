import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { userName: string } },
) {
  console.log('params', params.userName)
  const user = await prisma.user.findUnique({
    where: {
      userName: params.userName,
    },
  })
  console.log('user', user)
  return NextResponse.json(user)
}
