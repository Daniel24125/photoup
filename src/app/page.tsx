"use client"
import CarouselScroll from "@/components/ui/carousel-scroll";
import Banner from "./components/Banner";
import React, { useRef } from "react"
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
import {  CarouselItem } from "@/components/ui/carousel";
import FeatureComponent, { TFeature } from "./components/FeatureComponent";
import Footer from "./components/template/Footer";
import LoadingPage from "./components/LoadingPage";
import NavWhiteHeader from "@/components/NavWhiteHeader";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import useOnScreen from "@/hooks/useOnScreen";
import Particles from "@/components/Particles";


const sectionClassName = `w-full lg:h-screen flex justify-center items-center p-5 relative`

export default function Home() { 
  const {width} = useWindowSize()
  
  return width > 1024 ? <DesktopPageContent/> : <MobilePageContent/>
}

const DesktopPageContent = ()=>{
  return   <CarouselScroll>
      <LandSection/>
      <MissionSection/>
      <FeatureSection/>
      <SustainabilitySection/>
      <AwardSection/>
      <Footer/>
  </CarouselScroll>
}

const MobilePageContent = ()=>{
  return <div className="overflow-y-scroll h-screen w-full ">
      <LandSection/>
      <MissionSection/>
      <FeatureSection/>
      <SustainabilitySection/>
      <AwardSection/>
      <Footer/>
  </div> 
}

const LandSection = () => {
  const {maxWidth} = useWindowSize()

  return <NavWhiteHeader style={{maxWidth}} className={cn(sectionClassName, "h-9/12 pt-0 p-0 max-lg:mb-20 flex justify-center items-center")}>
       <Banner/>
    </NavWhiteHeader>
    // <header style={{maxWidth}} className={cn(sectionClassName, "h-9/12 pt-0 p-0 mb-20")}>
  {/* </header> */}
};

const MissionSection = ()=>{
  const {maxWidth, width} = useWindowSize()
  const {language} = useLanguage()
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const [mission, setMission] = React.useState<string>("")

  React.useEffect(()=>{
    if(language === "EN") {
      setMission("At PhotoUP, we believe that innovation and sustainability are key drivers for a better future (and planet). Our mission is to develop biological and technological solutions that combine scientific knowledge, accessibility, and positive environmental and social impact. By integrating science, technology, and nature, we can transform global challenges into opportunities for sustainable and resilient growth across various industrial sectors." )
    } else {
      setMission("Na PhotoUP, acreditamos que a inovação e a sustentabilidade são os motores para um futuro (e planeta) melhor. A nossa missão é desenvolver soluções biológicas e tecnológicas que aliam conhecimento científico, acessibilidade e impacto ambiental e social positivo. Ao integrar ciência, tecnologia e natureza, trabalhamos para transformar desafios globais em oportunidades de crescimento sustentável e resiliente em diferentes setores industriais.")
    }
  },[language])

  return <section  id="mission" style={{maxWidth}}  className={cn(sectionClassName, "relative min-h-screen")}>
      <Particles
        
        particleColors={['#2AC5C1']}
        particleCount={600}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={width > 1024 ? 70 : 130}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
    <div ref={ref}  className="w-full max-w-4xl flex flex-wrap backdrop-blur-md justify-evenly px-5 absolute">
     {isVisible && (
      <TextGenerateEffect
        key={language + mission}  // 👈 force remount when text OR language changes
        delay={0.05}
        className="text-center"
        duration={0.5}
        words={mission}
      />
    )}
    </div>
  </section>
}

