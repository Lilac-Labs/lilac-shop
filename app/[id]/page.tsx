import UserProfile from '@/components/user/profile'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <UserProfile uuid={params.id} />
    </>
  )
}
