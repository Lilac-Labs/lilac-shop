'use client'
import { Button } from '@/components/ui/button'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { fetcher } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CollectionDropdown from './collection-dropdown'
import { Collection } from '@/lib/types'

export default function Collections({ userName }: { userName: string }) {
  const { status } = useSession()
  const { userInfo } = useUserInfoContext()
  const { collections: ownerCollections, setCollections: setOwnerCollections } =
    useAffiliateLinksContext()
  const isOwner = userInfo.userProfile?.userName === userName
  const [collections, setCollections] = useState<Collection[]>(
    ownerCollections as Collection[],
  )
  const [collectiondUpdated, setCollectionUpdated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // get user's collections
    const fetchCollections = async () => {
      const res = await fetcher(
        `/api/users/by-username/${userName}/collections`,
      )
      if (res === null) {
        console.log('user not found')
      } else {
        setCollections(res)
      }
    }
    if (!isOwner) {
      fetchCollections()
    }
  }, [isOwner, collectiondUpdated])

  useEffect(() => {
    if (isOwner) {
      setCollections(ownerCollections as Collection[])
    }
  }, [ownerCollections])

  const addCollectionOnClick = () => {
    fetcher(`/api/users/by-uuid/${userInfo.id}/collections`, {
      method: 'POST',
    }).then((res: Collection) => {
      if (res !== null) {
        console.log('collectyions post result', res)
        setOwnerCollections([...collections, res])
        router.replace(`/collections/${String(res.id)}`)
      }
    })
  }
  return (
    <div className="flex flex-col">
      {collections.map((collection) => {
        return (
          <div className="py-6" key={collection.id}>
            <Link href={`/collections/${collection.id}`}>
              <div className="border-round border-b-2 border-gray-300 px-5">
                {collection.affiliateLinks.length === 0 ? (
                  <Image
                    src="/addNew.jpg"
                    alt="Empty collection"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="flex flex-row justify-between">
                    {collection.affiliateLinks
                      .slice(0, 4)
                      .map((affiliateLink) => {
                        return (
                          <div className="" key={affiliateLink.id}>
                            <Image
                              src={affiliateLink.image}
                              alt={affiliateLink.title}
                              width={200}
                              height={200}
                            />
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>
              <div className="flex flex-col px-5">
                <div className="flex flex-row justify-between ">
                  <p className="mt-3 text-lg font-bold">{collection.title}</p>
                  {isOwner && (
                    <div
                      onClick={(event) => {
                        event.preventDefault()
                      }}
                    >
                      <CollectionDropdown
                        collectionId={collection.id}
                      ></CollectionDropdown>
                    </div>
                  )}
                </div>
                <p className="text-gray-500">
                  {collection.affiliateLinks.length} products
                </p>
              </div>
            </Link>
          </div>
        )
      })}
      {isOwner && (
        <div className="flex flex-row justify-center">
          <Button className="w-48" onClick={addCollectionOnClick}>
            {' '}
            ADD COLLECTION +
          </Button>
        </div>
      )}
    </div>
  )
}
