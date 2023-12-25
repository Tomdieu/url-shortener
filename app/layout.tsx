import NextUiProvider from "@/providers/NextUiProvider";
import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import localFont from 'next/font/local'
import React from "react";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
    description: "Trix Url is a web app use to shortened long Url",
    authors: [{ name: "Tomdieu Ivan", url: "https://github.com/tomdieu" }],
    creator: "Tomdieu Ivan",
    metadataBase: new URL('https://trixurl.vercel.app'),
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
    icons: [{ rel: "icon", url: "https://trixurl.vercel.app/icon.png" },

    { rel: "apple-touch-icon", url: "https://trixurl.vercel.app/logo.png" }],
    twitter: {
        card: 'summary_large_image',
        title: 'TrixUrl',
        description: "Trix Url is a web app use to shortend long Url",
        creator: '@tomdieu ivan',
        images: ['https://trixurl.vercel.app/logo.png'],
    },
    openGraph: {
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
        <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning={true}>

            <body>
                <Toaster />
                <NextTopLoader showSpinner={false} />
                <NextThemeProvider>
                    <NextUiProvider>
                        <ReactQueryProvider>
                            {children}
                        </ReactQueryProvider>
                    </NextUiProvider>
                </NextThemeProvider>
            </body>

        </html>
    );
}
