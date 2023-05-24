import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const params = await request.json();
    console.log ("Params:", params);
  
  const result = await prisma.user.update({
      where: {
        email: params.email,
      },
      data: {
        bio: params.bio,
        firstName : params.firstName,
        lastName: params.lastName,
        },
  })
  return NextResponse.json(result)
}
  

