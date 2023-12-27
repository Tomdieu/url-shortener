"use client"
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from "react";


type ReactQueryProviderProps = {
    children:React.ReactNode
}

const queryClient = new QueryClient()
export default function ReactQueryProvider({children}:ReactQueryProviderProps){
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    );
}