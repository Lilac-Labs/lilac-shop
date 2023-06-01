"use client";
import { getOrdinal } from '@/lib/utils';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { create } from 'domain';
import { AffiliateLink, Product } from 'lib/types'
import Link from 'next/link';
import { use, useMemo, useReducer, useRef, useState } from 'react';
import { makeData } from './makeData';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function Home() {

  // const rerender = useReducer(() => ({}), {})[1]

  // const [ sorting, setSorting] = useState<SortingState>([])

  // const dateFormat = (date: Date) => {
  //   const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   const day = date.getDate()
  //   const month = date.getMonth()

  //   const ord = getOrdinal(day)
  //   return `${monthShortNames[month]} ${day}${ord}`
  // }

  // const contentFormat = (content: any) => {
  //   if (content === undefined) {
  //     return <p>Link to Content</p>
  //   }
  //   return <Link href={content}> <p>Link to Content</p> </Link>
  // }

  // const columns = useMemo<ColumnDef<AffiliateLink>[]>(
  //   () => [
  //     {
  //       header: 'Created',
  //       accessorKey: 'createdAt',
  //       accessorFn: (row) => dateFormat(row.createdAt),
  //     },
  //     {
  //       header: 'Product',
  //       accessorKey: 'product',
  //       accessorFn: (row) => row.product,
  //     },
  //     {
  //       header: 'Content',
  //       accessorKey: 'content',
  //       cell: props => contentFormat(props.getValue()),
  //     },
  //     {
  //       header: 'Clicks',
  //       accessorKey: 'clicks',
  //       accessorFn: (row) => row.clicks,
  //     },
  //     {
  //       header: 'Orders',
  //       accessorKey: 'orders',
  //       accessorFn: (row) => row.orders,
  //     },
  //     {
  //       header: 'Earned',
  //       accessorKey: 'earned',
  //       accessorFn: (row) => row.earned,
  //     },
  //     {
  //       header: 'Link',
  //       accessorKey: 'link',
  //       accessorFn: (row) => row.url
  //     }
  //   ],
  //   []
  // )

  // const columnHelper = createColumnHelper<AffiliateLink>()

  // const columns = [
  //   columnHelper.accessor(row => dateFormat(row.createdAt),{
  //       header: 'Created',
  //   }),
  //   columnHelper.display({
  //       header: 'Product',
  //       cell: props => props.getValue()
  //   }),
  // ]

  // const [ data, setData ] = useState(() => makeData(10))
  // const refreshData = () => setData(makeData(10))

  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     sorting,
  //   },
  //   onSortingChange: setSorting,
  //   getCoreRowModel: getCoreRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   debugTable: true,
  // })

  // const tableContainerRef = useRef<HTMLDivElement>(null)

  // const { rows } = table.getRowModel()
  // const rowVirtualizer = useVirtual
  
  const data = makeData(10)

  return (
    // <>
    //   {/* <h1 className="z-30 text-2xl font-bold text-center">Links Page in development...</h1> */}
    //   <div className='p-2 z-30' >
    //     <table>
    //       <thead>
    //         {table.getHeaderGroups().map(headerGroup => (
    //           <tr key={headerGroup.id}>
    //             {headerGroup.headers.map(header => {
    //               return (
    //                 <th key={header.id} colSpan={header.colSpan}>
    //                   {
    //                     header.isPlaceholder ? null : (
    //                       <div {...{className: header.column.getCanSort() ? 'cursor-pointer select-none' : '', 
    //                       onClick: header.column.getToggleSortingHandler()}}
    //                       >
    //                         {flexRender(
    //                           header.column.columnDef.header,
    //                           header.getContext(),
    //                         )}
    //                         {{
    //                           asc: '↑',
    //                           desc: '↓',
    //                         }[header.column.getIsSorted() as string] ?? null}
    //                       </div>
    //                     )
    //                   }
    //                 </th>
    //               )
    //             })}
    //           </tr>
    //         ))}
    //       </thead>
    //       <tbody>
    //         {
    //           table.getRowModel()
    //           .rows.slice(0, 10)
    //           .map(row => {
    //             return (
    //               <tr key={row.id}>
    //                 {row.getVisibleCells().map(cell => {
    //                   return (
    //                     <td key = {cell.id}>
    //                       {flexRender(
    //                         cell.column.columnDef.cell,
    //                         cell.getContext(),
    //                       )}
    //                     </td>
    //                   )
    //                 })}
    //               </tr>
    //             )
    //           })
    //         }
    //       </tbody>
    //     </table>
    //   </div>
    // </>
    <div className="container mx-auto py-10 z-30">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
