import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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
      collections: {
        include: {
          affiliateLinks: true,
        },
      },
    },
  })
  if (!userProfile) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 })
  }

  return NextResponse.json(userProfile?.collections)
}
