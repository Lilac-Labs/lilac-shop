import AccountUpdateWrapper from "@/components/account/account-update-wrap";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AccountUpdateWrapper />
    </> 
  );
}
