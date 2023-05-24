'use client';
import { useSession } from "next-auth/react"
import { fetcher } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

/**
 * A component that redirects to the signup page if the user is logged in but not signed up.
 * @returns empty element
 */

export default async function SignUpRedirect() {
  const { status } = useSession()
  // const { asPath } = useRouter();
  console.log("status", status)
  // if (status) {
  //   const { email } = session?.user || {};

  //   const res = await fetcher(`${process.env.BASE_URL}/api/user/byEmail/${email}`, { next: { revalidate: 10 } });

  //   console.log(asPath)
  //   if (asPath!== "/profile" && res.bio === null) {
  //     redirect('/profile');
  //   }
    
  // }
  return <div>{null}</div>
}
