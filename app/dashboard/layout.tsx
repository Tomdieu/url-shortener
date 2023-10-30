import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import getCurrentUser from "@/lib/getCurrentUser";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Trix Url | Dashboard",
  description: "Trix Url",
};
  
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-screen w-screen flex overflow-hidden font-poppins">
      <div className="hidden h-screen sm:w-4/12 md:w-4/12 xl:w-2/12 transition ease-linear bg-gray-500 sm:flex dark:border-r-gray-300 dark:border-r-1 dark:border-r-white/5">
        <Sidebar />
      </div>
      <div className="flex flex-1 w-full sm:w-8/12 md:w-8/12 xl:w-10/12 transition ease-linear overflow-hidden">
        <div className="w-full rounded-none flex flex-col flex-1 overflow-y-auto dark:bg-[#18181B]">
          <NavBar user={currentUser} />
          <div className="flex-1 px-3 w-full dark:bg-[#18181B]">{children}</div>
        </div>
      </div>
    </div>
  );
}
