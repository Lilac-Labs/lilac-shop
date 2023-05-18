'use client';
 
import { createContext } from 'react';
 
export const DummyContext = createContext({});

export default function DummyProvider({ children }: {
    children: React.ReactNode;
  }) {
  return <DummyContext.Provider value="dark">{children}</DummyContext.Provider>;
}