import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer/Footer";
import getCurrentUser from '@/lib/getCurrentUser'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trix URL — Free URL Shortener with Real-Time Analytics",
  description:
    "Shorten any long URL into a clean, memorable link in seconds. Trix URL provides free real-time analytics including click counts, geographic data, device types, referrers, and QR code generation for every link.",
  openGraph: {
    title: "Trix URL — Free URL Shortener with Real-Time Analytics",
    description:
      "Shorten any long URL into a clean, memorable link in seconds. Free real-time analytics with geographic data, device breakdowns, and QR codes.",
  },
}

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
