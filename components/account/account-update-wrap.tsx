import AccountUpdate from './account-update'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function AccountUpdateWrapper() {
  const session = await getServerSession(authOptions)
  return <AccountUpdate session={session} />
}
