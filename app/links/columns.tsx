'use client'
import { fetcher, getOrdinal } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { AffiliateLink, Brand } from 'lib/types'
import Link from 'next/link'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useEditLinkModal } from '@/components/linksPage/edit-link-modal'

export const columns: ColumnDef<AffiliateLink>[] = [
  {
    header: ({ column }) => {
      return (
        <div className="text-center w-fit">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc')
            }}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'createdAt',
    accessorFn: (row) => {
      return new Date(row.link?.createdAt as Date)
    },
    cell: ({ row }) => {
      const date = new Date(row.original.link?.createdAt as Date)
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
    //@ts-ignore
    filterFn: 'productSearch',
    cell: ({ row }) => {
      const { setAffiliateLinksUpdated } = useAffiliateLinksContext()
      const image = row.original.image as string
      const title = row.original.title as string
      const brand = row.original.brand as Brand
      const productLink = row.original.link?.productLink as string
      const { EditLinkModal, setShowEditLinkModal } = useEditLinkModal(
        row.original,
      )
      return (
        <div className="text-left">
          <EditLinkModal />
          <div>
            <img src={image} className="mx-auto h-24 w-24 object-contain" />
          </div>
          <h1 className="">{title}</h1>
          <p className="text-grey">{brand.name}</p>
          <Link className="text-grey" href={productLink} target="_blank">
            {productLink.slice(0, 30) + '...'}
          </Link>
          <p className="text-grey">{`${brand.commission.toFixed(
            0,
          )}% commission`}</p>
          <div className="flex flex-row ">
            <button
              className="mr-5 text-grey hover:text-black"
              onClick={() => {
                setShowEditLinkModal(true)
              }}
            >
              {' '}
              EDIT{' '}
            </button>
            <button
              className="text-grey hover:text-black"
              onClick={() => {
                fetcher(
                  `/api/users/by-uuid/-/affiliatelinks/${row.original.id}`,
                  {
                    method: 'DELETE',
                  },
                ).then(() => setAffiliateLinksUpdated(true))
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
      const content = row.original.collection?.title
      if (content === undefined) {
        return <p className="text-center">-</p>
      }
      return (
        <Link
          href={`/collections/${row.original.collection?.id}`}
          target="_blank"
        >
          <p className="text-center underline decoration-solid">{content}</p>
        </Link>
      )
    },
  },
  {
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    accessorKey: 'clicks',
    accessorFn: (row) => {
      return parseInt(row.link?.clicks as string)
    },
    cell: ({ row }) => {
      const clicks = parseInt(row.original.link?.clicks as string)

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
    accessorFn: (row) => {
      return parseInt(row.link?.orders as string)
    },
    cell: ({ row }) => {
      const orders = parseInt(row.original.link?.orders as string)

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
      const earned = parseFloat(row.original.link?.earned as string)
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
      const link = String(
        `https://link-m.herokuapp.com/${row.original.link?.id}`,
      )

      return (
        <Link className="text-center w-fit" href={link} target="_blank">
          {link}
        </Link>
      )
    },
  },
]
