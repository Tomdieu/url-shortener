import NextUiProvider from "@/providers/NextUiProvider";
import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import React from "react";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { JSONLD, SoftwareApplicationLD } from "@/constants/jsonld";
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
  title: {
    default: "Trix URL — Free URL Shortener with Analytics",
    template: "%s | Trix URL",
  },
  description:
    "Trix URL is a free URL shortening tool that transforms long links into short, trackable URLs. Get real-time click analytics, geographic data, QR codes, and device breakdowns for every link you create.",
  authors: [{ name: "Tomdieu Ivan", url: "https://github.com/tomdieu" }],
  creator: "Tomdieu Ivan",
  metadataBase: new URL("https://trixurl.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "URL Shortener",
  icons: [
    { rel: "icon", url: "https://trixurl.vercel.app/icon.png" },
    { rel: "apple-touch-icon", url: "https://trixurl.vercel.app/icon.png" },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Trix URL — Free URL Shortener with Analytics",
    description:
      "Shorten long URLs into clean, trackable links. Free real-time analytics showing clicks, geography, devices, and referrers for every link.",
    creator: "@tomdieuivan",
    images: ["https://trixurl.vercel.app/icon.png"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trixurl.vercel.app",
    siteName: "Trix URL",
    title: "Trix URL — Free URL Shortener with Analytics",
    description:
      "Shorten long URLs into clean, trackable links. Free real-time analytics showing clicks, geography, devices, and referrers for every link.",
    images: [
      {
        url: "https://trixurl.vercel.app/icon.png",
        width: 1200,
        height: 630,
        alt: "Trix URL — Free URL Shortener with Analytics",
      },
    ],
  },
  verification: {
    google: "oL_X940seqpUmflSfAjNxmf39DH707nkgHr__ALLx7c",
  },
  keywords: [
    "URL shortener",
    "free link shortener",
    "short URLs",
    "link analytics",
    "click tracking",
    "QR code generator",
    "link management",
    "URL shortening tool",
    "Trix URL",
  ],
  alternates: {
    canonical: "https://trixurl.vercel.app",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SoftwareApplicationLD) }}
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
