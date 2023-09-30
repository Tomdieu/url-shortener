import RegisterForm from '@/components/auth/register'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: 'Trix Url | Register',
    description: 'Authenticate',
    
  }

const RegisterPage = (props: Props) => {
  return (
    <React.Fragment>
        <RegisterForm/>
    </React.Fragment>
  )
}

export default RegisterPage