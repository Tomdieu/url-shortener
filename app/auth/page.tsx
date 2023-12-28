import NextUiButton from "@/components/Btn";
import Link from "next/link";
import React from "react";

type Props = {};
const AuthPage = (props: Props) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3">
        <h5 className="sm:hidden">Trix Url</h5>
      </div>
      <div className="p-3 px-5 w-full flex-1 h-fullitems-center justify-center flex flex-col">
        <h1 className="text-3xl font-bold text-center my-5">Get Started</h1>
        <div className="container mx-auto flex gap-2 items-center justify-arround">
          <Link href={"/auth/login"} className="flex-1 flex">
            <NextUiButton className="flex-1 bg-black hover:bg-black/80 text-white py-6 font-semibold">
              Log in
            </NextUiButton>
          </Link>
          <Link href={"/auth/register"} className="flex-1 flex">
            <NextUiButton className="flex-1 bg-black hover:bg-black/80 text-white py-6 font-semibold">
              Register
            </NextUiButton>
          </Link>
        </div>
      </div>
      <div className="flex my-5 flex-col items-center">
        <h5 className="text-md font-bold">Trix Url</h5>
        <p>Copyright &copy; {new Date().getFullYear()} <span className="font-bold"><Link target="_blank" href="https://github.com/Tomdieu/url-shortener">Trix Url</Link></span> </p>
      </div>
    </div>
  );
};

export default AuthPage;
