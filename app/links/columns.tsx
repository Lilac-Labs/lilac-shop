'use client'
import { getOrdinal } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { AffiliateLink, Product } from 'lib/types'
import Link from 'next/link'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<AffiliateLink>[] = [
  {
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const monthShortNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const day = date.getDate()
      const month = date.getMonth()

      const ord = getOrdinal(day)
      return (
        <div className="text-center">{`${monthShortNames[month]} ${day}${ord}`}</div>
      )
    },
  },
  {
    header: () => <div className="text-center">Product</div>,
    accessorKey: 'product',
    filterFn: 'productSearch',
    cell: ({ row }) => {
      const product = row.getValue('product') as Product
      return (
        <div className="text-center">
          <div>
            <img
              src={product.image}
              className="mx-auto h-24 w-24 object-contain"
            />
          </div>
          <h1 className="">{product.tittle}</h1>
          <p className="text-grey">{product.brand.name}</p>
          <Link className="text-grey" href={product.link} target="_blank">
            {product.link}
          </Link>
          <p className="text-grey">{`${product.brand.commission.toFixed(
            0,
          )}% commission`}</p>
        </div>
      )
    },
  },
  {
    header: () => <div className="text-center">Content</div>,
    accessorKey: 'content',
    cell: ({ row }) => {
      const content = String(row.getValue('content'))
      if (content === undefined) {
        return (
          <Link href={content}>
            {' '}
            <p>Link to Content</p>{' '}
          </Link>
        )
      }
      return <div className="text-center">-</div>
    },
  },
  {
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    accessorKey: 'clicks',
    cell: ({ row }) => {
      const clicks = parseInt(row.getValue('clicks'))

      return <div className="text-center">{clicks}</div>
    },
  },
  {
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    accessorKey: 'orders',
    cell: ({ row }) => {
      const orders = parseInt(row.getValue('orders'))

      return <div className="text-center">{orders}</div>
    },
  },
  {
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Earned
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    accessorKey: 'earned',
    cell: ({ row }) => {
      const earned = parseFloat(row.getValue('earned'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(earned)

      return <div className="text-center">{formatted}</div>
    },
  },
  {
    header: () => <div className="text-center">Affiliate Link</div>,
    accessorKey: 'link',
    cell: ({ row }) => {
      const link = String(row.getValue('link'))

      return <div className="text-center">{link}</div>
    },
  },
]
