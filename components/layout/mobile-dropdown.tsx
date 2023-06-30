'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { LogOut, Menu, MoreVertical } from 'lucide-react'
import Popover from '@/components/shared/popover'

export default function MobileDropdown() {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
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
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Popover>
    </div>
  )
}
