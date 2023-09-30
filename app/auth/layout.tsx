import TypeWriter from "@/components/typewriter";
import { Metadata } from "next";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Trix Url | Auth",
  description: "Authenticate",
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex overflow-x-hidden">
      <div className="hidden sm:w-5/12 md:w-7/12 lg:w-8/12 sm:flex flex-col h-full bg-gray-100 container mx-auto">
        <div className="my-2">
          <h5 className="text-2xl font-bold cursor-pointer select-none">
            <Link href={"/"}>Trix Url</Link>
          </h5>
        </div>
        <div className="flex-1 flex items-start justify-center h-full  gap-3 flex-col">
          <h1 className="sm:text-4xl md:text-5xl lg:text-7xl font-bold flex-wrap">
            Url Shortener
          </h1>

          <h5 className="text-medium md:text-3xl font-semibold">
            <TypeWriter />
          </h5>
        </div>
      </div>
      <div className="flex-1 sm:w-7/12 md:w-5/12 lg:w-4/12 h-full bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
