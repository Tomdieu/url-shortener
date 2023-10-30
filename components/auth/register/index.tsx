"use client";
import { Button, Divider } from "@nextui-org/react";
import React from "react";
import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGithub,
  AiFillGoogleCircle,
} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants";
import toast from "react-hot-toast";

type Props = {};

const RegisterForm = (props: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  // const toggleVisibility = () => setIsVisible(!isVisible);

  const toggleVisibility = React.useCallback(()=>{
    setIsVisible(!isVisible);
  },[isVisible])

  const handSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);

    const { name, email, password } = Object.fromEntries(formData.entries());
    const user = { name, email, password };

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3">
        <Link href="/">
          <h5 className="sm:hidden font-bold cursor-pointer select-none">
            Trix Url
          </h5>
        </Link>
      </div>
      <div className="p-3 px-5 w-full flex-1 h-fullitems-center justify-center flex flex-col">
        <h1 className="text-3xl font-bold text-center my-5">
          Welcome To TrixUrl
        </h1>
        <form
          onSubmit={handSubmit}
          method="post"
          className="flex flex-col gap-4 px-2 lg:px-12"
        >
          <div>
            <h5 className="text-center font-bold">Create an account </h5>
            <span className="text-current font-light text-xs text-gray-600 text-center block">
              Fill the form below
            </span>
          </div>
          <div className="w-full">
            <Input
              variant="bordered"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              className="rounded-none"
              required
            />
          </div>
          <div className="w-full">
            <Input
              variant="bordered"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              className="rounded-none"
              required
            />
          </div>
          <div className="w-full flex">
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              className="w-full flex-1"
              name="password"
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
              required
            />
          </div>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-black text-white py-6"
            type="submit"
          >
            Register
          </Button>
        </form>

        <div className="flex gap-1 my-3 px-2 lg:px-12 items-center">
          <Divider className="flex-1" />
          <h5 className="text-md">Or continue with</h5>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-cols gap-2 px-2 lg:px-12">
          <Button
            type="button"
            className="w-full hover:bg-black hover:text-white"
            onClick={async () => {await signIn("github",{callbackUrl: '/dashboard'} )}}
          >
            <AiFillGithub />
            <span className="">Github</span>
          </Button>
          <Button
            className="w-full hover:bg-black hover:text-white"
            onClick={() => {
              signIn("google", { callbackUrl: "/dashboard" }).then(
                (callback) => {
                  console.log(callback);
                  if (callback?.ok) {
                    router.refresh();
                    toast.success("Logged in Successfully", {
                      position: "top-center",
                    });
                    console.log("Login Successfully");
                    router.push("/dashboard");
                  }

                  if (callback?.error) {
                    console.log(callback.error);
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
          <h5 className="text-xs">
            Already have an account ?{" "}
            <Link className="font-semibold" href={LINKS.login}>
              Login
            </Link>
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

export default RegisterForm;
