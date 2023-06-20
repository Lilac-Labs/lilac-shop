import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const newCollection = await prisma.collection.create({
    data: {
      title: 'Collection Name Here',
      userProfile: {
        connect: {
          uuid: params.uuid,
        },
      },
    },
    include: {
      affiliateLinks: true,
    },
  })

  return NextResponse.json(newCollection)
}
