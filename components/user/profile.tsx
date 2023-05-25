import { Instagram, Tiktok } from "@/components/shared/icons";
import Image from "next/image";
import { UserInfo } from "@/lib/types";

/**
 *  https://stackoverflow.com/questions/68829568/how-to-pass-an-object-of-an-interface-and-some-other-type-to-functional-componen
*/

export default function UserProfile({ userInfo } : 
    {userInfo: UserInfo}) {

  return (
    <>
      <div className="z-10 rounded-full mb-5"> 
          <Image 
              alt="profile pic" 
              src={userInfo.image} 
              width={150} 
              height={150} />
      </div>
      <div className="flex">
      <h1 className="z-30 text-2xl font-bold text-center mx-2">{userInfo.firstName}</h1>
      <h1 className="z-30 text-2xl font-bold text-center">{userInfo.lastName}</h1>
      </div>
      <p className="z-30 text-md text-center">{userInfo.bio}</p>
      <div className="flex z-30">
        <a
            href={userInfo.ig}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <Instagram className="h-5 w-5 text-[#1d9bf0]" />

        </a>
        <a
            href={userInfo.tk}
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
