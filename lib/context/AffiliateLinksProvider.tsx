'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AffiliateLink } from '../types'
import { fetcher } from '../utils'
import { useUserInfoContext } from './UserInfoProvider'

const AffiliateLinksContext = createContext(
  {} as {
    affiliateLinks: AffiliateLink[]
    affiliateLinksUpdated: boolean
    setAffiliateLinksUpdated: React.Dispatch<React.SetStateAction<boolean>>
  },
)

export default function AffiliateLinksProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { userInfo } = useUserInfoContext()

  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>(
    [] as AffiliateLink[],
  )

  const [affiliateLinksUpdated, setAffiliateLinksUpdated] =
    useState<boolean>(false)

  useEffect(() => {
    const getAffiliateLinks = async () => {
      const res = (await fetcher(
        `/api/affiliateLink/${userInfo.id}`,
      )) as AffiliateLink[]

      setAffiliateLinks(res)
    }

    // email is ture when session is true
    if (userInfo.id) {
      getAffiliateLinks()
      setAffiliateLinksUpdated(false)
    }
  }, [userInfo.id, affiliateLinksUpdated])

  return (
    <AffiliateLinksContext.Provider
      value={{
        affiliateLinks,
        affiliateLinksUpdated,
        setAffiliateLinksUpdated,
      }}
    >
      {children}
    </AffiliateLinksContext.Provider>
  )
}

export function useAffiliateLinksContext() {
  return useContext(AffiliateLinksContext)
}
