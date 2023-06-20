import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// id is user collectionId
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      affiliateLinks: true,
    },
  })
  if (!collection) {
    return NextResponse.json({ error: 'collection not found' }, { status: 404 })
  }

  return NextResponse.json(collection)
}

interface PatchBody {
  title: string
  description: string
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = (await request.json()) as PatchBody

  const collection = await prisma.collection.update({
    where: {
      id: +params.id,
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
  { params }: { params: { id: string } },
) {
  const collection = await prisma.collection
    .delete({
      where: {
        id: +params.id,
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

  return NextResponse.json(collection)
}
