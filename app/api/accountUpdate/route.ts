import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface PutParams {
  newUser: boolean
  uuid: string
  userName: string
  firstName: string
  lastName: string
  bio: string
  image: string
}

export async function PUT(request: Request) {
  const params = (await request.json()) as PutParams

  if (params.newUser === true) {
    const newUserProfile = await prisma.userProfile.create({
      data: {
        userName: params.userName,
        user: {
          connect: {
            id: params.uuid,
          },
        },
        firstName: params.firstName,
        lastName: params.lastName,
        bio: params.bio,
        image: params.image,
      },
    })
    return NextResponse.json(newUserProfile)
  } else {
    const updatedUser = await prisma.userProfile.update({
      where: {
        uuid: params.uuid,
      },
      data: {
        userName: params.userName,
        firstName: params.firstName,
        lastName: params.lastName,
        bio: params.bio,
        image: params.image,
      },
    })
    return NextResponse.json(updatedUser)
  }
}
