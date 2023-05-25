import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log ("params", params.email);

  const user = await prisma.user.findUnique({
      where: {
        email: "t.kam@berkeley.edu",
      }
  })

  console.log("user", user); 
  return NextResponse.json(user)
}

