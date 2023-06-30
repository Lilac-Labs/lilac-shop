import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { orderListCompairFunction } from '@/app/api/utils'

// id is user userName
export async function GET(
  request: NextRequest,
  { params }: { params: { userName: string } },
) {
  const userProfile = await prisma.userProfile.findUnique({
    where: {
      userName: params.userName,
    },
    select: {
      collectionOrder: true,
      collections: {
        include: {
          affiliateLinks: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
  })
  if (!userProfile) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 })
  }

  const collectionOrder = userProfile.collectionOrder

  const collections = userProfile.collections.sort(
    orderListCompairFunction(collectionOrder),
  )

  return NextResponse.json(collections)
}
