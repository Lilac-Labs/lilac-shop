'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Laptop, LogOut } from 'lucide-react'
import Popover from '@/components/shared/popover'
import Image from 'next/image'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'

export default function UserDropdown({ session }: { session: Session }) {
  const { userInfo } = useUserInfoContext()
  const [openPopover, setOpenPopover] = useState(false)

  if (!userInfo) return null

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <Link
              href="/accountSettings"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Account Settings</p>
            </Link>
            <Link
              href="/mediaConnect"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <Laptop className="h-4 w-4" />
              <p className="text-sm">Media Connect</p>
            </Link>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={userInfo.id}
            src={
              userInfo.userProfile?.image ||
              `https://avatars.dicebear.com/api/micah/${userInfo.email}.svg`
            }
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  )
}
