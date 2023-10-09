'use client'
import { Button } from '@nextui-org/react'
import React,{useEffect, useState} from 'react'
import Link from "next/link"
import Image from 'next/image'
import { User } from '@prisma/client'

import UserNav from '../navbar/user-nav'

type HeaderProps = {
    user?:User|null
}

const Header = ({user}: HeaderProps) => {
    return (
        <div className="w-full sticky top-0 left-0 right-0 z-50 px-4 flex items-center justify-between bg-white bg-opacity-40 backdrop-blur-md border-b">
            <div>
            <Image src={"/logo.png"} width={500} height={500} alt='Trix Url' className='w-20 h-20' />
                {/* <span className='font-black text-3xl font-mono'><span className="text-blue-600">T</span>rix <span className='text-orange-400'>U</span>rl</span> */}
            </div>
            {Boolean(!user) && (<div className="flex item-center gap-2">
                <Link href="/auth/login">
                    <Button className="rounded-full text-white bg-blue-600 hover:bg-blue-300">Login</Button>
                </Link>
                <Link href="/auth/register">
                    <Button className="rounded-full text-white bg-black/80 hover:bg-black/70">Register</Button>
                </Link>
            </div>)}

            {user && <UserNav/>}
            
        </div>

    )
}

export default Header