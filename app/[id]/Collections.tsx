'use client'
import { Button } from '@/components/ui/button'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { fetcher } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Collections() {
  const { status } = useSession()
  const { userInfo } = useUserInfoContext()
  const router = useRouter()

  const addCollectionOnClick = () => {
    fetcher('http://localhost:3000/api/collection', {
      method: 'POST',
      body: JSON.stringify({
        userId: userInfo.id,
      }),
    }).then((res) => {
      router.replace(`/collections/${res.id}`)
    })
  }
  return (
    <div className="">
      <Button onClick={addCollectionOnClick}> ADD COLLECTION +</Button>
    </div>
  )
}
