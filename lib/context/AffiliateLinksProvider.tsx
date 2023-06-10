'use client'

import { Collection } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { AffiliateLink, Link } from '../types'
import { fetcher } from '../utils'
import { useUserInfoContext } from './UserInfoProvider'

const AffiliateLinksContext = createContext(
  {} as {
    affiliateLinks: AffiliateLink[]
    affiliateLinksUpdated: boolean
    setAffiliateLinksUpdated: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
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

  const [collections, setCollections] = useState<Collection[]>(
    [] as Collection[],
  )

  const [affiliateLinksUpdated, setAffiliateLinksUpdated] =
    useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getAffiliateLinks = async () => {
      const affiliateLinks = (await fetcher(
        `/api/affiliateLink/${userInfo.id}`,
      )) as AffiliateLink[]

      const links = (await fetcher(
        `https://link-m.herokuapp.com/links/${userInfo.id}`,
      )) as Link[]

      affiliateLinks.forEach((affiliateLink) => {
        affiliateLink.link = links.filter(
          (link) => link.id === affiliateLink.id,
        )[0]
      })

      console.log('affiliateLinks', affiliateLinks)

      setAffiliateLinks(affiliateLinks)
      setLoading(false)
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
        loading,
      }}
    >
      {children}
    </AffiliateLinksContext.Provider>
  )
}

export function useAffiliateLinksContext() {
  return useContext(AffiliateLinksContext)
}
