import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.uuid,
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
