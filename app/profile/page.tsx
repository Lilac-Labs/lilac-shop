import { Instagram, Tiktok } from "@/components/shared/icons";
import Image from "next/image";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { GET } from "@/app/api/profile/route";

export default async function Home() {

  async function getData() {
    const res = await GET();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
  }

  const session = await getServerSession(authOptions);
  const { email, image } = session?.user || {};
  const res = await getData();

  return (
    <>
      <div className="z-10 rounded-full mb-5"> 
          <Image 
              alt="profile pic" 
              src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`} 
              width={150} 
              height={150} />
      </div>
      <h1 className="z-30 text-2xl font-bold text-center">{res.name}</h1>
      <p className="z-30 text-md text-center">{res.bio}</p>
      <div className="flex z-30">
        <a
            href={res.ig}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <Instagram className="h-5 w-5 text-[#1d9bf0]" />

        </a>
        <a
            href={res.tk}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <Tiktok className="h-5 w-5 text-[#1d9bf0]" />
            
        </a>
      </div>
    </>
  );
}
