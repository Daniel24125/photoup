"use client"
import CarouselScroll from "@/components/ui/carousel-scroll";
import Banner from "./components/Banner";
import Footer from "./components/template/Footer";
import React from "react"
import { getData } from "@/actions/home";
import { useDataFetch } from "@/hooks/useDataFetch";
import { cn } from "@/lib/utils";
import HeaderTitle, { HeaderTitleDevisor } from "./components/HeaderTitle";
import { useLanguage } from "@/contexts/locale";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

const maxWidth = 1480

const sectionClassName = `w-full max-w-[${maxWidth}px] h-screen justify-center max-lg:p-0 p-5 relative`

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
  const {language} = useLanguage()
  const size = React.useMemo(()=>10, [])
  const {width} = useWindowSize()

  return <section className={cn(
    sectionClassName, 
    "flex items-center"
  )}>
    <div className="flex justify-between w-full gap-10 pr-16">
      <div className="flex flex-col gap-5 w-1/2 h-full justify-evenly">
        <HeaderTitle title={language === "EN" ? "Benefits" : "Benefícios"} size={size}/>
        <p className="text-justify h-56">
          A PhotoUP dedica-se a estabelecer parcerias com todos os seus contactos. Assim conseguimos uma ligação mais forte e duradoura com os nossos clientes. Com o nosso produto, é possível valorizar um subproduto da indústria de tratamento de resíduos orgânicos e transformá-lo numa fonte extra de rendimento, o biometano. Adicionalmente, permitimos uma fonte extra de rendimento, com a comercialização de microalgas assim como reduzimos até 80% dos custos operacionais 
        </p>
        <HeaderTitleDevisor size={size}/>
      </div>
      <Image src="/benefits.png" width={width > maxWidth ? maxWidth/2: width/2} height={0} alt="Imagem Benefícios"/>
    </div>
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
