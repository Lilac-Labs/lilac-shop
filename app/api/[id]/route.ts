import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log ("params", params.id);
  const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
  })
  console.log("user", user); 
  return NextResponse.json(user)
}
  