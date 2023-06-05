'use client'
import { fetcher, getOrdinal } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { AffiliateLink, Brand } from 'lib/types'
import Link from 'next/link'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'

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
      const { setAffiliateLinksUpdated } = useAffiliateLinksContext()
      const image = row.original.image as string
      const title = row.original.title as string
      const brand = row.original.brand as Brand
      const productLink = row.original.productLink as string
      return (
        <div className="text-leftg">
          <div>
            <img src={image} className="mx-auto h-24 w-24 object-contain" />
          </div>
          <h1 className="">{title}</h1>
          <p className="text-grey">{brand.name}</p>
          <Link className="text-grey" href={productLink} target="_blank">
            {productLink}
          </Link>
          <p className="text-grey">{`${brand.commission.toFixed(
            0,
          )}% commission`}</p>
          <div className="flex flex-row ">
            <button className="mr-5 text-grey hover:text-black"> EDIT </button>
            <button
              className="text-grey hover:text-black"
              onClick={() => {
                fetcher(`/api/affiliateLink/${row.original.id}`, {
                  method: 'DELETE',
                }).then(() => setAffiliateLinksUpdated(true))
              }}
            >
              DELETE
            </button>
          </div>
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
