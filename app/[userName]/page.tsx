import { Button } from '@/components/ui/button'
import UserProfile from '@/components/user/profile'
import UserDoesNotExist from '@/components/user/user-does-not-exist'
import { fetcher } from '@/lib/utils'
import Collections from './Collections'

export default async function Page({
  params,
}: {
  params: { userName: string }
}) {
  const result = await fetcher(
    `http://localhost:3000/api/users/by-username/${params.userName}`,
  )
  const userExist = result !== null

  return (
    <div className="content-container ml-[10%] mr-[10%] w-[80%]">
      <div className="flex flex-col">
        {userExist ? (
          <>
            <UserProfile userName={params.userName} />
            <Collections userName={params.userName} />
          </>
        ) : (
          <UserDoesNotExist />
        )}
      </div>
    </div>
  )
}
