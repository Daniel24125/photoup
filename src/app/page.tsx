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
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import ComponentCarousel from "@/components/ui/component-carousel";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const sectionClassName = `w-full h-screen flex justify-center items-center max-lg:p-0 p-5 relative`

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
  const {maxWidth} = useWindowSize()
  return (
    <section style={{maxWidth}}  className={sectionClassName}>
      <Banner/>
    </section>
 
  );
};

const FeatureSection = ()=>{
  const {maxWidth} = useWindowSize()
  const {data} = useDataFetch(getData, "Features")
  

  return <section style={{maxWidth}}  className={sectionClassName}>
    FeatureSection
  </section>
}

const BenefitSection = ()=>{
  const {language} = useLanguage()
  const size = React.useMemo(()=>10, [])
  const {width, maxWidth} = useWindowSize()

  return <section style={{maxWidth}}  className={cn(
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
      <Image src="/benefits.png" width={width/2 > 500 ? 500 : width/ 2} height={0} alt="Imagem Benefícios"/>
    </div>
  </section>
}

const SustainabilitySection = ()=>{
  const {maxWidth} = useWindowSize()
  const {data} = useDataFetch(getData, "Sustainable Goals")


  if(!data || data.length === 0) return null;
  return <section style={{maxWidth}} className={sectionClassName}>
    <AnimatedTestimonials autoplay testimonials={data.map(s=>{
      return {
        quote: s.desc, 
        name: s.title, 
        designation: "", 
        src: s.picture as string
      }
    })} />
  </section>
}

const AwardSection = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  const {data} = useDataFetch(getData, "Awards")
  console.log(data)

  if(!data || data.length === 0) return null;
  return <section style={{maxWidth}} className={sectionClassName}>
    <ComponentCarousel>
      {data.map((award, index) => {
        return (
          <div key={index} className="flex flex-col gap-20 w-full h-full justify-center pr-20">
            <HeaderTitle title={language === "EN" ? "Contests" : "Participações"} size={10}/>
            <div className="flex justify-between gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-5">
                    <Image className="flex-shrink-0" src={award.icon![0].url} width={35} height={0} alt={award.title}/>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-bold">{award.title}</h3>
                      <span className="text-muted-foreground">{award.date}</span>
                    </div>
                  </div>
                  <Badge>{award.place}</Badge>
                </div>
                <p className="text-center">{award.desc}</p>
                <div className="w-full text-end">
                  <Link className="underline" href={award.link as string}>{language === "EN" ? "More information": "Saber mais"}</Link>
                </div>
              </div>
              <div className="rounded-2xl flex-shrink-0" style={{
                //@ts-ignore
                backgroundImage: `url("${award.picture![0].url}")`,
                width: 400, 
                height: 400,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}></div>
            </div>
            
          </div>
        )
      })}
    </ComponentCarousel>
  </section>
}
