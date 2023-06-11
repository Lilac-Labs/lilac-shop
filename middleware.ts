import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { parse } from './lib/utils'
import { withAuth } from 'next-auth/middleware'
import prisma from './lib/prisma'

export async function middleware(req: NextRequest) {
  const { domain, path, key } = parse(req)

  console.log('path', path)
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => {
      if (!token) {
        return false
      }
      return true
    },
  },
})

export const config = {
  matcher: '/api/user/byUuid/:path*',
}
