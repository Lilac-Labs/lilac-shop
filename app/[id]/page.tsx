import UserProfile from '@/components/user/profile'
import { UserInfo } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { redirect } from 'next/navigation'
import Collections from './Collections'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center">
      <UserProfile uuid={params.id} />
      <Collections />
    </div>
  )
}
