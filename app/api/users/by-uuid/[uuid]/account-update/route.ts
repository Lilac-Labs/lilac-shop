import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface PutParams {
  newUser: boolean
  userName: string
  firstName: string
  lastName: string
  bio: string
  image: string
}

export async function PUT(
  request: Request,
  { params }: { params: { uuid: string } },
) {
  const body = (await request.json()) as PutParams

  if (body.newUser === true) {
    const newUserProfile = await prisma.userProfile.create({
      data: {
        userName: body.userName,
        user: {
          connect: {
            id: params.uuid,
          },
        },
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        image: body.image,
      },
    })
    return NextResponse.json(newUserProfile)
  } else {
    const updatedUser = await prisma.userProfile.update({
      where: {
        uuid: params.uuid,
      },
      data: {
        userName: body.userName,
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        image: body.image,
      },
    })
    return NextResponse.json(updatedUser)
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { uuid: string } },
) {
  const body = (await request.json()) as PutParams

  const updatedUser = await prisma.userProfile.update({
    where: {
      uuid: params.uuid,
    },
    data: {
      userName: body.userName,
      firstName: body.firstName,
      lastName: body.lastName,
      bio: body.bio,
      image: body.image,
    },
  })
  return NextResponse.json(updatedUser)
}
