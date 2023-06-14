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
    loading: boolean
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

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetcher(
        // @ts-ignore
        `http://localhost:3000/api/user/byUuid/${session?.user?.id}`,
        { cache: 'no-store' },
      )

      const userInfo_: UserInfo = {
        id: res.id,
        email: res.email,
        image: res.image,
        name: res.name,
        emailVerified: res.emailVerified,
        userProfile: res.userProfile,
      }
      setUserInfo(userInfo_)
      setLoading(false)
    }

    // email is ture when session is true
    if (status === 'authenticated') {
      getUserInfo()
      setUserInfoUpdated(false)
    }
  }, [status, userInfoUpdated])

  return (
    <UserInfoContext.Provider
      value={{ userInfo, userInfoUpdated, setUserInfoUpdated, loading }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}

export function useUserInfoContext() {
  return useContext(UserInfoContext)
}
