import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { newOrder } = await request.json()

  const updatedCollection = await prisma.userProfile.update({
    where: {
      uuid: params.uuid,
    },
    data: {
      collectionOrder: newOrder,
    },
  })

  return NextResponse.json(updatedCollection.collectionOrder)
}
