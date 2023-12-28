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
    title: "Trix URL - Your Ultimate URL Shortener",
    description: "Shorten and manage URLs with ease using Trix URL, the ultimate link shortening tool. Track analytics, customize links, and simplify your online experience.",
    authors: [{ name: "Tomdieu Ivan", url: "https://github.com/tomdieu" }],
    creator: "Tomdieu Ivan",
    metadataBase: new URL('https://trixurl.vercel.app'),
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    category: "URL Shortener",
    icons: [{ rel: "icon", url: "https://trixurl.vercel.app/icon.png" },
            { rel: "apple-touch-icon", url: "https://trixurl.vercel.app/icon.png" }
    ],
    twitter: {
        card: 'summary_large_image',
        title: 'TrixUrl',
        description: "Shorten and manage URLs with ease using Trix URL, the ultimate link shortening tool. Track analytics, customize links, and simplify your online experience.",
        creator: '@tomdieu ivan',
        images: ['https://trixurl.vercel.app/icon.png'],
    },
    openGraph: {
        title: 'Trix URL - Your Ultimate URL Shortener',
        description: "Shorten and manage URLs with ease using Trix URL, the ultimate link shortening tool. Track analytics, customize links, and simplify your online experience.",
        images: ['https://trixurl.vercel.app/icon.png'],
        creators: ['@tomdieu ivan'],
        url: 'https://trixurl.vercel.app'
    },
    verification: {
        google: "9sayQN2cMoBQa3PuAWCdz2IBCRMn8iy6zU63_Pq6sHg"
    },
    keywords: ["Trix URL", "URL shortener", "link management", "link tracking"],
};

export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'cyan' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

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
