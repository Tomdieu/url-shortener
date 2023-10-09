import NextUiProvider from "@/providers/NextUiProvider";
import "./globals.css";
import type {Metadata} from "next";
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "react-hot-toast";
import localFont from 'next/font/local'
import React from "react";

const poppins = localFont({
    src: [
        {
            path: '../public/fonts/Poppins/Poppins-Regular.ttf',
            weight: '400'
        },
        {
            path: '../public/fonts/Poppins/Poppins-Bold.ttf',
            weight: '700'
        },
        {
            path: '../public/fonts/Poppins/Poppins-Black.ttf',
            weight: '800'
        }
    ],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: "URL Shortener | Trix Url",
    description: "Trix Url is a web app use to shortend long Url",
    authors: [{name: "Tomdieu Ivan", url: "http://github.com/tomdieu"}],
    creator: "Tomdieu Ivan",
    themeColor: 'ligth',
    metadataBase:new URL('https://trixurl.vercel.app'),
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    category: "URL Shortener",
    icons: [{rel: "icon", url: "https://trixurl.vercel.app/logo.png"},
        {rel: "apple-touch-icon", url: "https://trixurl.vercel.app/logo.png"}],
    twitter: {
        card: 'summary_large_image',
        title: 'TrixUrl',
        description: "Trix Url is a web app use to shortend long Url",
        creator: '@tomdieu ivan',
        images: ['https://trixurl.vercel.app/logo.png'],
    },
    openGraph:{
        title: 'TrixUrl',
        description: "Trix Url is a web app use to shortend long Url",
        images: ['https://trixurl.vercel.app/logo.png'],
        creators: ['@tomdieu ivan'],
        url: 'https://trixurl.vercel.app',

    }
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} font-sans`}>
        <body>
        <Toaster/>
        <NextTopLoader/>
        <NextUiProvider>
            {children}
        </NextUiProvider>
        </body>
        </html>
    );
}
