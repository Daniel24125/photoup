"use client"
import CarouselScroll from "@/components/ui/carousel-scroll";
import Banner from "./components/Banner";
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
import {  CarouselItem } from "@/components/ui/carousel";
import FeatureComponent, { TFeature } from "./components/FeatureComponent";
import NavWhiteHeader from "@/components/NavWhiteHeader";
import Footer from "./components/template/Footer";
import LoadingPage from "./components/LoadingPage";


const sectionClassName = `w-full h-screen flex justify-center items-center max-lg:p-0 p-5 relative`

export default function Home() { 
  return <CarouselScroll>
    <LandSection/>
    <FeatureSection/>
    {/* <BenefitSection/> */}
    <SustainabilitySection/>
    <AwardSection/>
    <Footer/>
  </CarouselScroll>
}

const LandSection = () => {
  const {maxWidth} = useWindowSize()

  return (
    <NavWhiteHeader  style={{maxWidth}}  className={sectionClassName}>
      <Banner/>
    </NavWhiteHeader>
 
  );
};

const FeatureSection = ()=>{
  const {maxWidth} = useWindowSize()
  const {data, loading} = useDataFetch(getData, "Features")
  
  
  if(!data || data.length === 0) return null;

  return <LoadingPage id="benefits" loading={loading}>
    <section id="benefits" style={{maxWidth}}  className={sectionClassName}>
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
    <section id="sustainability" style={{maxWidth}} className={sectionClassName}>
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
      "flex flex-col items-start gap-10 max-lg:p-5 max-lg:h-auto "
    )}>
      <HeaderTitle title={language === "EN" ? "Acknolegments" : "Reconhecimento"} size={10}/>

      <ComponentCarousel>
        {data.sort((a,b)=>b.order!-a.order!).map((award, index) => {
          return  <CarouselItem  key={index} className="flex flex-col gap-20 h-full justify-center ">
            <div className="flex justify-between gap-10">
              <div className="flex flex-col gap-5 justify-between pb-5 w-full">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex gap-5 flex-shrink-0">
                      <Image className="w-14 h-14 flex-shrink-0" src={award.icon![0].url} width={50} height={0} alt={award.title}/>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold ">{award.title}</h3>
                        <span className="text-muted-foreground">{award.date}</span>
                      </div>
                    </div>
                    {award.place && <Badge>{award.place}</Badge>}
                  </div>
                  <p className="text-justify">{award.desc}</p>
                </div>
                <div className="w-full text-end">
                  <Link target="__blank" className="underline" href={award.link as string}>{language === "EN" ? "More information": "Saber mais"}</Link>
                </div>
              </div>
              <div className="rounded-4xl flex-shrink-0" style={{
                backgroundImage: `url("${award.picture![0].url}")`,
                width: 400, 
                height: 400,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}></div>
            </div>
          </CarouselItem>}
        )}
      </ComponentCarousel>

    </section>
  </LoadingPage>
}
