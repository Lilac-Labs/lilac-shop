import prisma from '@/lib/prisma'
import { AffiliateLink, Product } from '@/lib/types'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  console.log('params', params.userId)
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
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
  { params }: { params: { userId: string } },
) {
  const product: Product = await request.json()
  console.log('product', product)
  const affiliateLink = await prisma.affiliateLink.create({
    data: {
      userId: params.userId,
      link: 'https://trolls.com',
      ...product,
    },
  })
  return NextResponse.json(affiliateLink)
}
