import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import { sfPro, inter } from './fonts'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { Suspense } from 'react'
import { Providers } from '@/lib/context/providers'
import { Toast } from '@radix-ui/react-toast'

export const metadata = {
  title: "Lilac - Shop your creator's favorite products",
  description:
    "Shop your creator's favorite products and support them with every purchase.",
  twitter: {
    card: 'summary_large_image',
    title: "Lilac - Shop your creator's favorite products",
    description:
      "Shop your creator's favorite products and support them with every purchase.",
    creator: '@tokam',
  },
  metadataBase: new URL('https://withlilac.com/'),
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
          <Suspense fallback="">
            <Nav />
          </Suspense>
          {/*children*/}
          <main className="z-10 h-fit min-h-screen w-full">{children}</main>
        </Providers>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
