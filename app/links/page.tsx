import { makeData } from './makeData'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function Home() {
  const data = makeData(10)

  return (
    <div className="container z-30 mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
