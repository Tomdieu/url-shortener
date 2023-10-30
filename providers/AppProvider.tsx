"use client";
import { getSession } from "@/lib/getCurrentUser";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface AppProviderTypes {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderTypes) {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    async function fetchSession() {
      let sess = await getSession();
      setSession(sess);
    }

    (async ()=>{
      await fetchSession()
    })();
  }, []);

  return (
    <React.Fragment>
      <SessionProvider session={session}>{children}</SessionProvider>
    </React.Fragment>
  );
}
