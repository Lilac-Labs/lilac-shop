'use client'

import { useSession } from 'next-auth/react'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'

export const User = () => {
  const { data: session } = useSession()
  const { userInfo } = useUserInfoContext()

  return (
    <div>
      <h1>Client Session</h1>
      <p>{JSON.stringify(session)}</p>
      <p>Userinfo {JSON.stringify(userInfo)}</p>
      <p>{Object.keys(userInfo).length}</p>
    </div>
  )
}
