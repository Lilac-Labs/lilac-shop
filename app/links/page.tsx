import { makeData } from './makeData'
import { columns } from './columns'
import { DataTable } from './data-table'
import { fetcher } from '@/lib/utils'

export default async function Home() {
  return (
    <div className="container z-30 mx-auto py-10">
      <DataTable columns={columns} />
    </div>
  )
}
