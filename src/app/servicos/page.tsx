"use client"

import React from 'react'
import Footer from '../components/template/Footer'
import useWindowSize from '@/hooks/useWindowSize'
import NavWhiteHeader from '@/components/NavWhiteHeader'
import { useLanguage } from '@/contexts/locale'
import { Button } from '@/components/ui/button'

const ServicosPage = () => {

   return (
    <div className='h-screen w-full overflow-y-auto overflow-x-hidden '>
      <div className='flex flex-col items-center justify-center w-full'>
        <Header />
        <Footer/>
      </div>
    </div>
  )
}

const Header = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  return (
    <NavWhiteHeader
      changeNavigationTextColor={true}
      style={{
        backgroundImage: 'url(/services/services_header.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="relative flex flex-col items-center justify-center h-screen w-screen after:w-full after:h-full after:z-0 after:absolute after:top-0 after:left-0 after:bg-black/50"
    >
      <div className='w-full max-w-xl backdrop-blur-md p-10 gap-5 z-10 text-center flex flex-col items-center'>
        <h4 className="text-5xl font-bold mb-4 text-white">{language === "EN" ? "GERMINATING": "A GERMINAR"}</h4>
        <p className="text-white ">
          {language === "EN" ? "Our services are still growing, and we're working hard to offer the best possible solutions. Subscribe to our newsletter to stay up to date with our developments.": "Os nossos serviços ainda estão a crescer e estamos ainda a trabalhar para podermos oferecer as melhores soluções possíveis. Subscreva à nossa newsletter para estar a par dos nossos desenvolvimentos"}
        </p>
        <Button className='cursor-pointer'>{language === "EN" ? "Subscribe": "Subscrever"}</Button>
      </div>
    </NavWhiteHeader>
  )
}

export default ServicosPage
