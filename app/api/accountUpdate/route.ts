import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const params = await request.json()
  const result = await prisma.user.update({
    where: {
      email: params.email,
    },
    data: {
      userName: params.userName,
      bio: params.bio,
      firstName: params.firstName,
      lastName: params.lastName,
      image: params.image,
    },
  })
  return NextResponse.json(result)
}
