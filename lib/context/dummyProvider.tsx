'use client';
 
import { usePathname } from 'next/navigation';
import { createContext } from 'react';
 
export const DummyContext = createContext({});

export default function DummyProvider({ children }: {
    children: React.ReactNode;
  }) {

    const dummyData: string = "asdfasdfasdf";
  return <DummyContext.Provider value={{dummyData}}>{children}</DummyContext.Provider>;
}