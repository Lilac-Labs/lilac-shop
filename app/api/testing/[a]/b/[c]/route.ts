import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// id is user userName
export async function GET(
  request: NextRequest,
  { params }: { params: { a: string; c: string } },
) {
  return NextResponse.json(params)
}
