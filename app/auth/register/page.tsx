import RegisterForm from '@/components/auth/register'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: 'Trix URL | Register',
  description: 'Create a free Trix URL account to start shortening links, tracking clicks with analytics, and managing your URLs.',
}
const RegisterPage = (props: Props) => {
  return (
    <React.Fragment>
      <RegisterForm />
    </React.Fragment>
  )
}

export default RegisterPage