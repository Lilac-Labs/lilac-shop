import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const params = await request.json()
  const newCollection = await prisma.collection.create({
    data: {
      title: 'Collection Name Here',
      userProfile: {
        connect: {
          userId: params.userId,
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
