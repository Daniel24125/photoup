"use client"
import Banner from "./components/Banner";

export default function Home() { 
  return <main>
    <LandSection/>
  </main>
}

const LandSection = () => {

  
  return (
    <section className="w-full h-screen justify-center max-lg:p-0 p-5 relative">
      <Banner/>
    </section>
 
  );
};