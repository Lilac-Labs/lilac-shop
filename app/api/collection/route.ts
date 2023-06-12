import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface PostParams {
  uuid: string
}

export async function POST(request: NextRequest) {
  const params = (await request.json()) as PostParams
  const newCollection = await prisma.collection.create({
    data: {
      title: 'Collection Name Here',
      userProfile: {
        connect: {
          uuid: params.uuid,
        },
      },
    },
  })

  return NextResponse.json(newCollection)
}

export async function GET(request: NextRequest) {
  const { userId } = await request.json()

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userProfile: {
        select: {
          collections: {
            include: {
              affiliateLinks: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json(user?.userProfile?.collections)
}
