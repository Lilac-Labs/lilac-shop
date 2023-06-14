'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Laptop,
  LogOut,
  Delete,
  EyeOff,
  Share,
  Copy,
  MoreHorizontal,
} from 'lucide-react'
import Popover from '@/components/shared/popover'
import Image from 'next/image'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { Button } from '@/components/ui/button'
import { fetcher } from '@/lib/utils'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'

export default function CollectionDropdown({
  collectionId,
}: {
  collectionId: number
}) {
  const { userInfo } = useUserInfoContext()
  const { collections, setCollections } = useAffiliateLinksContext()
  const [openPopover, setOpenPopover] = useState(false)

  const deleteOnClick = async () => {
    await fetcher(`/api/collection/byId/${collectionId}`, {
      method: 'DELETE',
    })
    console.log('delete collection', collectionId)
    setCollections(
      collections.filter((collection) => collection.id !== collectionId),
    )
  }

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={deleteOnClick}
            >
              <Delete className="h-4 w-4" />
              <p className="text-sm">Delete</p>
            </button>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <EyeOff className="h-4 w-4" />
              <p className="text-sm">Hide</p>
            </button>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <Copy className="h-4 w-4" />
              <p className="text-sm">Duplicate</p>
            </button>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <Share className="h-4 w-4" />
              <p className="text-sm">Share</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={(event) => {
            event.preventDefault()
            setOpenPopover(!openPopover)
          }}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition-all duration-75  active:scale-95 sm:h-9 sm:w-9"
        >
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </Popover>
    </div>
  )
}
