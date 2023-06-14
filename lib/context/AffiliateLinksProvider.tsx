'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AffiliateLink, Link, Collection } from '../types'
import { fetcher } from '../utils'
import { useUserInfoContext } from './UserInfoProvider'

const AffiliateLinksContext = createContext(
  {} as {
    affiliateLinks: AffiliateLink[]
    setAffiliateLinks: React.Dispatch<React.SetStateAction<AffiliateLink[]>>
    affiliateLinksUpdated: boolean
    setAffiliateLinksUpdated: React.Dispatch<React.SetStateAction<boolean>>
    collections: Collection[]
    setCollections: React.Dispatch<React.SetStateAction<Collection[]>>
    collectionsUpdated: boolean
    setCollectionsUpdated: React.Dispatch<React.SetStateAction<boolean>>
    affiliateLinkLoading: boolean
    collectionLoading: boolean
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

  const [collectionsUpdated, setCollectionsUpdated] = useState<boolean>(false)

  const [affiliateLinkLoading, setAffiliateLinkLoading] =
    useState<boolean>(true)
  const [collectionLoading, setCollectionLoading] = useState<boolean>(true)

  // set affiliateLinks
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
      setAffiliateLinkLoading(false)
    }

    // email is ture when session is true
    if (userInfo.id) {
      getAffiliateLinks()
      setAffiliateLinksUpdated(false)
    }
  }, [userInfo.id, affiliateLinksUpdated])

  // set collections
  useEffect(() => {
    const getCollections = async () => {
      const collections = (await fetcher(
        `/api/collection/${userInfo.userProfile?.userName}`,
      )) as Collection[]
      setCollections(collections)

      setCollectionLoading(false)
    }

    if (userInfo.id) {
      getCollections()
      setAffiliateLinksUpdated(false)
    }
  }, [userInfo.id])

  return (
    <AffiliateLinksContext.Provider
      value={{
        affiliateLinks,
        setAffiliateLinks,
        affiliateLinksUpdated,
        setAffiliateLinksUpdated,
        collections,
        setCollections,
        collectionsUpdated,
        setCollectionsUpdated,
        affiliateLinkLoading,
        collectionLoading,
      }}
    >
      {children}
    </AffiliateLinksContext.Provider>
  )
}

export function useAffiliateLinksContext() {
  return useContext(AffiliateLinksContext)
}
