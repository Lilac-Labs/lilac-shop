'use client'

import UserInfoProvider from './UserInfoProvider'
import { SessionProvider, getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { fetcher } from '../utils'
import AffiliateLinksProvider from './AffiliateLinksProvider'
import { useRouter } from 'next/navigation'
import { ToastProvider } from '@/components/ui/toast'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  useEffect(() => {
    const getSession_ = async () => {
      const session = await getSession()
      const path = window.location.pathname

      if (session) {
        // @ts-ignore
        fetcher(`http://localhost:3000/api/user/byUuid/${session.user?.id}`, {
          next: { revalidate: 10 },
        })
          .then((res) => {
            //TODO: change this to createAccount
            console.log('resssss', res)
            if (path !== '/accountSettings' && res?.userProfile === null) {
              router.replace('/accountSettings')
            }
          })
          .catch((err) => {
            console.log('err', err)
          })
      }
    }
    getSession_()
  }, [])

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <UserInfoProvider>
        <AffiliateLinksProvider>
          <ToastProvider>{children}</ToastProvider>
        </AffiliateLinksProvider>
      </UserInfoProvider>
    </SessionProvider>
  )
}
