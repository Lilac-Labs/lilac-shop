'use client'

import Image from 'next/image'
import Link from 'next/link'
import useScroll from '@/lib/hooks/use-scroll'
import { useSignInModal } from './sign-in-modal'
import { useCreatorsApplyModal } from './creators-apply-modal'
import UserDropdown from './user-dropdown'
import { Session } from 'next-auth'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { isEmpty } from '@/lib/utils'
import { Button } from '../ui/button'
import useWindowSize from '@/lib/hooks/use-window-size'
import MobileDropdown from './mobile-dropdown'

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal()
  const { CreatorsApplyModal, setShowCreatorsApplyModal } =
    useCreatorsApplyModal()
  const scrolled = useScroll(50)
  const { userInfo } = useUserInfoContext()
  const isUserInfo = isEmpty(userInfo)
  const { isMobile } = useWindowSize()

  return (
    <>
      <SignInModal />
      <CreatorsApplyModal />
      <div
        className={`top-0 mb-0.5 w-full bg-white/0 ${
          scrolled
            ? 'border-b border-gray-200 bg-white/5 backdrop-blur-xl'
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-3xl">
            <Image
              src="/lilac.svg"
              alt="Precedent logo"
              width="50"
              height="50"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Lilac</p>
          </Link>

          {session && !isUserInfo && (
            <Link
              href={`/${userInfo?.userProfile?.userName}`}
              className="mx-4 flex items-center font-display text-xl"
            >
              <p>Profile</p>
            </Link>
          )}

          {session && !isUserInfo && (
            <Link
              href="/links"
              className="mx-4 flex items-center font-display text-xl"
            >
              <p>Links</p>
            </Link>
          )}

          {/* {session && !isUserInfo && (
            <Link
              href="/earnings"
              className="mx-4 flex items-center font-display text-xl"
            >
              <p>Earnings</p>
            </Link>
          )} */}

          <div>
            {session ? (
              !isUserInfo ? (
                <UserDropdown session={session} />
              ) : null
            ) : (
              // add log in button here
              <div className="flex">
                {!isMobile && (
                  <Button
                    className="mx-2 rounded-full"
                    onClick={() => setShowSignInModal(true)}
                  >
                    Sign In
                  </Button>
                )}
                <Button
                  className="mx-2 rounded-full"
                  onClick={() => setShowCreatorsApplyModal(true)}
                >
                  Apply
                </Button>
                {isMobile && (
                  <MobileDropdown setShowSignInModal={setShowSignInModal} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