const FeatureSection = ()=>{
  const {maxWidth} = useWindowSize()
  const {data, loading} = useDataFetch(getData, "Features")
  
  
  if(!data || data.length === 0) return null;

  return <LoadingPage id="benefits" loading={loading}>
    <section id="benefits" style={{maxWidth}}  className={cn(sectionClassName, "min-h-screen")}>
    <div className={cn("w-full flex flex-wrap justify-evenly px-5 ", data.length > 4 ? "": "max-w-4xl")}>
      {data.map((f)=>{
        return f.visible && <FeatureComponent
          key={f.id}
          feature={f as unknown as TFeature}
          size="md"
        />
      })}
    </div>
  </section>
  </LoadingPage>
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
          {language === "EN" ? 
            "PhotoUP is dedicated to establishing strict and close partnerships with all its contacts. This allows us to build a stronger and more consistent connection with our customers. With our product, it's possible to give value to a byproduct of the organic waste treatment industry and convert it into an additional source of income: biomethane. We also provide an additional source of income through the sale of microalgae and reduce operating costs by up to 80%.": 
            "A PhotoUP dedica-se a estabelecer parcerias com todos os seus contactos. Assim conseguimos uma ligação mais forte e duradoura com os nossos clientes. Com o nosso produto, é possível valorizar um subproduto da indústria de tratamento de resíduos orgânicos e transformá-lo numa fonte extra de rendimento, o biometano. Adicionalmente, permitimos uma fonte extra de rendimento, com a comercialização de microalgas assim como reduzimos até 80% dos custos operacionais."
          }
        </p>
        <HeaderTitleDevisor size={size}/>
      </div>
      <Image src="/benefits.png" width={width/2 > 500 ? 500 : width/ 2} height={0} alt="Imagem Benefícios"/>
    </div>
  </section>
}

const SustainabilitySection = ()=>{
  const {maxWidth} = useWindowSize()
  const {data, loading} = useDataFetch(getData, "Sustainable Goals")
  

  if(!data || data.length === 0) return null;

  return <LoadingPage id="sustainability" loading={loading}>
    <section id="sustainability" style={{maxWidth}} className={cn(sectionClassName, "min-h-screen")}>
      <AnimatedTestimonials autoplay testimonials={data.sort((a,b)=>a.order!-b.order!).map(s=>{
        return {
          quote: s.desc, 
          name: s.title, 
          designation: "", 
          // @ts-expect-error: picture exists
          src: s.picture as string
        }
      })} />
    </section>
  </LoadingPage>
}

const AwardSection = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Awards")
  
  if(!data || data.length === 0) return null;
  return <LoadingPage id="sustainability" loading={loading}>

    <section id="awards" style={{maxWidth}} className={cn(
      sectionClassName, 
      "flex flex-col items-start gap-10 max-lg:p-5 min-h-screen max-lg:h-auto "
    )}>
      <HeaderTitle title={language === "EN" ? "Acknowledgments" : "Reconhecimento"} size={10}/>

      <ComponentCarousel>
        {data.sort((a,b)=>b.order!-a.order!).map((award, index) => {
          return  <CarouselItem  key={index} className="flex flex-col gap-20 h-full justify-center ">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10 ">
              <div className="flex flex-col gap-5 justify-between pb-5 w-full lg:w-[calc(100%-430px)] relative">
                <div className="flex flex-col gap-5 w-full">
                  <AwardTitleComponent title={award.title}date={award.date!} icon={award.icon![0].url} />
                  <p className="text-justify text-sm lg:text-base">{award.desc}</p>
                </div>
                <div className="w-full text-end hidden lg:block">
                  <Link target="__blank" className="underline" href={award.link as string}>{language === "EN" ? "More information": "Saber mais"}</Link>
                </div>
              </div>
              <div className="rounded-4xl flex-shrink-0 flex justify-end items-start p-5 w-full lg:w-[400px] h-56 lg:h-[400px]" style={{
                backgroundImage: `url("${award.picture![0].url}")`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
                {award.place && <Badge>{award.place}</Badge>}
              </div>
            </div>
          </CarouselItem>}
        )}
      </ComponentCarousel>

    </section>
  </LoadingPage>
}

type TAwardTitleProps = {
  icon: string, 
  title: string, 
  date: string
}

const AwardTitleComponent = ({icon, title, date}: TAwardTitleProps)=>{
  return <div className="flex gap-5 flex-shrink-0 w-full">
      <Image className="w-7 h-7 lg:w-14 lg:h-14 flex-shrink-0" src={icon} width={50} height={0} alt={title}/>
      <div className="flex flex-col w-full">
        <h3 className="text-lg lg:text-2xl font-bold w-full text-wrap">{title}</h3>
        <span className="text-xs lg:text-base text-muted-foreground">{date}</span>
      </div>
    </div>
}
