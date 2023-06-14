import { Button } from '@/components/ui/button'
import UserProfile from '@/components/user/profile'
import Collections from './Collections'

export default async function Page({
  params,
}: {
  params: { userName: string }
}) {
  return (
    <div className="content-container">
      <div className="flex flex-col">
        <div className="profile-header flex flex-row items-center justify-center">
          {/* TODO: Add button functionality */}
          <div className="share-link-btn btn">
            <Button className="mt-5">
              <p>Copy Link</p>
            </Button>
          </div>
          {/* TODO: Add button functionality */}
          <div className="analytics-link-label btn">
            <Button className="mt-5">
              <p>Show Analytics</p>
            </Button>
          </div>
        </div>
        <UserProfile userName={params.userName} />
        <Collections />
      </div>
    </div>
  )
}
