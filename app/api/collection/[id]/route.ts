import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// id is user userName
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userProfile = await prisma.userProfile.findUnique({
    where: {
      userName: params.id,
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

// id is user userName
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const newCollection = await prisma.collection.create({
    data: {
      title: 'Collection Name Here',
      userProfile: {
        connect: {
          userName: params.id,
        },
      },
    },
  })

  return NextResponse.json(newCollection)
}

// id is collection id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const collection = await prisma.collection
    .delete({
      where: {
        id: +params.id,
      },
    })
    .then((res) => {
      console.log('deleted collection', res)
      return NextResponse.json(res)
    })
    .catch((e) => {
      return NextResponse.json(
        { error: 'failed to delete collection, ', e },
        { status: 400 },
      )
    })

  return NextResponse.json(collection)
}
