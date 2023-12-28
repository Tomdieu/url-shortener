
import { withAuth } from "next-auth/middleware";
export type { NextRequestWithAuth } from "next-auth/middleware";

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/auth'
  },
  secret: process.env.NEXTAUTH_SCRET,
});

export const config = {
  matcher: [
    "/dashboard",
  ]
};

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  if("/dashboard/settings" === pathName){
    return NextResponse.rewrite(new URL('/dashboard/settings/profile', request.url))
  }
}