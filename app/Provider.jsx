'use client'
import React, { Suspense } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from './AuthProvider';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const Provider = ({children}) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConvexProvider client={convex}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </ConvexProvider>
    </Suspense>
  )
}

export default Provider
