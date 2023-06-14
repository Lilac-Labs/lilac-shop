'use client'
import { LoadingDots } from '@/components/shared/icons'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { Collection, UserInfo, UserProfile } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CollectionForm } from './collection-edit-form'

export default function CollectionComponents({
  collectionId,
}: {
  collectionId: string
}) {
  const { userInfo } = useUserInfoContext()
  const [collection, setCollection] = useState<Collection>({} as Collection)
  const [loading, setLoading] = useState<boolean>(true)
  const [editMode, setEditMode] = useState<boolean>(false)

  useEffect(() => {
    const fetchCollection = async () => {
      const res = await fetcher(`/api/collection/byId/${collectionId}`)

      setCollection(res)
      setLoading(false)
    }

    fetchCollection()
  }, [])
  console.log(loading)
  // const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const res = await fetcher(
  //       `/api/userProfile/byUserName/${collectionData.userName}`,
  //     )
  //     setUserProfile(res)
  //   }
  //   if (userInfo.userProfile?.userName !== collectionData.userName) {
  //     fetchUserProfile()
  //   } else {
  //     setUserProfile(userInfo.userProfile)
  //   }
  // }, [])

  return (
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
            <div className="flex flex-row">
              <Link href={`/${collection.userName}`}></Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Collection not found</div>
      )}
    </div>
  )
}
