import LoginForm from "@/components/auth/login";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: 'Trix URL | Login',
  description: 'Sign in to your Trix URL account to manage your shortened links, view analytics, and create new short URLs.',
}
const LoginPage = (props: Props) => {

  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  )
};

export default LoginPage;
