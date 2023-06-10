import prisma from '@/lib/prisma'
import { AffiliateLink, CreateLinkParams, Link, Product } from '@/lib/types'
import { fetcher } from '@/lib/utils'
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

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product: Product = await request.json()

  const createLinkParams = {
    userId: params.id,
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
      user: {
        connect: {
          id: params.id,
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
    },
  })
  return NextResponse.json(affiliateLink)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product: Product = await request.json()
  const updatedAffiliateLink = await prisma.affiliateLink.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: product.title,
      description: product.description,
      image: product.image,
    },
  })
  return NextResponse.json(updatedAffiliateLink)
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
  const lmDeleteRes = await fetcher(
    `https://link-m.herokuapp.com/${params.id}`,
    {
      method: 'DELETE',
    },
  )
    .then((res) => {
      console.log('deleted', res)
      return res
    })
    .catch((e) => {
      console.log('error from Delete API', e)
      return NextResponse.json(
        { error: 'failed to deactivate link, ', e },
        { status: 400 },
      )
    })

  if (lmDeleteRes.error) {
    return lmDeleteRes
  }

  const res = await prisma.affiliateLink
    .delete({
      where: {
        id: Number(params.id),
      },
    })
    .then((res) => {
      console.log('deleted', res)
      return NextResponse.json(res)
    })
    .catch((e) => {
      return NextResponse.json(
        { error: 'failed to delete affiliateLink, ', e },
        { status: 400 },
      )
    })

  return res
}
