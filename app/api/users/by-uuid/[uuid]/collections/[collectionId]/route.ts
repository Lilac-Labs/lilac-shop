import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface PatchBody {
  title: string
  description: string
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { collectionId: string } },
) {
  const body = (await request.json()) as PatchBody

  const collection = await prisma.collection.update({
    where: {
      id: +params.collectionId,
    },
    data: {
      title: body.title,
      description: body.description || null,
    },
  })
  return NextResponse.json(collection)
}

// id is collection id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { uuid: string; collectionId: string } },
) {
  const collection = await prisma.collection
    .delete({
      where: {
        id: +params.collectionId,
      },
    })
    .then((res) => {
      return NextResponse.json(res)
    })
    .catch((e) => {
      return NextResponse.json(
        { error: 'failed to delete collection, ', e },
        { status: 400 },
      )
    })

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      uuid: params.uuid,
    },
    select: {
      collectionOrder: true,
    },
  })

  // remove deleted collection id from collectionOrder
  await prisma.userProfile.update({
    where: {
      uuid: params.uuid,
    },
    data: {
      collectionOrder: {
        set: userProfile?.collectionOrder.filter(
          (id) => id !== +params.collectionId,
        ),
      },
    },
  })

  return NextResponse.json(collection)
}
