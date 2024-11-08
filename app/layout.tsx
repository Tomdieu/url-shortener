import NextUiProvider from "@/providers/NextUiProvider";
import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import React from "react";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { JSONLD } from "@/constants/jsonld";
// import { Analytics } from "@vercel/analytics/react"

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Black.ttf",
      weight: "800",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Trix URL - Your Ultimate URL Shortener",
  description:
    "Shorten and manage URLs with ease using Trix URL, the ultimate link shortening tool created by Tomdieu Ivan. Track analytics, customize links, and simplify your online experience.",
  authors: [{ name: "Tomdieu Ivan", url: "https://github.com/tomdieu" }],
  creator: "Tomdieu Ivan",
  metadataBase: new URL("https://trixurl.vercel.app"),
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
  icons: [
    { rel: "icon", url: "https://trixurl.vercel.app/icon.png" },
    { rel: "apple-touch-icon", url: "https://trixurl.vercel.app/icon.png" },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Trix URL - Your Ultimate URL Shortener",
    description:
      "Shorten and manage URLs with ease using Trix URL, created by Tomdieu Ivan. The ultimate tool for link shortening, tracking analytics, and customizing links.",
    creator: "@tomdieu ivan",
    images: ["https://trixurl.vercel.app/icon.png"],
  },
  openGraph: {
    title: "Trix URL - Your Ultimate URL Shortener",
    description:
      "Shorten and manage URLs with ease using Trix URL, created by Tomdieu Ivan. The ultimate link shortening tool for analytics and link management.",
    images: ["https://trixurl.vercel.app/icon.png"],
    creators: ["@tomdieu ivan"],
    url: "https://trixurl.vercel.app",
    siteName: "Trix URL",
  },
  verification: {
    google: "oL_X940seqpUmflSfAjNxmf39DH707nkgHr__ALLx7c",
  },
  keywords: [
    "Trix URL",
    "URL shortener",
    "link management",
    "link tracking",
    "analytics",
    "custom links",
    "raccourcisseur d'URL",
    "gestion de liens",
    "suivi de liens",
    "Tomdieu Ivan",
    "Ivan Gottfried",
    "ivantom",
    "Ivan URL shortener",
    "Ivan link tool",
    "Trix URL shortening tool",
  ],
};


export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </head>
      <body>
        <Toaster />
        <NextTopLoader showSpinner={false} />
        <NextThemeProvider>
          <NextUiProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextUiProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
