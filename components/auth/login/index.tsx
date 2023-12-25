"use client";
import { Button, Divider } from "@nextui-org/react";
import React from "react";
import { Input } from "@nextui-org/react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGithub,
  AiFillGoogleCircle,
} from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { toast } from "react-hot-toast";

import { LINKS } from "@/constants";
import { useRouter } from "next/navigation";

type Props = {};

const LoginForm = (props: Props) => {
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const { email, password } = Object.fromEntries(formData.entries());

    setIsLoading(true);

    signIn("credentials", { email, password, redirect: false }).then(
      (callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          router.refresh();
          toast.success("Logged in Successfully", { position: "top-center" });
          console.log("Login Successfull");
          router.push("/dashboard");
        }

        if (callback?.error) {
          toast.error("Error : " + callback.error);
        }
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3">
        <Link href="/">
          <h5 className="sm:hidden font-bold cursor-pointer select-none text">
            Trix Url
          </h5>
        </Link>
      </div>
      <div className="p-3 sm:px-1 lg:px-5 w-full flex-1 h-fullitems-center justify-center flex flex-col">
        <h1 className="text-3xl font-bold text-center my-5 text">Welcome back</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4 px-1 sm:px-2 lg:px-12"
        >
          <div>
            {/* <h5 className="text-center font-bold">Loggein an account </h5> */}
            <span className="text-current font-light text-xs text-gray-600 text-center block text">
              Enter your email and password to login
            </span>
          </div>
          <div className="w-full">
            <Input
              required
              variant="bordered"
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your email"
              className="rounded-none"
            />
          </div>
          <div className="w-full flex">
            <Input
              required
              name="password"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              className="w-full flex-1"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-black text-white py-6"
            type="submit"
          >
            Login
          </Button>
        </form>

        <div className="flex gap-1 my-3 px-2 lg:px-12 items-center">
          <Divider className="flex-1" />
          <h5 className="text-md text">Or continue with</h5>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-cols gap-2 px-2 lg:px-12">
          <Button
            type="button"
            className="w-full hover:bg-black hover:text-white"
            onClick={() => {
              signIn("github",{callbackUrl: '/dashboard'} )
            }}
          >
            <AiFillGithub />
            <span className="">Github</span>
          </Button>
          <Button
            className="w-full hover:bg-black hover:text-white"
            onClick={() => {
              signIn("google", { callbackUrl: "/dashboard" }).then(
                (callback) => {
                  console.log("Callback", { callback });
                  if (callback?.ok) {
                    router.refresh();
                    toast.success("Logged in Successfully", {
                      position: "top-center",
                    });
                    console.log("Login Successfull");
                    router.push("/dashboard");
                  }

                  if (callback?.error) {
                    toast.error("Error : " + callback.error);
                  }
                }
              );
            }}
          >
            <AiFillGoogleCircle />
            <span className="">Google</span>
          </Button>
        </div>
        <div className="py-5 w-full flex items-center justify-center">
          <h5 className="text-xs text">
            Don&apos;t have an account ?{" "}
            <Link className="font-semibold" href={LINKS.register}>
              Register
            </Link>
          </h5>
        </div>
        <div className="flex py-5 w-full items-center justify-center flex-col text-sm text">
          <h5 className="text-center text-xs lg:text-sm">
            By clicking continue, you agree to our{" "}
          </h5>
          <h5 className="text-xs text-center">
            <a className="underline text-sm" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-sm">
              Privacy Policy
            </a>
            .
          </h5>
        </div>
      </div>
      <div className="flex my-5 flex-col items-center">
        <h5 className="text-md font-bold">Trix Url</h5>
        <p>Copyright &copy; {new Date().getFullYear()} Tomdieu </p>
      </div>
    </div>
  );
};

export default LoginForm;
