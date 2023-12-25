import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import { Separator } from "@/components/ui/separator";

import getCurrentUser from '@/lib/getCurrentUser'
export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header user={user}/>
      <Hero/>
      <Separator/>
      <KeyFeatures/>
      <Footer/>
    </div>
  )
}
