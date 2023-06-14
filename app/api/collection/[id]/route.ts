import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// id is user id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
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

// id is user id
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const newCollection = await prisma.collection.create({
    data: {
      title: 'Collection Name Here',
      userProfile: {
        connect: {
          uuid: params.id,
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
