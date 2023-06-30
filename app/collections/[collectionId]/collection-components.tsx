'use client'
import { LoadingDots } from '@/components/shared/icons'
import { Separator } from '@/components/ui/separator'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { AffiliateLink, Collection, UserInfo, UserProfile } from '@/lib/types'
import { fetcher, reorder } from '@/lib/utils'
import { ArrowLeft, Move } from 'lucide-react'
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
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd'

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
      <div className="ml-[10%] mr-[10%] flex w-[80%] flex-col">
        {loading ? (
          <div className="item-center flex justify-center">
            <LoadingDots />
          </div>
        ) : collection.userName ? (
          <div>
            <Link href={`/${collection.userName}`}>
              <div className="relative flex w-full flex-row items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 ">
                <ArrowLeft className="h-6 w-6" />
                <p className="text-md">
                  {isOwner ? 'Your shop' : `${userProfile.firstName}'s shop`}
                </p>
              </div>
            </Link>
            <div className="my-8">
              <CollectionForm collection={collection} isOwner={isOwner} />
              <Separator className="my-4 h-[2px] bg-gray-500" />
              <div className="mx-2 mt-5 flex h-5 flex-row items-center justify-start space-x-2 text-left text-sm">
                <Link href={`/${collection.userName}`}>
                  <div className="flex flex-row items-center justify-start">
                    <Image
                      className="rounded-full"
                      src={userProfile?.image}
                      alt={userProfile?.userName}
                      width={40}
                      height={40}
                    />
                    <p className="">
                      {userProfile.firstName + ' ' + userProfile.lastName}
                    </p>
                  </div>
                </Link>
                <Separator
                  orientation="vertical"
                  className="w-[2px] bg-gray-500"
                />
                <p> {collection.affiliateLinks.length} PRODUCTS</p>
              </div>
            </div>

            {!loading && (
              <div>
                {isOwner ? (
                  <OwnerProductGrid collection={collection} />
                ) : (
                  <ViewerProductGrid collection={collection} />
                )}
              </div>
            )}
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
  isOwner,
  dragHandleProps,
}: {
  link: AffiliateLink
  collectionId: number
  isOwner: boolean
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null
}) => {
  // useEditLinkModal
  const { EditLinkModal, setShowEditLinkModal } = useEditLinkModal(link)
  return (
    <>
      <EditLinkModal />
      <div className="border" key={link.id}>
        {isOwner && (
          <div className="flex flex-row justify-end">
            <ProductDropdown
              alId={link.id}
              collectionId={collectionId}
              setShowEditLinkModal={setShowEditLinkModal}
            />
            <button {...dragHandleProps}>
              <Move className="h-6 w-6" />
            </button>
          </div>
        )}

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
    </>
  )
}

function OwnerProductGrid({ collection }: { collection: Collection }) {
  const { AddNewProductModal, setShowAddNewProductModal } =
    useAddNewProductModal(String(collection.id))
  const { userInfo } = useUserInfoContext()
  const { setCollections } = useAffiliateLinksContext()

  const onDragEnd = (result: DropResult) => {
    const updateProductOrder = async (newOrder: number[]) => {
      const res = await fetcher(
        `/api/users/by-uuid/${userInfo.id}/collections/${collection.id}/products-order`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            newOrder: newOrder,
          }),
        },
      )
    }

    // console.log('drag end', result)
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }

    const newProducts = reorder(
      collection.affiliateLinks,
      result.source.index,
      result.destination.index,
    )

    updateProductOrder(newProducts.map((affiliateLinks) => affiliateLinks.id))
    setCollections((prev) => {
      const newCollections = [...prev]
      const collectionIndex = newCollections.findIndex(
        (collection) => collection.id === collection.id,
      )
      newCollections[collectionIndex].affiliateLinks = newProducts
      return newCollections
    })
  }

  return (
    <>
      <AddNewProductModal />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`products${collection.id}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 gap-5 md:grid-cols-3"
            >
              {collection.affiliateLinks.map((link, index) => {
                return (
                  <Draggable
                    key={link.id}
                    draggableId={String(link.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Product
                          link={link}
                          collectionId={collection.id}
                          key={link.id}
                          isOwner={true}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}

              {provided.placeholder}
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    setShowAddNewProductModal(true)
                  }}
                >
                  <Image
                    src="/addNew.jpg"
                    alt="Empty collection"
                    width={150}
                    height={150}
                  />
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

function ViewerProductGrid({ collection }: { collection: Collection }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {collection.affiliateLinks.map((link) => (
        <Product
          link={link}
          collectionId={collection.id}
          key={link.id}
          isOwner={false}
          dragHandleProps={undefined}
        />
      ))}
    </div>
  )
}
