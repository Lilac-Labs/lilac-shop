import AccountUpdate from "@/components/account/account-update";
// import AccountUpdateWrapper from "@/components/account/account-update-wrap";

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AccountUpdate />
    </> 
  );
}