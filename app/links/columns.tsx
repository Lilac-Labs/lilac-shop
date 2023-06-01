"use client";
import { getOrdinal } from "@/lib/utils";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { AffiliateLink, Product } from 'lib/types'
import Link from "next/link";

const columnHelper = createColumnHelper<AffiliateLink>()

// const dateFormat = (date: Date) => {
//     const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const day = date.getDate()
//     const month = date.getMonth()

//     const ord = getOrdinal(day)
//     return 
//   }

export const columns: ColumnDef<AffiliateLink>[] = [
    {
        header: () => <div className="text-center">Created</div>,
        accessorKey: 'createdAt',
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"))
          const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const day = date.getDate()
          const month = date.getMonth()

          const ord = getOrdinal(day)
          return <div className="text-center">{`${monthShortNames[month]} ${day}${ord}`}</div>
        }
    },
    {
        header: () => <div className="text-center">Product</div>,
        accessorKey: 'product',
        accessorFn: (row) => row.product,
    },
    {
        header: () => <div className="text-center">Content</div>,
        accessorKey: 'content',
        cell: ({ row }) => {
          const content = String(row.getValue("content"))
          if (content === undefined) {
            return <Link href={content}> <p>Link to Content</p> </Link>
          }
          return <div className="text-center">-</div>
        }
    },
    {
      header: () => <div className="text-center">Clicks</div>,
      accessorKey: 'clicks',
      cell: ({ row }) => {
        const clicks = parseInt(row.getValue("clicks"))

        return <div className="text-center">{clicks}</div>
      }
    },
    {
      header: () => <div className="text-center">Orders</div>,
      accessorKey: 'orders',
      cell: ({ row }) => {
        const orders = parseInt(row.getValue("orders"))

        return <div className="text-center">{orders}</div>
      }
    },
    {
      header: () => <div className="text-center">Earned</div>,
      accessorKey: 'earned',
      cell: ({ row }) => {
        const earned = parseFloat(row.getValue("earned"))
        const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(earned)

        return <div className="text-center">{formatted}</div>
      }
    },
    {
      header: () => <div className="text-center">Affiliate Link</div>,
      accessorKey: 'url',
      cell: ({ row }) => {
        const link = String(row.getValue("url"))
        
        return <div className="text-center">{link}</div>
      }
    }
]