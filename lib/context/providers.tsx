'use client';

import DummyProvider  from './dummyProvider';
import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'next-auth';
<<<<<<< HEAD
import { useEffect } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> refs/remotes/origin/22-dynamic-profile
import { fetcher } from '../utils';
 
export function Providers({ children }: {
    children: React.ReactNode;
  }) {
    useEffect(() => {
      const getSession_ = async () => {
        const s = await getSession();
        const path = window.location.pathname;
        if (s) {
          fetcher(`http://localhost:3000/api/user/byEmail/${s.user?.email}`, { next: { revalidate: 10 } })
            .then((res) => {
              //TODO: change this to createAccount
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