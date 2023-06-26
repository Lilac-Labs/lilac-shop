import Image from 'next/image'
import { UserProfile } from '@/lib/types'

export default function Banner({
  userProfile,
}: {
  userProfile: UserProfile
}) {
  return (
    <div className="bg-yellow-500
                    w-full
                    max-h-1/3
                    overflow-hidden
                    ">
        <Image 
        className="w-full"
        alt="profile pic"
        src={"/pink-banner.png"} // Hard coded for now  
        width={150}
        height={150}
        />
    </div>
  )
}
