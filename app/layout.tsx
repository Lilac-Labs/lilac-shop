import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import { sfPro, inter } from './fonts'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { Suspense } from 'react'
import { Providers } from '@/lib/context/providers'

export const metadata = {
  title: 'Precedent - Building blocks for your Next.js project',
  description:
    'Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.',
  twitter: {
    card: 'summary_large_image',
    title: 'Precedent - Building blocks for your Next.js project',
    description:
      'Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.',
    creator: '@steventey',
  },
  metadataBase: new URL('https://precedent.dev'),
  themeColor: '#FFF',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cx(sfPro.variable, inter.variable)}
        suppressHydrationWarning={true}
      >
        {/* <div className="fixed z-0 h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" /> */}
        <Providers>
          <Suspense fallback="...">
            {/* @ts-expect-error Server Component */}
            <Nav />
          </Suspense>
          {/*children*/}
          <div className="z-10 h-fit min-h-screen w-screen py-20">
            {children}
          </div>
        </Providers>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
