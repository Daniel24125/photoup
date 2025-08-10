"use client"
import { getData } from '@/actions/home'
import NavWhiteHeader from '@/components/NavWhiteHeader'
import CircularGallery from '@/components/ui/circular-gallery'
import { useLanguage } from '@/contexts/locale'
import { useDataFetch } from '@/hooks/useDataFetch'
import useWindowSize from '@/hooks/useWindowSize'
import React from 'react'
import Footer from '../components/template/Footer'
import HeaderTitle from '../components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <div className='h-screen w-full overflow-y-auto overflow-x-hidden '>
      <div className='flex flex-col items-center justify-center w-full'>
        <Header />
        <ValuesComponent />
        <TeamComponent/>
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

  if(loading) return "Loading..."

  if(!data || data.length === 0) return null;

  return <section style={{maxWidth}} className="w-full h-screen flex flex-col items-center gap-20 p-10">
    <h2 className='text-5xl my-20'>{language === "EN" ? "WHAT WE REPRESENT": "O QUE REPRESENTAMOS"}</h2>
    <CircularGallery
      radius={3000}
      componentDistance={400}
    >
      <div className='w-xs h-80 bg-red-400'></div>
    </CircularGallery>
  </section>
}

const TeamComponent = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Team")

  if(loading) return "Loading..."

  if(!data || data.length === 0) return null;

  console.log(data)
  return <section style={{maxWidth}} className="w-full flex flex-col gap-20 px-10 py-28">
    <HeaderTitle title={language === "EN" ? "The Team" : "A Equipa"} size={10}/>
    <div className='flex justify-evenly gap-14 flex-wrap'>
      {data.map(member => (
        <div style={{
          //@ts-ignore
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
            <p className='text-sm opacity-60'>{member.jobTitle as string}</p>
          </div>

        </div>
      ))}
    </div>
  </section>
}

export default AboutPage
