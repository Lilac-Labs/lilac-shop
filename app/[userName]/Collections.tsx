'use client'
import { Button } from '@/components/ui/button'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { fetcher, reorder } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CollectionDropdown from './collection-dropdown'
import { Collection } from '@/lib/types'
import useWindowSize from '@/lib/hooks/use-window-size'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'
import { Hand, Move } from 'lucide-react'

export default function Collections({ userName }: { userName: string }) {
  const { userInfo } = useUserInfoContext()
  const { collections: ownerCollections, setCollections: setOwnerCollections } =
    useAffiliateLinksContext()
  const [collections, setCollections] = useState<Collection[]>(
    ownerCollections as Collection[],
  )

  const isOwner = userInfo.userProfile?.userName === userName
  const [isMounted, setIsMounted] = useState(false)
  const [collectiondUpdated, setCollectionUpdated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  const { isSm, isMobile, isLg } = useWindowSize()

  // drag and drop

  const onDragEnd = (result: DropResult) => {
    const updateCollectionOrder = async (newOrder: number[]) => {
      const res = await fetcher(
        `/api/users/by-uuid/${userInfo.id}/collections/collectionsOrder`,
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

    const newCollections = reorder(
      collections,
      result.source.index,
      result.destination.index,
    )

    updateCollectionOrder(newCollections.map((collection) => collection.id))
    setCollections(newCollections)
  }

  return (
    <div className="mt-12 flex flex-col">
      <DragDropContext onDragEnd={onDragEnd}>
        {isMounted && (
          <Droppable droppableId="collections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {collections.map((collection, index) => {
                  return (
                    <Draggable
                      key={collection.id}
                      draggableId={String(collection.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <CollectionElement
                            collection={collection}
                            isOwner={isOwner}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>

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

function CollectionElement({
  collection,
  isOwner,
  dragHandleProps,
}: {
  collection: Collection
  isOwner: boolean
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null
}) {
  const { isSm, isMobile, isLg } = useWindowSize()
  console.log(dragHandleProps, 'provided')
  return (
    <div className="py-6" key={collection.id}>
      <Link href={`/collections/${collection.id}`}>
        <div className="border-round border-b-2 border-gray-300 px-5">
          {
            <div className="flex flex-row justify-between">
              {isOwner && collection.affiliateLinks.length === 0 && (
                <div className="">
                  <Image
                    src="/addNew.jpg"
                    alt="Empty collection"
                    width={175}
                    height={175}
                  />
                </div>
              )}
              {collection.affiliateLinks
                .slice(0, isSm ? 2 : isMobile ? 3 : 4)
                .map((affiliateLink) => {
                  return (
                    <div className={''} key={affiliateLink.id}>
                      <Image
                        src={affiliateLink.image}
                        alt={affiliateLink.title}
                        width={175}
                        height={175}
                      />
                    </div>
                  )
                })}
              {collection.affiliateLinks.length <
                (isSm ? 2 : isMobile ? 3 : 4) &&
                Array.from(
                  Array(
                    (isSm ? 2 : isMobile ? 3 : 4) -
                      collection.affiliateLinks.length ===
                      0
                      ? 1
                      : collection.affiliateLinks.length,
                  ).keys(),
                ).map((idx) => {
                  return (
                    <div
                      className="w-[175px]"
                      key={collection.id + 'empty' + idx}
                    ></div>
                  )
                })}
            </div>
          }
        </div>

        <div className="flex flex-col px-5">
          <div className="flex flex-row justify-between ">
            <p className="mt-3 text-lg font-bold">{collection.title}</p>
            {isOwner && (
              <div className="flex flex-row space-x-5">
                <div
                  {...dragHandleProps}
                  onClick={(event) => {
                    event.preventDefault()
                  }}
                  className="flex items-center justify-center"
                >
                  <Move className="h-6 w-6" />
                </div>

                <div
                  onClick={(event) => {
                    event.preventDefault()
                  }}
                  className="flex items-center justify-center"
                >
                  <CollectionDropdown
                    collectionId={collection.id}
                  ></CollectionDropdown>
                </div>
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
}
