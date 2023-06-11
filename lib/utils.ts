import ms from 'ms'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Brand } from './types'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
  return res.json()
}

export const parse = (req: NextRequest) => {
  let domain = req.headers.get('host') as string
  domain = domain.replace('www.', '') // remove www. from domain
  const path = req.nextUrl.pathname
  const key = decodeURIComponent(path.split('/')[1]) // decodeURIComponentto handle foreign languages like Hebrew
  const fullKey = decodeURIComponent(path).slice(1)

  return { domain, path, key, fullKey }
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return '0'
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol
    : '0'
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length)}...`
}

export function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

export function getOrdinal(n: number): string {
  let ord = 'th'

  if (n % 10 == 1 && n % 100 != 11) {
    ord = 'st'
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = 'nd'
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = 'rd'
  }

  return ord
}

export const formatBrandSelect = (brand: Brand) => {
  return `${brand.name}, ${brand.commission}% commission`
}
