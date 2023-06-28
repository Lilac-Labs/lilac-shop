'use client'

import useWindowSize from '@/lib/hooks/use-window-size'
import { columns } from './columns'
import { DataTable } from './data-table'
import { fetcher } from '@/lib/utils'
import { Link } from 'lucide-react'
import LinksList from './links-list'

export default function LinksPageComponent() {
  const { isLg } = useWindowSize()

  return (
    <div className="mx-auto w-full md:w-[90%] py-10 h-fit">
      {isLg ? <LinksList /> : <DataTable columns={columns} />}
    </div>
  )
}
