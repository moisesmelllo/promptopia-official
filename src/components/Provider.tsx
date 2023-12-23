'use client'
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface ProviderProps <T>{
  children: ReactNode;
  session?: T;
}


const Provider = <T, >({children, session}: ProviderProps<T>) => {
  return (
    <SessionProvider session={session as any}>
      {children}
    </SessionProvider>
  ) 
}

export default Provider