import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// id is user collectionId
export async function GET(
  request: NextRequest,
  { params }: { params: { collectionId: string } },
) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: +params.collectionId,
    },
    include: {
      affiliateLinks: {
        include: {
          brand: true,
        },
      },
    },
  })
  if (!collection) {
    return NextResponse.json({ error: 'collection not found' }, { status: 404 })
  }

  return NextResponse.json(collection)
}
