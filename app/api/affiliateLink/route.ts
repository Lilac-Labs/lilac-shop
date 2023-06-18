import { AffiliateLink, CreateLinkParams, Link, Product } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const product: Product = await request.json()

  const createLinkParams = {
    userId: product.uuid,
    productLink: product.productLink,
  } as CreateLinkParams

  console.log('createLinkParams', createLinkParams)

  const link: Link = await fetcher('https://link-m.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createLinkParams),
  }).catch((e) => {
    console.log('errorrr', e)
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
          uuid: product.uuid,
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
  })
  return NextResponse.json(affiliateLink)
}
