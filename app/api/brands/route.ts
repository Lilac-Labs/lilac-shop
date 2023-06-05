import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const brands = await prisma.brand.findMany()
  return NextResponse.json(brands)
}
