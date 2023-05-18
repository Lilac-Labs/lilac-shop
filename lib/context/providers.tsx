'use client';

import DummyProvider  from './dummyProvider';
 
export function Providers({ children }: {
    children: React.ReactNode;
  }) {
  return (
    <DummyProvider>
    {children}
    </DummyProvider>
  );
}