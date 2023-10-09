'use client'
import React from 'react'
import TypeWriter from '../typewriter'
import TabSection from './TabSection'

type Props = {}

const Hero = (props: Props) => {
    return (
        <section className='py-10 px-5 min-h-[600px] w-full flex-1 flex-col md:flex-row flex gap-1 bg-gray-200'>
            <div className="hidden sm:block sm:w-1/2 p-2">
                <div className="w-full h-full flex items-center">
                    <h1 className="text-3xl font-bold">
                        <TypeWriter />
                    </h1>
                </div>

            </div>

            <div className="w-full sm:w-1/2  p-2 flex h-full">
            <TabSection />
                </div>

        </section>
    )
}

export default Hero