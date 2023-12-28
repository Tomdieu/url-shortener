// 'use client'
// import React,{useCallback, useEffect, useState} from 'react'
import Link from "next/link"
import Image from 'next/image'
import { User } from '@prisma/client'

import UserNav from '../navbar/user-nav'

import {Button} from "@/components/ui/button"

import ThemeButton from "@/components/ThemeButton"

import { Moon,Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

type HeaderProps = {
    user?:User|null
}

const Header = ({user}: HeaderProps) => {
    // const { systemTheme, theme, setTheme } = useTheme();
    // const currentTheme = theme === 'system' ? systemTheme : theme;
    // const isDark = currentTheme === 'dark'
    
    // const toggleTheme = useCallback(() => {
    //   setTheme(theme === 'dark' ? 'light' : 'dark');
    // }, [theme, setTheme]);

    return (
        <div className="dark:bg-stone-900 w-full sticky top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between bg-white bg-opacity-40 backdrop-blur-md rounded-none border-b dark:border-b-stone-700 dark:shadow-xl">
            <div className="container flex items-center justify-between">
            <div className="flex items-center gap-1">
            <Image src={"/icon.png"} width={50} height={50} alt='Trix Url' className='w-17 h-17' />
            <span className="text-2xl lg:text-3xl text font-poppins">Trix Url</span>

            {/* <Image src={!isDark ?"/icon.png" :"/logo-white-icon.png"} width={50} height={50} alt='Trix Url' className='w-17 h-17' /> */}
            </div>
            <div className={"items-center flex justify-end space-x-2"}>
                <Link href={"/dashboard"}>
                <Button variant="ghost" className="border-none transition-transform transform active:scale-90 text-stone-50 rounded-full bg-stone-700 ">
                    Dashboard
                </Button>
                </Link>
                <ThemeButton/>
                {/* <Button variant="outline" size="icon" onClick={toggleTheme}>
                {currentTheme === 'dark' ? <Sun /> : <Moon />}
                </Button> */}
                {Boolean(!user) && (<div className="flex item-center gap-2">
                    <Link href={"/auth/login"}>
                        <Button className="rounded-full text-white bg-blue-600 hover:bg-blue-300">Login</Button>
                    </Link>
                    <Link href={"/auth/register"}>
                        <Button className="rounded-full text-white bg-black/80 hover:bg-black/70">Register</Button>
                    </Link>
                </div>)}

                {user && <UserNav user={user}/>}
            </div>
                </div>
        </div>

    )
}

export default Header