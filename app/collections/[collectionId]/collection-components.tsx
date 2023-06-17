'use client'
import { LoadingDots } from '@/components/shared/icons'
import { Separator } from '@/components/ui/separator'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { Collection, UserInfo, UserProfile } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CollectionForm } from './collection-edit-form'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAddNewALModal } from '@/components/collection/add-new-AL-modal'
import { useSignInModal } from '@/components/layout/sign-in-modal'

export default function CollectionComponents({
  collectionId,
}: {
  collectionId: string
}) {
  const { userInfo } = useUserInfoContext()
  const { status } = useSession()
  const { collections: ownerCollections } = useAffiliateLinksContext()
  // set isOwner to true if the collection belongs to the user
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const [collection, setCollection] = useState<Collection>({} as Collection)
  const [loading, setLoading] = useState<boolean>(true)

  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const { AddNewALModal, setShowAddNewALModal } = useAddNewALModal()
  const { SignInModal, setShowSignInModal } = useSignInModal()

  useEffect(() => {
    const fetchCollection = async () => {
      const res = await fetcher(`/api/collection/byId/${collectionId}`)

      const userProfile = await fetcher(`/api/user/byUserName/${res.userName}`)
      setCollection(res)
      setUserProfile(userProfile)
      setLoading(false)
    }

    const collectionData = ownerCollections?.find(
      (collection) => collection.id === +collectionId,
    )

    if (collectionData) {
      setCollection(collectionData)
      setIsOwner(true)
      setLoading(false)
      setUserProfile(userInfo.userProfile as UserProfile)
    } else {
      fetchCollection()
    }

    fetchCollection()
  }, [])

  return (
    <>
      <AddNewALModal />

      <div className="flex flex-col">
        {loading ? (
          <div className="item-center flex justify-center">
            <LoadingDots />
          </div>
        ) : collection.userName ? (
          <div>
            <Link href={`/${collection.userName}`}>
              <div className="relative flex w-full flex-row items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 ">
                <ArrowLeft className="h-4 w-4" />
                <p className='text-sm"'>Your shop</p>
              </div>
            </Link>
            <div className="my-8">
              <CollectionForm
                collection={collection}
                setCollection={setCollection}
              />
              <Separator className="my-4 h-[3px] bg-gray-500" />
              <div className="mx-2 flex flex-row">
                <Link href={`/${collection.userName}`}>
                  <div className="itmes-center relative flex flex-row justify-start space-x-2 p-2 text-left">
                    <Image
                      className="rounded-full"
                      src={userProfile?.image}
                      alt={userProfile?.userName}
                      width={40}
                      height={40}
                    />
                    <p className="text-md">{collection.userName}</p>
                  </div>
                </Link>
                <Separator
                  orientation="vertical"
                  className="w-[3px] bg-gray-500"
                />
                <p> {collection.affiliateLinks.length} PRODUCTS</p>
              </div>
            </div>

            <div className="grid grid-cols-3">
              {collection.affiliateLinks.map((link) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={link.id}
                >
                  <Image
                    src={link.image}
                    alt={String(link.id)}
                    width={150}
                    height={150}
                  />
                  <p>{link.title}</p>
                </div>
              ))}

              <button onClick={() => setShowAddNewALModal(true)}>
                <Image
                  src="/addNew.jpg"
                  alt="Empty collection"
                  width={150}
                  height={150}
                />
              </button>
            </div>
          </div>
        ) : (
          <div>Collection not found</div>
        )}
      </div>
    </>
  )
}
