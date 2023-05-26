"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserInfo } from "../types";
import { fetcher } from "../utils";

const UserInfoContext = createContext( {} as { userInfo: UserInfo });

export default function UserInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  const [ userInfo, setUserInfo ] = useState<UserInfo>({} as UserInfo);

  const email = session?.user?.email;
  
  

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetcher(`http://localhost:3000/api/user/byEmail/${email}`, { next: { revalidate: 10 } });
      const userInfo_: UserInfo = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          bio: res.bio,
          ig: res.ig,
          tk: res.tk,
          image: res.image,
          email: res.email,
      }
      setUserInfo(userInfo_);
    }

    if (email) {

      getUserInfo();
    }
  }, [email]);

  


  return (
    <UserInfoContext.Provider value={{ userInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}
