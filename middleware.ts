import { NextResponse, NextRequest } from 'next/server'
import { parse } from './lib/utils'
import { withAuth } from 'next-auth/middleware'
import prisma from './lib/prisma'
import { getToken } from 'next-auth/jwt'

async function middleware(req: NextRequest) {
  const { domain, path, key } = parse(req)
  const token = await getToken({ req, secret: process.env.SECRET })
}

export default withAuth(middleware, {
  callbacks: {
    authorized: async ({ req: { cookies } }) => {
      const secureCookie =
        process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL

      const cookieName = secureCookie
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token'
      const session = await (
        await fetch(
          `${
            process.env.VERCEL
              ? 'https://lilac-shop-app.vercel.app'
              : process.env.NEXTAUTH_URL
          }/api/auth/session`,
          {
            method: 'GET',
            headers: {
              Cookie: `${cookieName}=${cookies.get(cookieName)?.value}`,
            },
          },
        )
      ).json()
      return !!session.user
    },
  },
})

export const config = {
  matcher: [
    '/earnings',
    '/api/users/by-uuid/:uuid*',
    '/links',
    '/accountSettings',
    '/mediaConnect',
  ],
}
