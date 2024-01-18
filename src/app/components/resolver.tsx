'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, {FC, ReactNode} from 'react'

interface ProvidersProps{
  children: ReactNode;
}


const queryClient = new QueryClient()

const Providing: FC<ProvidersProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Providing;