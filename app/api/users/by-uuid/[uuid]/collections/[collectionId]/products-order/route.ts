import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uuid: string; collectionId: string } },
) {
  const { newOrder } = await request.json()

  const updatedCollection = await prisma.collection.update({
    where: {
      id: +params.collectionId,
    },
    data: {
      affiliateLinkOrder: newOrder,
    },
  })

  return NextResponse.json(updatedCollection.affiliateLinkOrder)
}
