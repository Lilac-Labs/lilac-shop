'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { signOut } from 'next-auth/react'
import { LogOut, Menu, MoreVertical } from 'lucide-react'
import Popover from '@/components/shared/popover'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'

export default function MobileDropdown({
  setShowSignInModal,
}: {
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center overflow-hidden rounded-full transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <div className="w-full rounded-md bg-white p-2 sm:w-56">
          <SheetClose asChild>
            <Button
              className="mx-2 rounded-full"
              onClick={() => {
                setShowSignInModal(true)
              }}
            >
              Sign In
            </Button>
          </SheetClose>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
