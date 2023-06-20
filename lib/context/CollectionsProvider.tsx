'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { Collection, Link } from '../types'
import { fetcher } from '../utils'
import { useUserInfoContext } from './UserInfoProvider'

const CollectionsContext = createContext(
  {} as {
    collections: Collection[]
    collectionsUpdated: boolean
    setCollectionsUpdated: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
  },
)

/**
 * Not in use rn
 */

export default function CollectionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { userInfo } = useUserInfoContext()

  const [collections, setCollections] = useState<Collection[]>(
    [] as Collection[],
  )

  const [collectionsUpdated, setCollectionsUpdated] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getCollections = async () => {
      const collections = (await fetcher(
        `/api/users/by-username/${userInfo.userProfile?.userName}/collections`,
      )) as Collection[]

      setCollections(collections)
      setLoading(false)
    }

    // email is ture when session is true
    if (userInfo.id) {
      getCollections()
      setCollectionsUpdated(false)
    }
  }, [userInfo.id, collectionsUpdated])

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        collectionsUpdated,
        setCollectionsUpdated,
        loading,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}
