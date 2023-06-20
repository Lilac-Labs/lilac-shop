'use client'
import { LoadingDots } from '@/components/shared/icons'
import { Separator } from '@/components/ui/separator'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { AffiliateLink, Collection, UserInfo, UserProfile } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CollectionForm } from './collection-edit-form'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAddNewProductModal } from '@/components/collection/add-new-product-modal'
import { useSignInModal } from '@/components/layout/sign-in-modal'
import ProductDropdown from './product-dropdown'
import { useEditLinkModal } from '@/components/linksPage/edit-link-modal'

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

  const [collectionNotFound, setCollectionNotFound] = useState<boolean>(false)
  const [collection, setCollection] = useState<Collection>({} as Collection)
  const [loading, setLoading] = useState<boolean>(true)

  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const { AddNewProductModal, setShowAddNewProductModal } =
    useAddNewProductModal(collectionId)

  console.log('collection', collection.affiliateLinks)

  useEffect(() => {
    const fetchCollection = async () => {
      fetcher(`/api/users/by-username/-/collections/${collectionId}`)
        .then(async (res) => {
          const userProfile = await fetcher(
            `/api/users/by-username/${res.userName}`,
          )
          setCollection(res)
          setUserProfile(userProfile)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setCollectionNotFound(true)
        })
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
  }, [ownerCollections])

  if (collectionNotFound) {
    return (
      <div className="flex flex-col items-center">
        <h1> Oops. This collection does not exist. </h1>
        <Button
          onClick={() => {
            console.log('clicked')
            window.location.href = `/`
          }}
          className="mt-5"
        >
          <p>Return to Home</p>
        </Button>
      </div>
    )
  }

  return (
    <>
      <AddNewProductModal />

      <div className="ml-[10%] mr-[10%] flex w-[80%] flex-col">
        {loading ? (
          <div className="item-center flex justify-center">
            <LoadingDots />
          </div>
        ) : collection.userName ? (
          <div>
            <Link href={`/${collection.userName}`}>
              <div className="relative flex w-full flex-row items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 ">
                <ArrowLeft className="h-4 w-4" />
                <p className='text-sm"'>
                  {isOwner ? 'Your shop' : `${userProfile.firstName}'s shop`}
                </p>
              </div>
            </Link>
            <div className="my-8">
              <CollectionForm
                collection={collection}
                setCollection={setCollection}
                isOwner={isOwner}
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
                    <p className="text-md">
                      {userProfile.firstName + ' ' + userProfile.lastName}
                    </p>
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
                <Product
                  link={link}
                  collectionId={+collectionId}
                  key={link.id}
                />
              ))}
              {isOwner && (
                <div className="flex flex-col items-center justify-center">
                  <button onClick={() => setShowAddNewProductModal(true)}>
                    <Image
                      src="/addNew.jpg"
                      alt="Empty collection"
                      width={150}
                      height={150}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Collection not found</div>
        )}
      </div>
    </>
  )
}

const Product = ({
  link,
  collectionId,
}: {
  link: AffiliateLink
  collectionId: number
}) => {
  // useEditLinkModal
  const { EditLinkModal, setShowEditLinkModal } = useEditLinkModal(link)
  return (
    <div className="mx-10 flex flex-col border" key={link.id}>
      <EditLinkModal />
      <div className="flex flex-col justify-end">
        <ProductDropdown
          alId={link.id}
          collectionId={collectionId}
          setShowEditLinkModal={setShowEditLinkModal}
        />
      </div>
      <div className=" flex flex-col items-center justify-center">
        <Link href={`https://link-m.herokuapp.com/${link.id}`} key={link.id}>
          <Image
            src={link.image}
            alt={String(link.id)}
            width={150}
            height={150}
          />
        </Link>
        <p className="mt-6">{link.title}</p>
      </div>
    </div>
  )
}
