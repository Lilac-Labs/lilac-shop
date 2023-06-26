import { AffiliateLink, CreateLinkParams, Link, Product } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.uuid,
    },
    include: {
      userProfile: {
        include: {
          affiliateLinks: {
            include: {
              brand: true,
              collection: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json(
    user?.userProfile ? user.userProfile.affiliateLinks : [],
  )
}

export async function POST(
  request: Request,
  { params }: { params: { uuid: string } },
) {
  const product: Product = await request.json()

  const createLinkParams = {
    userId: params.uuid,
    productLink: product.productLink,
  } as CreateLinkParams

  const link: Link = await fetcher('https://link-m.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createLinkParams),
  }).catch((e) => {
    console.log('error', e)
    return NextResponse.error()
  })

  if (!link) {
    return NextResponse.error()
  }

  const affiliateLink = await prisma.affiliateLink.create({
    data: {
      id: link.id,
      userProfile: {
        connect: {
          uuid: params.uuid,
        },
      },
      title: product.title,
      image: product.image,
      description: product.description,
      brand: {
        connect: {
          name: product.brandName,
        },
      },
      collection: product.collectonId
        ? {
            connect: {
              id: +product.collectonId,
            },
          }
        : undefined,
    },
    include: {
      brand: true,
      collection: true,
    },
  })
  return NextResponse.json({ ...affiliateLink, link: link })
}
