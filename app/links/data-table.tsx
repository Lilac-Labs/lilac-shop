'use client'

import { useEffect, useState } from 'react'

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface FilterFns {
    productSearch: FilterFn<unknown>
  }
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Input } from '@/components/ui/input'
import { LoadingCircle, LoadingDots } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { useCreateNewLinkModal } from '@/components/linksPage/create-new-link-modal'
import { Brand } from '@/lib/types'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData>[]
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  // const [data, setData] = useState<TData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { affiliateLinks, setAffiliateLinksUpdated } =
    useAffiliateLinksContext()
  const { CreateNewLinkModal, setShowCreateNewLinkModal } =
    useCreateNewLinkModal(setAffiliateLinksUpdated)
  const data = affiliateLinks as TData[]

  const productSearchFilter: FilterFn<any> = (row, id, value, addMeta) => {
    const title = row.original.title as string
    const brand = row.original.brand as Brand
    return (title.toLowerCase() + brand.name.toLowerCase()).includes(
      value.toLowerCase(),
    )
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    filterFns: {
      productSearch: productSearchFilter,
    },
  })
  // console log current page

  return (
    <div>
      <CreateNewLinkModal />
      <div className="flex flex-row items-center py-4">
        <Input
          placeholder="SEARCH EXISITING LINKS"
          value={(table.getColumn('product')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('product')?.setFilterValue(event.target.value)
          }
          className="max-w-sm basis-1/2"
        />
        <Button
          className="item-right ml-auto"
          onClick={() => setShowCreateNewLinkModal(true)}
        >
          CREATE NEW LINK
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <LoadingDots color="#808080" />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          1
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </Button>
        <Input
          type="number"
          className="h-9 w-9 rounded-md text-center"
          min={1}
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
        ></Input>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &gt;
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {table.getPageCount()}
        </Button>
      </div>
    </div>
  )
}
