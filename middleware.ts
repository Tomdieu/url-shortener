
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
  callbacks:{
    authorized:(param)=>{
      if(param.token) return true;
      return false;
    }
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
  ]
};

