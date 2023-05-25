'use client';

import DummyProvider  from './dummyProvider';
import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { fetcher } from '../utils';
 
export function Providers({ children }: {
    children: React.ReactNode;
  }) {

  //  const [ session, setSession ] = useState<Session | null>(null);
  
  //   useEffect(() => {
  //     const getSession_ = async () => {
  //       const s = await getSession();
  //       const path = window.location.pathname;
  //       console.log("path", path)
  //       console.log("s", s)
  //       if (s) {
  //         fetcher(`http://localhost:3000/api/user/byEmail/${s.user?.email}`, { next: { revalidate: 10 } })
  //           .then((res) => {
  //             console.log("res", res)
  //             //TODO: change this to createAccount
  //             if (path!== "/profile" && res?.bio === null) {
  //               window.location.href = "/profile";
  //             }
  //           })
  //           .catch((err) => {
  //             console.log("err", err)
  //           }
  //         );
  //       }

  //       setSession(s);
  //     }
  //     getSession_();
  //   }, []);

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <DummyProvider>
        {children}
      </DummyProvider>
    </SessionProvider>
  );
}