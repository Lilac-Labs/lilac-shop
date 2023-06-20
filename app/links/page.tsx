import { columns } from './columns'
import { DataTable } from './data-table'
import { fetcher } from '@/lib/utils'

export default async function Home() {
  return (
    <div className="container z-30 mx-auto ml-[10%] mr-[10%] w-[80%] py-10">
      <DataTable columns={columns} />
    </div>
  )
}
