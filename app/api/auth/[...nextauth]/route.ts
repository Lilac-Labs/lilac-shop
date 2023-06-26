import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      const isWhitelisted = await prisma.whiteListedEmail.findUnique({
        where: {
          email: user.email,
        },
      })
      if (isWhitelisted) {
        return true
      } else {
        return '/?apply=true'
      }
    },
    async session({ session, token, user }: any) {
      session.user.id = user.id
      return session
    },
    async jwt({ token, user, account, profile }: any) {
      if (profile) {
        token.id = profile.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
