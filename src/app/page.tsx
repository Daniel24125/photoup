"use client"
import { LanguageProvider } from "@/contexts/locale";
import Banner from "./components/Banner";

export default function Home() { 
  return <main>
    <LandSection/>
  </main>
}

const LandSection = () => {

  
  return (<LanguageProvider>
    <section className="w-full h-screen justify-center max-lg:p-0 p-5 relative">
      <Banner/>
    </section>
  </LanguageProvider>
  );
};