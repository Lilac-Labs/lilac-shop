'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { UserInfo } from '../types'
import { fetcher } from '../utils'

const UserInfoContext = createContext(
  {} as {
    userInfo: UserInfo
    userInfoUpdated: boolean
    setUserInfoUpdated: React.Dispatch<React.SetStateAction<boolean>>
  },
)

export default function UserInfoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const user = session?.user

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)

  const [userInfoUpdated, setUserInfoUpdated] = useState<boolean>(false)

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetcher(
        // @ts-ignore
        `http://localhost:3000/api/user/byUuid/${session?.user?.id}`,
        { cache: 'no-store' },
      )
      console.log('res', res)
      const userInfo_: UserInfo = {
        id: res.id,
        userName: res.userName,
        firstName: res.firstName,
        lastName: res.lastName,
        bio: res.bio,
        ig: res.ig,
        tk: res.tk,
        image: res.image,
        email: res.email,
      }
      setUserInfo(userInfo_)
    }

    // email is ture when session is true
    if (status === 'authenticated') {
      getUserInfo()
      setUserInfoUpdated(false)
    }
  }, [status, userInfoUpdated])

  return (
    <UserInfoContext.Provider
      value={{ userInfo, userInfoUpdated, setUserInfoUpdated }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}

export function useUserInfoContext() {
  return useContext(UserInfoContext)
}
