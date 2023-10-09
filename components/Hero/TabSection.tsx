"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Qrcode from '../Qrcode/Qrcode'


type Props = {}

const TabSection = (props: Props) => {
    return (
        <Tabs defaultValue="shorten" className="flex-1">
            <TabsList>
                <TabsTrigger value="shorten">Shorten Url</TabsTrigger>
                <TabsTrigger value="password">Qrcode</TabsTrigger>
            </TabsList>
            <TabsContent value="shorten">
                <div className="w-full h-[500px] flex-1 flex flex-col gap-1 rounded-lg shadow-lg p-5">
                    <h1 className="text-3xl font-semibold mb-4">URL Shortener</h1>
                    <p className="text-gray-600 mb-6">Shorten your long URLs quickly and easily.</p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="url"
                            placeholder="Enter your URL"
                            className="flex-1 border border-gray-300 rounded-md p-2"
                        />
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                            Shorten
                        </button>
                    </div>

                    <div className="mt-4">
                        <p className="text-gray-600">Already have a shortened URL? Enter it below:</p>
                        <input
                            type="text"
                            placeholder="Shortened URL"
                            className="w-full border border-gray-300 rounded-md p-2 mt-2"
                        />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="password">
                <div className="flex-1 flex flex-col gap-1">
                    <h1>Generate Qrcode</h1>
                    <div className="w-[500px] h-[500px]">

                    <Qrcode url={'https://trixurl.vercel.app'} className="min-w-[300px] min-h-[300px]"/>
                        </div>
                </div>
            </TabsContent>
        </Tabs>

    )
}

export default TabSection