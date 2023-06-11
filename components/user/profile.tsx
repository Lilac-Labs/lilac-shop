'use client'
import { Instagram, Tiktok } from '@/components/shared/icons'
import Image from 'next/image'
import { UserInfo } from '@/lib/types'
import { Button } from '../ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, use, useEffect, useState } from 'react'
import ProfilePicture from './profilePic'
import { ProfileForm } from './profileEditForm'
import { fetcher } from '@/lib/utils'
import { Link } from 'lucide-react'
import { log } from 'console'
import { useSession } from 'next-auth/react'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'


// https://ui.shadcn.com/docs/forms/react-hook-form


// Conditionally render a form or a display of the user's profile
export default function UserProfile({uuid}: {uuid: string}) {
  // Profile Display/Form Information
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)

  // Authentication Information
  const [userSession, setUserSession] = useState<Session>({} as Session)

  // conditional rendering variables
  const [pageLoaded, setPageLoaded] = useState(false)
  const [userExist, setUserExist] = useState(false)
  const [editProfile, setEditProfile] = useState(false);

  const { data: session } = useSession()

  useEffect(() => {

    // Get the user's information
    (async () => {
      const res =  await fetcher(
        `http://localhost:3000/api/user/byUserName/${uuid}`,
        { cache: 'no-store' },
      )
      if (res === null) {
        console.log('user not found')
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
          // TODO: EMAIL SHOULD NOT BE PUBLIC INFO (NEED TO HASH OR NOT SEND)
          email: res.email,
        })
        setUserExist(true)
      }
      setPageLoaded(true)
    })();
  }, []);



  // Once the user's information is loaded, set to state.
  useEffect(() => {
      if (session === null) {
        console.log('user not authenticated')
        setUserSession({} as Session)
      } else {
        console.log('user authenticated')
        setUserSession(session)
      }
  }, [session])

  return (
    pageLoaded ?
      (userExist ?
        (editProfile ? 
          <EditProfileForm userInfo={userInfo} onEditClick={() => setEditProfile(false)} /> : 
          <ProfileDisplay userInfo={userInfo} userSession={userSession} onEditClick={() => setEditProfile(true)} />)
        : <UserDoesNotExist />)
      : <Loading />)
} 

// Display the user's profile
function ProfileDisplay({ userInfo, userSession, onEditClick }: { userInfo: UserInfo; userSession: Session; onEditClick: () => void }) {
  
  const {status} = useSession()

  // Only allow the user to edit if
  // (1) they are authenticated
  // (2) they are the owner of the profile
  const checkEditPermission = () => {
    if (status === 'authenticated') {
      // TODO: DO NOT USE EMAIL AS A UNIQUE IDENTIFIER
      if (userInfo.email === userSession?.user?.email)
        {
          console.log('user is owner')
          return true
        }
    }
    console.log('user is not owner')
    return false
  }

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

        {(checkEditPermission()) && 
          <button className="z-30" onClick={onEditClick}>
        
            <Image
              alt="edit profile"
              src="/edit.png"
              width={20}
              height={20}
            />
          </button>
          }
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

// Edit the user's profile
function Loading(){
  
  return (
    <>
      <div className="flex flex-col items-center">
        <h1> Loading... </h1>
      </div>
    </>
  );
}

// Edit the user's profile
function UserDoesNotExist(){
  
  const handleClick = () => {
    console.log('clicked')
    window.location.href = `/`
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1> Oops. This user does not exist. </h1>
        <Button onClick={handleClick} className="mt-5">
          <p>Return to Home</p>
        </Button>
      </div>
    </>
  );
}
