'use client'
import { Button } from '@/components/ui/button'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { fetcher } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function Collections() {
  const { status } = useSession()
  const { userInfo } = useUserInfoContext()
  const { collections } = useAffiliateLinksContext()
  console.log(collections)
  const router = useRouter()

  const addCollectionOnClick = () => {
    fetcher('http://localhost:3000/api/collection', {
      method: 'POST',
      body: JSON.stringify({
        uuid: userInfo.id,
      }),
    }).then((res) => {
      router.replace(`/collections/${String(res.id)}`)
    })
  }
  return (
    <div className="flex flex-col">
      {collections.map((collection) => {
        return (
          <Link href={`/collections/${collection.id}`} key={collection.id}>
            <div className="border-round justify-start border border-gray-300">
              {collection.affiliateLinks.length === 0 ? (
                <Image
                  src="/addNew.jpg"
                  alt="Empty collection"
                  width={150}
                  height={150}
                />
              ) : (
                <div className="flex flex-row">
                  {collection.affiliateLinks
                    .slice(0, 4)
                    .map((affiliateLink) => {
                      return (
                        <div className="basis-1/4" key={affiliateLink.id}>
                          <Image
                            src={affiliateLink.image}
                            alt={affiliateLink.title}
                            width={150}
                            height={150}
                          />
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
            <p className="text-lg">{collection.title}</p>
            <p>{collection.affiliateLinks.length} products</p>
          </Link>
        )
      })}

      <div className="flex flex-row justify-center">
        <Button className="w-48" onClick={addCollectionOnClick}>
          {' '}
          ADD COLLECTION +
        </Button>
      </div>
    </div>
  )
}
