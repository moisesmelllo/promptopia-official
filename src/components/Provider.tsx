'use client'
import { ReactNode } from "react"

interface ProviderProps<T = any> {
  children: ReactNode;
  session: T;
}


const Provider = <T, >({children, session}: ProviderProps<T>) => {
  return (
    <div>Provider</div>
  ) 
}

export default Provider