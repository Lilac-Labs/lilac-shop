import UserProfile from '@/components/user/profile'
import { UserInfo } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { redirect } from 'next/navigation'
// import { useEffect, useState } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetcher(
    `http://localhost:3000/api/user/byUserName/${params.id}`,
    { cache: 'no-store' },
  )

  if (res === null) {
    // redirect to 404
    redirect('/')
  }
  const userInfo: UserInfo = {
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
  return (
    <>
      <UserProfile userInfo={userInfo} />
    </>
  )
}
