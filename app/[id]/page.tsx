import { Button } from '@/components/ui/button'
import UserProfile from '@/components/user/profile'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="content-container">
      <div className="profile-content">
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
        <UserProfile uuid={params.id} />
      </div>
    </div>
  )
}
