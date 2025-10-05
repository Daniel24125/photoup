"use client"
import { getData } from '@/actions/home'
import NavWhiteHeader from '@/components/NavWhiteHeader'
import { useLanguage } from '@/contexts/locale'
import { useDataFetch } from '@/hooks/useDataFetch'
import useWindowSize from '@/hooks/useWindowSize'
import React, { useEffect } from 'react'
import Footer from '../components/template/Footer'
import HeaderTitle from '../components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import { CardCarousel } from '@/components/ui/card-carousel'
import ValueCard from './components/ValueCard'
import { TValuesData } from '@/utils/airtable'
import Image from 'next/image'
import LoadingPage from '../components/LoadingPage'
import { useSearchParams } from 'next/navigation'
import { useLoader } from '@/contexts/loader'

const AboutPage = () => {
   const searchParams = useSearchParams()
      const { isAllLoaded } = useLoader();
      
      useEffect(()=>{
          if(isAllLoaded){
              const scrollPositionParam = searchParams.get("scrollTo")
              if(scrollPositionParam){
                  const el = document.getElementById(scrollPositionParam)
                  if(el){
                    el.scrollIntoView({behavior: "smooth"})
                  }
  
              }
          }
      },[searchParams, isAllLoaded])
  
  return (
    <div className='h-screen w-full overflow-y-auto overflow-x-hidden '>
      <div className='flex flex-col items-center justify-center w-full'>
        <Header />
        <ValuesComponent />
        <TeamComponent/>
        {/* <PartnersComponent/> */}
        <Footer/>
      </div>
    </div>
  )
}

const Header = ()=>{
  const {maxWidth} = useWindowSize()

  return (
    <NavWhiteHeader 
      changeNavigationTextColor={true}
      style={{
        backgroundImage: 'url(/about/about_header.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="relative flex flex-col items-center justify-center h-screen w-screen after:w-full after:h-full after:z-0 after:absolute after:top-0 after:left-0 after:bg-black/50"
    >
      <div style={{maxWidth}} className='p-10 gap-5 z-10 w-full h-full flex flex-col items-end justify-center text-end'>
        <h1 className="mt-50 text-9xl font-bold mb-4 text-white">SUSTAINABILITY</h1>
        <p className="text-9xl font-bold text-teal-400">REIMAGINED</p>
      </div>
    </NavWhiteHeader>
  )
}


const ValuesComponent = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Values")

  if(!data || data.length === 0) return null;
 
  return <LoadingPage id="values" loading={loading}>
    <section id="values" style={{maxWidth}} className="w-full flex flex-col items-center gap-20 p-10">
      <h2 className='text-5xl mt-20'>{language === "EN" ? "WHAT WE REPRESENT": "O QUE REPRESENTAMOS"}</h2>
      <CardCarousel
          autoplayDelay={5000}
          showPagination={false}
          showNavigation={true}
      >
        {data.map(val=>{ return <ValueCard key={val.id} valueData={val as unknown as TValuesData} />})}
      </CardCarousel>
    
    
    </section>
  </LoadingPage>
}

const TeamComponent = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Team")

  if(!data || data.length === 0) return null;

  return <LoadingPage id="team" loading={loading}>
    <section id="team" style={{maxWidth}} className="w-full flex flex-col gap-20 px-10 py-28">
      <HeaderTitle title={language === "EN" ? "The Team" : "A Equipa"} size={10}/>
      <div className='flex justify-evenly gap-14 flex-wrap'>
        {data.map(member => (
          <div style={{
            backgroundImage: `url(${member.picture ? member.picture[0].url : '/about/default-avatar.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }} key={member.id} className='w-80 h-96 flex flex-col justify-between rounded-2xl'>
            <div className='flex w-full justify-end p-2'>
              <Link href={member.link ? member.link: ""} target='__blank'>
                <Button className='cursor-pointer' variant="ghost" size="icon">
                  <Linkedin />
                </Button>
              </Link>
            </div>
            <div className='w-full bg-muted flex flex-col p-5 rounded-b-2xl'>
              <h6 className='text-lg font-bold'>{member.name as string}</h6>
              {/* <p className='text-sm opacity-60'>{member.jobTitle as string}</p> */}
            </div>

          </div>
        ))}
      </div>
    </section>
  </LoadingPage>
}


const PartnersComponent = ()=>{
  const {maxWidth} = useWindowSize()
  const {data, loading} = useDataFetch(getData, "Partners")
  // const {language} = useLanguage()

  if(!data || data.length === 0) return null;
 

  return <LoadingPage id="partners" loading={loading}>
    <section id="partners" style={{maxWidth}} className="w-full flex flex-col justify-center gap-20 p-10">
      {/* <HeaderTitle title={language === "EN" ? "Our Partners" : "Os Nossos Parceiros"} size={10}/> */}
      <div className='w-full flex justify-center items-center gap-20'>
        {data.map(partner=>{ return partner.visible && <Link href={partner.link as string} target="__blank" key={partner.id}>
          <Image title={partner.title as string} src={partner.icon![0].url} width={300} height={250} alt={partner.title}/>
        </Link>})}
      </div>
    </section>
  </LoadingPage>
}

export default AboutPage
