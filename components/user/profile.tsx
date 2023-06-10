'use client'
import { Instagram, Tiktok } from '@/components/shared/icons'
import Image from 'next/image'
import { UserInfo } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ProfilePicture from './profilePic'
import { ProfileForm } from './profileEditForm'
import { fetcher } from '@/lib/utils'


// https://ui.shadcn.com/docs/forms/react-hook-form


// Conditionally render a form or a display of the user's profile
export default function UserProfile({uuid}: {uuid: string}) {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const res =  await fetcher(
        `http://localhost:3000/api/user/byUserName/${uuid}`,
        { cache: 'no-store' },
      )
      if (res === null) {
        console.log('user not found')
        //TODO: Handle in middleware before page is loaded.
        router.replace('/')
      } else {
        setUserInfo({
          id: res.id,
          userName: res.userName,
          firstName: res.firstName,
          lastName: res.lastName,
          bio: res.bio,
          ig: res.ig,
          tk: res.tk,
          image: res.image,
          email: res.email,
        })
      }
    })();
  }, []);
  const [editProfile, setEditProfile] = useState(false);
  return (
    editProfile ? 
      <EditProfileForm userInfo={userInfo} onEditClick={() => setEditProfile(false)} /> : 
      <ProfileDisplay userInfo={userInfo} onEditClick={() => setEditProfile(true)} />
  );
} 

// Display the user's profile
function ProfileDisplay({ userInfo, onEditClick }: { userInfo: UserInfo; onEditClick: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <ProfilePicture userInfo={userInfo} />
      <div className="flex flex-row">
        <h1 className="z-30 mx-2 text-center text-2xl font-bold">
          {userInfo.firstName}
        </h1>
        <h1 className="z-30 text-center text-2xl font-bold">
          {userInfo.lastName}
        </h1>
        <button className="z-30" onClick={onEditClick}>
          <Image
            alt="edit profile"
            src="/edit.png"
            width={20}
            height={20}
          />
        </button>
      </div>
      <p className="text-md text-center">{userInfo.bio}</p>
      <div className="flex">
        <a
          href={userInfo.ig}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Instagram className="h-5 w-5 text-[#1d9bf0]" />
        </a>
        <a
          href={userInfo.tk}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Tiktok className="h-5 w-5 text-[#1d9bf0]" />
        </a>
      </div>
    </div>
  )
}

// Edit the user's profile
function EditProfileForm({ userInfo, onEditClick }: { userInfo: UserInfo; onEditClick: () => void }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <ProfilePicture userInfo={userInfo} />
        <ProfileForm userInfo={userInfo} onEditClick={onEditClick} />
      </div>
    </>
  );
}