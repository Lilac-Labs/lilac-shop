'use client'
import UserProfile from '@/components/user/profile'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { UserInfo } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { use } from 'react'

export default async function Page({ params }: { params: { id: string } }) {
  const { userInfo } = useUserInfoContext()
  return (
    <div className="flex flex-col">
      <Link href={`/${userInfo?.userName}`} className="">
        Your shop
      </Link>
      <p>Hello Collection: {params.id}</p>
    </div>
  )
}
