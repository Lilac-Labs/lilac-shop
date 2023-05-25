'use client';

import DummyProvider  from './dummyProvider';
import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { fetcher } from '../utils';
 
export function Providers({ children }: {
    children: React.ReactNode;
  }) {
    useEffect(() => {
      const getSession_ = async () => {
        const s = await getSession();
        const path = window.location.pathname;
        console.log("path", path)
        console.log("s", s)
        if (s) {
          fetcher(`http://localhost:3000/api/user/byEmail/${s.user?.email}`, { next: { revalidate: 10 } })
            .then((res) => {
              console.log("res", res)
              if (path!== "/accountSettings" && res?.bio === null) {
                window.location.href = "/accountSettings";
              }
            })
            .catch((err) => {
              console.log("err", err)
            }
          );
        }
      }
      getSession_();
    }, []);

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <DummyProvider>
        {children}
      </DummyProvider>
    </SessionProvider>
  );
}