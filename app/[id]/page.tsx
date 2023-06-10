import UserProfile from '@/components/user/profile'
import { UserInfo } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  
  return (
    <>
      <UserProfile uuid={params.id} />
    </>
  )
}
