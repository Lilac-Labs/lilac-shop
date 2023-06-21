'use client'
import { Instagram, Tiktok } from '@/components/shared/icons'
import Image from 'next/image'
import { UserProfile } from '@/lib/types'

import { Button } from '../ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, use, useEffect, useState } from 'react'
import ProfilePicture from './profilePic'
import { ProfileForm } from './profileEditForm'
import { copyToClipboard, fetcher } from '@/lib/utils'
import { Link } from 'lucide-react'
import { log } from 'console'
import { useSession } from 'next-auth/react'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { useToast } from '../ui/use-toast'
import { Toast } from '../ui/toast'

// https://ui.shadcn.com/docs/forms/react-hook-form

// Conditionally render a form or a display of the user's profile

export default function UserProfile({ userName }: { userName: string }) {
  const { userInfo, loading } = useUserInfoContext()
  // Profile Display/Form Information
  const [userProfile, setUserProfile] = useState<UserProfile>(
    userInfo.userProfile as UserProfile,
  )
  const isOwner = userInfo.userProfile?.userName === userName
  console.log('isOwner', isOwner)
  // conditional rendering variables
  // if user is owner and userInfo is laoded page is loaded
  const [pageLoaded, setPageLoaded] = useState(isOwner && !loading)
  const [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    // Get the user's information
    const fetchUserInfo = async () => {
      const res = await fetcher(
        `http://localhost:3000/api/users/by-username/${userName}`,
        { cache: 'no-store' },
      )
      if (res === null) {
        console.log('user not found')
      } else {
        console.log(res)
        setUserProfile({
          userName: res.userName,
          firstName: res.firstName,
          lastName: res.lastName,
          bio: res.bio,
          image: res.image,
          uuid: res.uuid,
          socialMedias: res.socialMedias,
          // TODO: dyamic
          ig: 'https://www.instagram.com/',
          tk: 'https://www.tiktok.com/',
        })
      }
      setPageLoaded(true)
    }

    if (!isOwner) {
      fetchUserInfo()
    }
  }, [loading])

  return pageLoaded ? (
    editProfile ? (
      <EditProfileForm
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        onEditClick={() => setEditProfile(false)}
      />
    ) : (
      <ProfileDisplay
        userProfile={userProfile}
        onEditClick={() => setEditProfile(true)}
        isOwner={isOwner}
      />
    )
  ) : (
    <Loading />
  )
}

// Display the user's profile
function ProfileDisplay({
  userProfile,
  onEditClick,
  isOwner,
}: {
  userProfile: UserProfile
  onEditClick: () => void
  isOwner: boolean
}) {
  const { data: session, status } = useSession()
  console.log('ProfileDisplay', isOwner)
  const { toast } = useToast()

  return (
    <div className="mx-[20%] flex w-[60%] flex-col items-center">
      <div className="profile-header flex flex-row items-center justify-center ">
        {/* TODO: Add button functionality */}
        {/* <div className="share-link-btn btn">
          <Button
            className="mt-5"
            onClick={() => {
              toast({
                title: 'Copied to clipboard',
              })
              navigator.clipboard.writeText(
                'withlilac.com/' + userProfile.userName,
              )
            }}
          >
            <p>Copy Link</p>
          </Button>
        </div> */}
        {/* TODO: Add button functionality */}
        {/* <div className="analytics-link-label btn">
          <Button className="mt-5">
            <p>Show Analytics</p>
          </Button>
        </div> */}
      </div>
      <ProfilePicture userProfile={userProfile} />

      <div className="mt-5 flex min-w-[500px] flex-col items-center justify-center rounded-md border">
        <div className=" absolute top-[232px] z-30 bg-white">
          <div className="flex flex-row">
            <h1 className="z-30 mx-2 text-center text-2xl font-bold ">
              {userProfile?.firstName}
            </h1>
            <h1 className="z-30 text-center text-2xl font-bold">
              {userProfile?.lastName}
            </h1>

            {isOwner && (
              <button className="mx-2" onClick={onEditClick}>
                <Image
                  alt="edit profile"
                  src="/edit.png"
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>
        </div>
        <p className="text-md mx-5 my-5 overflow-auto text-left">
          {userProfile?.bio}
        </p>
        <div className="absolute top-[351px] z-30 flex h-fit bg-white">
          <a
            href={userProfile?.ig}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mr-5 flex h-6 w-6 animate-fade-up items-center justify-center  overflow-hidden rounded-md transition-colors hover:bg-gray-200"
          >
            <Instagram className="h-7 w-7" />
          </a>
          <a
            href={userProfile?.tk}
            target="_blank"
            rel="noreferrer"
            className="mx-auto flex h-6 w-6  animate-fade-up items-center justify-center overflow-hidden rounded-md bg-black px-1 transition-colors hover:bg-gray-200"
          >
            <Tiktok className="h-4 w-4 invert" />
          </a>
        </div>
      </div>
    </div>
  )
}

// Edit the user's profile

function EditProfileForm({
  userProfile,
  setUserProfile,
  onEditClick,
}: {
  userProfile: UserProfile
  setUserProfile: Dispatch<SetStateAction<UserProfile>>
  onEditClick: () => void
}) {
  return (
    <>
      <div className="flex flex-col items-center">
        <ProfilePicture userProfile={userProfile} />

        <ProfileForm
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onEditClick={onEditClick}
        />
      </div>
    </>
  )
}

// Edit the user's profile
function Loading() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1> Loading... </h1>
      </div>
    </>
  )
}
