'use client'
import React from 'react'
// import TypeWriter from '../typewriter'
// import TabSection from './TabSection'

import Link from "next/link"
import Image from "next/image"

type Props = {}

const Hero = (props: Props) => {
    return (
        <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            alt="URL Shortening Concept"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/logo.png"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Simplify Your Links with Our URL Shortener
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Make your long URLs short, manageable, and trackable. Improve your marketing and branding efforts with
                our powerful URL shortening tool.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/dashboard/shorten"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Hero