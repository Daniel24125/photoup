"use client"
import CarouselScroll from "@/components/ui/carousel-scroll";
import Banner from "./components/Banner";
import Footer from "./components/template/Footer";

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
