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
