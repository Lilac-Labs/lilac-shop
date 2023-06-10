import { UserInfo } from '@/lib/types'
import Image from 'next/image'

export default function ProfilePicture({ userInfo }: { userInfo: UserInfo }) {
  return (
    <Image
        className="rounded-full"
        alt="profile pic"
        src={userInfo.image}
        width={150}
        height={150}
      />
  )
}