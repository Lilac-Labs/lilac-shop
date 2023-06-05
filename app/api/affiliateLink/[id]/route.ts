import prisma from '@/lib/prisma'
import { AffiliateLink, Product } from '@/lib/types'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log('params', params.id)
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      affiliateLinks: {
        include: {
          brand: true,
        },
      },
    },
  })
  return NextResponse.json(user?.affiliateLinks)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product: Product = await request.json()
  console.log('product', product)
  const affiliateLink = await prisma.affiliateLink.create({
    data: {
      userId: params.id,
      link: 'https://trolls.com',
      ...product,
    },
  })
  return NextResponse.json(affiliateLink)
}

/**
 * delete an affiliate link
 * @param request
 * @param params: {id: number}
 * id is the id of the affiliate link
 * @returns empty body with status code
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  console.log('id', params.id)
  prisma.affiliateLink
    .delete({
      where: {
        id: Number(params.id),
      },
    })
    .then((res) => console.log('deleted', res))
    .catch((e) => console.log('error', e))
    .finally(() => console.log('finally'))
  return NextResponse.json({})
}
