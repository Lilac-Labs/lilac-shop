import prisma from '@/lib/prisma'
import { AffiliateLink, CreateLinkParams, Link, Product } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      userProfile: {
        include: {
          affiliateLinks: {
            include: {
              brand: true,
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

export async function PATCH(
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
