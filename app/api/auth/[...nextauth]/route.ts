import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GoogleProvider from 'next-auth/providers/google'
import { UserProfile } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // profile(profile) {
      //   const user =  prisma.user.findUnique({
      //     where: {
      //       email: profile.email as string,
      //     },
      //     select: {
      //       id: true,
      //     },
      //   })
      //   return {
      //     id: user?.id as string,
      //     email: profile.email as string,
      //     image: profile.picture as string,
      //     userProfile: profile.userProfile as UserProfile,
      //   }
      // },
    }),
  ],
  callbacks: {
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
