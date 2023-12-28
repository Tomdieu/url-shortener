'use client'
import React from 'react'
// import TypeWriter from '../typewriter'
// import TabSection from './TabSection'

import Link from "next/link"
import Image from "next/image"

import { useTheme } from 'next-themes'

type Props = {}

const Hero = (props: Props) => {
  const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark'
  return (
    <section className="w-full py-12 dark:bg-stone-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 h-full w-full place-items-center">
          
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-left overflow-visible whitespace-normal text-3xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-stone-50">
                Simplify Your Links with Our URL Shortener
              </h1>
              <p className="max-w-[600px] text-gray-500 text-sm md:text-xl dark:text-gray-500">
                Make your long URLs short, manageable, and trackable. Improve your marketing and branding efforts with
                our powerful URL shortening tool.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row select-none">
              <Link
                className="select-none inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-xs sm:text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/dashboard/shorten"
              >
                Get Started
              </Link>
            </div>
          </div>
          <Image
              alt="URL Shortening Concept"
              className="aspect-video hidden sm:inline-block overflow-hidden rounded-xl object-cover sm:aspect-square"
              height={500}
              width={500}
              src={"/icon.png"}
            />
          {/* <Image
            alt="URL Shortening Concept"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            height={500}
            width={500}
            src={"/icon.png"}
            // src={!isDark ?"/logo.png" :"/logo-white-icon.png"}
            
          /> */}
        </div>
      </div>
    </section>
  )
}

export default Hero