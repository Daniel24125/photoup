"use client"
import CarouselScroll from "@/components/ui/carousel-scroll";
import Banner from "./components/Banner";
import Footer from "./components/template/Footer";
import React from "react"
import { getData } from "@/actions/home";
import { useDataFetch } from "@/hooks/useDataFetch";
import { useWebSettings } from "@/contexts/website-settings";
import useOnScreen from "@/hooks/useOnScreen";

const sectionClassName = "w-full h-screen justify-center max-lg:p-0 p-5 relative"

export default function Home() { 
  return <CarouselScroll>
    <LandSection/>
    <FeatureSection/>
    <BenefitSection/>
    <SustainabilitySection/>
    <AwardSection/>
    <Footer/>
  </CarouselScroll>
}

const LandSection = () => {
  return (
    <section className={sectionClassName}>
      <Banner/>
    </section>
 
  );
};

const FeatureSection = ()=>{
  const {data} = useDataFetch(getData, "Features")
  

  return <section className={sectionClassName}>
    FeatureSection
  </section>
}

const BenefitSection = ()=>{
  return <section className={sectionClassName}>
    BenefitSection
  </section>
}

const SustainabilitySection = ()=>{
  return <section className={sectionClassName}>
    SustainabilitySection
  </section>
}

const AwardSection = ()=>{
  return <section className={sectionClassName}>
    AwardSection
  </section>
}
