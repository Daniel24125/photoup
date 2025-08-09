"use client"
import { getData } from '@/actions/home'
import NavWhiteHeader from '@/components/NavWhiteHeader'
import CircularGallery from '@/components/ui/circular-gallery'
import { useLanguage } from '@/contexts/locale'
import { useDataFetch } from '@/hooks/useDataFetch'
import useWindowSize from '@/hooks/useWindowSize'
import React from 'react'
import Footer from '../components/template/Footer'

const AboutPage = () => {
  return (
    <div className='h-screen w-full overflow-y-auto overflow-x-hidden'>
      <div>
        <Header />
        <ValuesComponent />
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

  console.log(data)
  return <section style={{maxWidth}} className="w-full h-screen">
    <h2>{language === "EN" ? "WHAT WE REPRESENT": "O QUE REPRESENTAMOS"}</h2>
    <CircularGallery
      rotationAngle={15}
      rotationRadius={125}
    >
      <div className='w-xs h-80 bg-red-400'></div>
    </CircularGallery>
  </section>
}

export default AboutPage
