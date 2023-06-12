import Image from 'next/image'
import { UserProfile } from '@/lib/types'

export default function ProfilePicture({
  userProfile,
}: {
  userProfile: UserProfile
}) {
  return (
    <Image
      className="rounded-full"
      alt="profile pic"
      src={userProfile.image}
      width={150}
      height={150}
    />
  )
}
