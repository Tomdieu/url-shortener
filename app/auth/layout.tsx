import TypeWriter from "@/components/typewriter";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ThemeButton from "@/components/ThemeButton"

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Trix Url | Auth",
  description:"Welcome to Trix Url, where security meets simplicity! Our authentication page is your gateway to a seamless and trustworthy URL shortening experience. Safeguarding your links begins here, with state-of-the-art encryption and user-friendly authentication. Join our community of savvy users, and enjoy the peace of mind that comes with knowing your shortened URLs are in safe hands. Fast, reliable, and secure - because your privacy matters",
  openGraph:{
    title:"Trix Url | Auth",
    description:"Welcome to Trix Url, where security meets simplicity! Our authentication page is your gateway to a seamless and trustworthy URL shortening experience. Safeguarding your links begins here, with state-of-the-art encryption and user-friendly authentication. Join our community of savvy users, and enjoy the peace of mind that comes with knowing your shortened URLs are in safe hands. Fast, reliable, and secure - because your privacy matters",
    url:"https://trixurl.vercel.app/auth",
    type:"website"
  },
  twitter:{
    title:"Trix Url | Auth",
    description:"Welcome to Trix Url, where security meets simplicity! Our authentication page is your gateway to a seamless and trustworthy URL shortening experience. Safeguarding your links begins here, with state-of-the-art encryption and user-friendly authentication. Join our community of savvy users, and enjoy the peace of mind that comes with knowing your shortened URLs are in safe hands. Fast, reliable, and secure - because your privacy matters",
    creator: '@tomdieu ivan',
    images: ['https://trixurl.vercel.app/icon.png'],
  }
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex overflow-x-hidden dark:bg-stone-800">
      <div className="hidden sm:w-5/12 md:w-7/12 lg:w-8/12 sm:flex flex-col h-full bg-gray-100 dark:bg-stone-800 container mx-auto">
        <div className="my-2 flex items-center justify-between">
          <h5 className="text-2xl font-bold cursor-pointer select-none dark:text-stone-50">
            <Link href={"/"}>Trix Url</Link>
          </h5>
          <ThemeButton/>
        </div>
        <div className="flex-1 flex items-start justify-center h-full  gap-3 flex-col">
          <h1 className="sm:text-4xl md:text-5xl lg:text-7xl font-bold flex-wrap dark:text-stone-50">
            Url Shortener
          </h1>

          <h5 className="text-medium md:text-3xl font-semibold">
            <TypeWriter />
          </h5>
        </div>
      </div>
      <div className="flex-1 sm:w-7/12 md:w-5/12 lg:w-4/12 h-full bg-white dark:bg-stone-900">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
