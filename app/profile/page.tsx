import { Instagram, Tiktok } from '@/components/shared/icons'
import Image from 'next/image'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

import { fetcher } from '@/lib/utils'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const { email, image } = session?.user || {}

  const inputs = {
    email: email,
  }

  // Make call to accountUpdate API
  const APIurl = `http://localhost:3000/api/user/byEmail/${email}`
  const res = await fetcher(APIurl)
  return (
    <>
      <div className="z-10 mb-5 rounded-full">
        <Image
          alt="profile pic"
          src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
          width={150}
          height={150}
        />
      </div>
      <div className="flex">
        <h1 className="z-30 mx-2 text-center text-2xl font-bold">
          {res.firstName}
        </h1>
        <h1 className="z-30 text-center text-2xl font-bold">{res.lastName}</h1>
      </div>
      <p className="text-md z-30 text-center">{res.bio}</p>
      <div className="z-30 flex">
        <a
          href={res.ig}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Instagram className="h-5 w-5 text-[#1d9bf0]" />
        </a>
        <a
          href={res.tk}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Tiktok className="h-5 w-5 text-[#1d9bf0]" />
        </a>
      </div>
    </>
  )
}
