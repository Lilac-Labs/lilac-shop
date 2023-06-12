'use client'

import UserInfoProvider from './UserInfoProvider'
import { SessionProvider, getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { fetcher } from '../utils'
import AffiliateLinksProvider from './AffiliateLinksProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const getSession_ = async () => {
      const s = await getSession()
      const path = window.location.pathname
      // if (s) {
      //   fetcher(`http://localhost:3000/api/user/byUuid/${s.user}`, {
      //     next: { revalidate: 10 },
      //   })
      //     .then((res) => {
      //       //TODO: change this to createAccount
      //       if (path !== '/accountSettings' && res?.userName === null) {
      //         window.location.href = '/accountSettings'
      //       }
      //     })
      //     .catch((err) => {
      //       console.log('err', err)
      //     })
      // }
    }
    getSession_()
  }, [])

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <UserInfoProvider>
        <AffiliateLinksProvider>{children}</AffiliateLinksProvider>
      </UserInfoProvider>
    </SessionProvider>
  )
}
