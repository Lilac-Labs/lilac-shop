import AccountUpdate from '@/components/account/account-update'

export default async function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <AccountUpdate />
      </div>
    </>
  )
}
