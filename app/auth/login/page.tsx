import LoginForm from "@/components/auth/login";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: 'Trix Url | Login',
  description: 'Authenticate',
  
}

const LoginPage = (props: Props) => {
  
  return (
    <React.Fragment>
      <LoginForm/>
    </React.Fragment>
  )
};

export default LoginPage;
