import NextUiProvider from "@/providers/NextUiProvider";
import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import localFont from 'next/font/local'
const poppins = localFont({
  src: [
    {
      path: '../public/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/Poppins/Poppins-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Trix Url",
  description: "Trix Url is a web app use to shortend Url",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body>
        <Toaster />
        <NextTopLoader />
        <NextUiProvider>
          {children}
        </NextUiProvider>
      </body>
    </html>
  );
}
