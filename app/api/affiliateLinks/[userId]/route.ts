import prisma from '@/lib/prisma'
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
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
  })
  return NextResponse.json(user?.affiliateLinks)
}

// export async function POST(
//   request: Request,
//   { params }: { params: { userId: string } },
// ) {
//   const { url, content } = await request.json()
//   const user = await prisma.user.findUnique({
//     where: {
//       id: params.userId,
//     },
//   })
//   const affiliateLink = await prisma.affiliateLink.create({
//     data: {
//       url,
//       content,
//       user: {
//         connect: {
//           id: user?.id,
//         },
//       },
//     },
//   })
//   return NextResponse.redirect(`/affiliateLinks/${affiliateLink.id}`)
// }
